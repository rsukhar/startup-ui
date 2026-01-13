<template>
    <div class="s-datepicker" @click="isOpened=!isOpened" @mousedown.prevent.stop>
        <div class="s-datepicker-radio" v-if="buttons && Object.values(buttons).length">
            <SRadioGroup v-model="radioValue" :options="buttonOptions" buttons />
        </div>
        <div class="s-datepicker-main">
            <div class="s-datepicker-input" :class="{'range': range}">
                <input readonly :value="displayValue" />
                <span class="s-datepicker-input-icon">
                    <FontAwesomeIcon :icon="['far', 'calendar']" />
                </span>
            </div>
            <div class="s-datepicker-calendar" v-if="isOpened" @click.stop>
                <div class="s-datepicker-calendar-page" v-for="({ month, year, daysInMonth, leadingNextMonthDays, previousMonthDaysTail, daysInPreviousMonth }, index) in calendarPages"
                    :key="`${year}${month}`">
                    <div>
                        <div class="s-datepicker-calendar-header"
                            :class="{centered: index !== 0 && index !== calendarPages.length - 1}">
                            <div v-if="index===0" class="s-datepicker-calendar-header-controls" @click="prevMonth">
                                <FontAwesomeIcon icon="chevron-left" />
                            </div>
                            <div class="s-datepicker-calendar-header-data">{{ monthNames[month - 1] }}&nbsp;{{ year }}</div>
                            <div v-if="index===(calendarPages.length - 1)" class="s-datepicker-calendar-header-controls"
                                @click="nextMonth">
                                <FontAwesomeIcon icon="chevron-right" />
                            </div>
                        </div>
                        <div class="calendar-grid">
                            <span v-for="(d, index) in weekDayNames" :key="index" class="day-name">{{ d }}</span>
                            <div v-for="day in previousMonthDaysTail" :key="dateToString(year, month, day)" class="day blocked">
                                {{ day + daysInPreviousMonth - previousMonthDaysTail }}
                            </div>
                            <div v-for="day in daysInMonth" :key="dateToString(year, month, day)" class="day" :class="{
                                    selected: isSelected(year, month, day),
                                    inrange: isHighlighted(year, month, day),
                                    today: isToday(year, month, day),
                                    blocked: isBlocked(year, month, day),
                                }" @mousedown="onDateClick(year, month, day)" @mouseover="hover(year, month, day)"
                                @mouseout="blur()">
                                {{ day }}
                            </div>
                            <div v-for="day in leadingNextMonthDays" :key="dateToString(year, month, day)" class="day blocked">
                                {{ day }}
                            </div>
                        </div>
                    </div>
                    <div v-if="index !== calendarPages.length - 1" class="splitter"></div>
                </div>
                <hr v-if="withTime && !range" />
                <div v-if="withTime && !range" class="s-datepicker-time">
                    <div class="s-datepicker-time-control">
                        <FontAwesomeIcon icon="chevron-up" @click="hoursUp"/>
                        {{ displayedHours }}
                        <FontAwesomeIcon icon="chevron-down" @click="hoursDown" />
                    </div>
                    :
                    <div class="s-datepicker-time-control">
                        <FontAwesomeIcon icon="chevron-up" @click="minutesUp"/>
                        {{ displayedMinutes}}
                        <FontAwesomeIcon icon="chevron-down" @click="minutesDown"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref, computed, watch } from "vue"
import dayjs from 'dayjs';
import { useEventListener } from "@vueuse/core";
import SRadioGroup from "./SRadioGroup.vue";
const props = defineProps({
    range: Boolean,
    // Формат значения модели
    valueFormat: String,
    // Формат, в котором выводим в инпуте
    inputFormat: String,
    min: String,
    max: String,
    numberOfMonths: Number,
    // Название дней недели
    weekDayNames: {
        type: Array,
        default() {
            return ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        }
    },
    // Название месяцев
    monthNames: {
        type: Array,
        default() {
            return ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        }
    },
    buttons: Object,
    withTime: Boolean,
})
// Внешнее значение в нужном формате props.valueFormat
const externalValue = defineModel();

const valueFormat = props.valueFormat ? props.valueFormat : (props.withTime ? `YYYY-MM-DD HH:mm` : 'YYYY-MM-DD');
const inputFormat = props.valueFormat ? props.valueFormat : (props.withTime ? `DD.MM.YYYY HH:mm` : 'DD.MM.YYYY');
const internalFormat = (props.withTime && !props.range) ? 'YYYYMMDDHHmm' : 'YYYYMMDD';

// Внутреннее нормированное значение всегда в формате 'YYYYMMDD' или ['YYYYMMDD', 'YYYYMMDD']
const value = computed(() => {
    let val = externalValue.value;
    // Если нет значения, но есть кнопки — берём первую кнопку
    if (val === null && props.buttons) {
        const [from, to] = Object.values(props.buttons)[0].split('-');
        val = [from, to];
    }
    // Если формат уже правильный или всё ещё null
    if (valueFormat === internalFormat || val === null) {
        return JSON.parse(JSON.stringify((val)));
    }
    // Приводим к нужному формату
    return Array.isArray(val)
        ? val.map(date => dayjs(date, valueFormat).format(internalFormat))
        : dayjs(val, valueFormat, true).format(internalFormat);
});

// Значение для выбиралки с кнопками
const radioValue = computed({
    get: () => value.value?.join('-') ?? '',
    set: (newValue) => {
        externalValue.value = newValue.split('-')
    }
});
// Количество месяцев, которое показываем в выбиралке дат. По умолчанию для выбора одиночной даты — 1; для выбора периода — 2
const numOfMonths = computed(() => props.numberOfMonths ?? (props.range ? 2 : 1));

// Значение, которое показывается в инпуте
const displayValue = computed(() => {
    if (props.range && Array.isArray(value.value)) {
        return value.value.filter(Boolean).map(item => dayjs(item, valueFormat).format(inputFormat))
            .join(' — ');
    }
    return value.value ? (dayjs(value.value, internalFormat, true).format(inputFormat)) : 'Дата не выбрана';
})

/**
 * Месяц на первой странице календаря: 1-12
 */
const firstYear = ref((() => dayjs().format('YYYY'))());
const firstMonth = ref((() => dayjs().format('MM'))());

/**
 * Страницы календаря в формате: [{year, month, daysInMonth}, ...]
 */
const calendarPages = computed(() => {
    const result = [];
    for (let index = 0; index < numOfMonths.value; index++) {
        let year = firstYear.value + Math.floor((firstMonth.value - 1 + index) / 12),
            month = (firstMonth.value - 1 + index) % 12 + 1,
            // Кол-во дней с прошлого месяца, которые попадут на текущую страницу календаря (хвост)
            previousMonthDaysTail = (dayjs().year(year).month(month - 1).startOf('month').day() + 6) % 7,
            // Кол-во всех дней в прошлом месяце
            daysInPreviousMonth = dayjs().year(year).month(month - 2).daysInMonth(),
            // Кол-во дней в текущем месяце
            daysInMonth = dayjs().year(year).month(month - 1).daysInMonth(),
            // Кол-во дней следующего месяца, которые попадут на текующую страницу календаря
            leadingNextMonthDays = (7 - (daysInMonth + previousMonthDaysTail) % 7) % 7;
        result.push({ year, month, daysInMonth, daysInPreviousMonth, previousMonthDaysTail, leadingNextMonthDays });
    }

    return result;
});

// Навигация
function prevMonth() {
    firstYear.value = firstMonth.value === 1 ? firstYear.value - 1 : firstYear.value;
    firstMonth.value = (firstMonth.value === 1) ? 12 : (firstMonth.value - 1)
}

function nextMonth() {
    firstYear.value = (firstMonth.value === 12) ? firstYear.value + 1 : firstYear.value;
    firstMonth.value = (firstMonth.value === 12) ? 1 : (firstMonth.value + 1);
}

// Если время не задано, то по умолчанию показываем текущее время
function getTimePart(part) {
    const source = Array.isArray(value.value)
        ? (value.value.length === 2 ? value.value[1] : null)
        : value.value;

    const date = source ? dayjs(source, internalFormat, true) : dayjs();

    return part === 'hour' ? date.hour() : date.minute();
}

const hours = ref(getTimePart('hour'));
const minutes = ref(getTimePart('minute'));

// Прибавить/убавить часы/минуты
const hoursUp = () => hours.value = hours.value === 23 ? 0 : hours.value + 1;
const hoursDown = () => hours.value = hours.value === 0 ? 23 : hours.value - 1;
const minutesUp = () => minutes.value = minutes.value === 59 ? 0 : minutes.value + 1;
const minutesDown = () => minutes.value = minutes.value === 0 ? 59 : minutes.value - 1;

const displayedHours = computed(() => hours.value < 10 ? `0${hours.value}` : hours.value);
const displayedMinutes = computed(() => minutes.value < 10 ? `0${minutes.value}` : minutes.value);

watch(() => [hours.value, minutes.value], () => {
    if (!props.range) {
        // Выбор одиночной даты
        externalValue.value = dayjs(externalValue.value).hour(hours.value).minute(minutes.value).format(valueFormat);
    }
});

// Форматирует дату в 'YYYYMMDD'
const dateToString = (year, month, day) => year + ((month < 10) ? '0' : '') + month + ((day < 10) ? '0' : '') + day;

const isOpened = ref(false);
watch(isOpened, (newValue) => {
    if (newValue === false) return;
    const firstValue = (externalValue.value instanceof Array) ? externalValue.value[0] : externalValue.value;
    if (firstValue === null) {
        firstMonth.value = dayjs().month() + 1;
        firstYear.value = dayjs().year();
        return;
    }
    firstMonth.value = dayjs(firstValue, valueFormat).month() + 1;
    firstYear.value = dayjs(firstValue, valueFormat).year();
});

const isSelected = (year, month, day) => {
    if (prevClickedDate.value) return prevClickedDate.value.startsWith(dateToString(year, month, day));
    if (!value.value) return;

    if (value.value instanceof Array) {
        // Если выбраны обе даты
        return value.value.reduce((acc, item) => {
            if (item.startsWith(dateToString(year, month, day))) return true;
            return acc;
         }, false);
    }

    return value.value.startsWith(dateToString(year, month, day));
};

/**
 * Наведенная дата в формате 'YYYYMMDD'
 */
const hoveredDate = ref(null);
const hover = (year, month, day) => hoveredDate.value = dateToString(year, month, day);
const blur = () => hoveredDate.value = null;

/**
 * Подсвеченные даты в формате ['YYYYMMDD', 'YYYYMMDD']
 */
const highlights = computed(() => {
    if (!props.range) return null;
    // Только для диапазона при условии выбранной ранее даты
    if (prevClickedDate.value) {
        if ( ! hoveredDate.value) return null;
        const start = (prevClickedDate.value < hoveredDate.value) ? prevClickedDate.value : hoveredDate.value;
        const end = (prevClickedDate.value < hoveredDate.value) ? hoveredDate.value : prevClickedDate.value;
        return [start, end];
    } else if (value.value) {
        return value.value;
    }
    return null;
});

const isHighlighted = function(year, month, day) {
    return highlights.value && highlights.value[0] <= dateToString(year, month, day) && highlights.value[1] >= dateToString(year, month, day);
}

/**
 * Выходит ли выбранная дата за рамки min- и max-значений
 *
 * @param y
 * @param m
 * @param d
 */
function isBlocked(y, m, d) {
    const parsedMin = props.min ? dayjs(props.min, 'YYYY-MM-DD') : null;
    const parsedMax = props.max ? dayjs(props.max, 'YYYY-MM-DD') : null;
    const parsedDate = dayjs().year(y).month(m - 1).date(d);

    return parsedDate.isBefore(parsedMin, 'day') || parsedDate.isAfter(parsedMax, 'day');
}

// Совпадает ли дата с сегодняшним числом
function isToday(y, m, d) {
    return dayjs().year(y).month(m - 1).date(d).isSame(dayjs(), 'day');
}

/**
 * Предыдущая выбранная в периоде дата в формате 'YYYYMMDD'
 */
const prevClickedDate = ref(null);

function onDateClick(year, month, day) {
    if (isBlocked(year, month, day)) return;
    if (!props.range) {
        // Выбор одиночной даты
        let tempValue = dayjs().year(year).month(month - 1).date(day)
        if (hours.value && minutes.value) {
            externalValue.value = tempValue.hour(hours.value).minute(minutes.value);
        }
        externalValue.value = tempValue.format(valueFormat);

        if (!props.withTime) isOpened.value = false;
    } else if (!prevClickedDate.value) {
        // Выбор первой даты в диапазоне
        prevClickedDate.value = dateToString(year, month, day);
    } else {
        const clickedDate = dateToString(year, month, day);
        let start = (prevClickedDate.value < clickedDate) ? prevClickedDate.value : clickedDate;
        let end = (prevClickedDate.value < clickedDate) ? clickedDate : prevClickedDate.value;
        if (valueFormat !== internalFormat) {
            // Кастомный формат
            start = dayjs(start, internalFormat).format(valueFormat);
            end = dayjs(end, internalFormat).format(valueFormat);
        }
        externalValue.value = [start, end];
        prevClickedDate.value = null;
        isOpened.value = false;
    }
}

// Закрытие по клику вне
useEventListener(document, 'mousedown', (e) => {
    isOpened.value = false;
    prevClickedDate.value = null;
});

// Значения кнопок (из DateInterval приходят в формате Лейбл -> Значение, потому что значение может повторяться для разных лейблов
const buttonOptions = computed(() => {
    if ( ! props.buttons) return [];
    return Object.fromEntries(Object.entries(props.buttons).map(([key, value]) => [value, key]));
})
</script>

<style lang="scss">
.s-datepicker {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 20px;
    width: fit-content;
    font-family: var(--s-font-family);

    hr {
        width: 100%;
        border-color: var(--s-grey);
    }

    &-input {
        padding: 6px 10px;
        border: 1px solid #ccc;
        border-radius: var(--s-border-radius);
        cursor: pointer;
        padding-right: 30px;
        position: relative;

        input {
            border: none;
            outline: none;
            color: var(--s-text-light);
            cursor: pointer;
            min-width: fit-content;
        }

        &-icon {
            color: var(--s-text-light);
            position: absolute;
            top: 50%;
            cursor: pointer;
            margin-block-start: calc(-1 * (21px / 2));
            inset-inline-end: 10px;
        }
    }

    &-radio,
    &-radio .s-radiogroup,
    &-main,
    &-main .s-datepicker-input {
        position: relative;
        display: flex;
        @include mobile(){
            flex-grow: 1;
        }
    }

    &-main .s-datepicker-input.range {
        width: 180px;
    }   

    &-calendar {
        display: flex;
        flex-direction: column;
        gap: 10px;
        position: absolute;
        top: 110%;
        left: 0;
        background: white;
        border: 1px solid #ddd;
        border-radius: 6px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        padding: 8px;
        z-index: 1000;
        min-width: 220px;

        &-wrapper {
            display: flex;
            gap: 10px;
        }

        &-page {
            display: flex;
            gap: 10px;
        }

        &-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 6px;

            &-data {
                display: flex;
                gap: 10px;
            }

            &-controls {
                border: none;
                outline: none;
                cursor: pointer;
                user-select: none;
                width: 30px;
                height: 30px;
                margin-top: -5px;
                line-height: 30px;
                margin-bottom: -5px;
                text-align: center;
                color: var(--s-primary);
                &:hover {
                    color: var(--s-primary-darkest);
                }
            }

            &.centered {
                justify-content: center !important;
            }
        }

        .splitter {
            flex-grow: 1;
            width: 1px;
            background-color: var(--s-border);
        }
    }

    &-time {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;

        &-control {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
            & > svg {
                color: var(--s-primary);
                cursor: pointer;
            }
        }
    }

    .calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
    }

    .day-name {
        width: 30px;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        text-align: center;
        font-weight: bold;
    }

    .day {
        width: 30px;
        height: 30px;
        line-height: 26px;
        background: none;
        cursor: pointer;
        text-align: center;
        border-radius: var(--s-border-radius);
        border: 2px var(--s-white) solid;

        &.today {
            font-weight: bold;
        }

        &.selected {
            background: var(--s-primary) !important;
            color: var(--s-white) !important;
        }

        &.inrange,
        &:hover {
            background: var(--s-primary-lightest);
        }

        &.blocked {
            color: var(--s-text-light);
            pointer-events: none;
        }
    }
}
</style>