<template>
    <div class="s-datepicker" @click="isOpened=!isOpened" @mousedown.prevent.stop>
        <div class="s-datepicker-radio" v-if="buttons && Object.values(buttons).length">
            <SRadioGroup v-model="radioValue" :options="buttonOptions" buttons />
        </div>
        <div class="s-datepicker-main">
            <div class="s-datepicker-input" :class="{'range': range}" ref="input">
                <input readonly :value="displayValue" />
                <span class="s-datepicker-input-icon">
                    <FontAwesomeIcon :icon="['far', 'calendar']" />
                </span>
            </div>
            <Teleport to="body">
                <div ref="calendar" :style="calendarStyles" class="s-datepicker-calendar" v-if="isOpened" @mousedown.stop>
                    <div class="s-datepicker-calendar-wrapper">
                        <div class="s-datepicker-calendar-page" v-for="({ month, year, daysInMonth, leadingNextMonthDays, previousMonthDaysTail, daysInPreviousMonth }, index) in calendarPages"
                            :key="`${year}${month}`">
                            <div>
                                <div class="s-datepicker-calendar-header"
                                    :class="{centered: index !== 0 && index !== calendarPages.length - 1}">
                                    <div v-if="index===0" class="s-datepicker-calendar-header-controls" @click="prevMonth">
                                        <FontAwesomeIcon icon="chevron-left" />
                                    </div>
                                    <div class="s-datepicker-calendar-header-data">{{ months[month - 1] }}&nbsp;{{ year }}</div>
                                    <div v-if="index===(calendarPages.length - 1)" class="s-datepicker-calendar-header-controls"
                                        @click="nextMonth">
                                        <FontAwesomeIcon icon="chevron-right" />
                                    </div>
                                </div>
                                <div class="calendar-grid">
                                    <span v-for="(d, index) in displayWeekDays" :key="index" class="day-name">{{ d }}</span>
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
            </Teleport>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref, computed, watch, useTemplateRef, nextTick } from "vue"
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useEventListener } from "@vueuse/core";
import SRadioGroup from "./SRadioGroup.vue";
import { t, tRaw } from '../locale';

export interface SDatePickerProps {
    range?: boolean;
    // Model value format
    valueFormat?: string;
    // Format displayed in the input
    inputFormat?: string;
    min?: string;
    max?: string;
    numberOfMonths?: number;
    // Weekday names
    weekDayNames?: string[];
    // Month names
    monthNames?: string[];
    // First day of the week: 0 — Sunday, 1 — Monday. Defaults to the locale value.
    firstDay?: number;
    buttons?: Record<string, string>;
    withTime?: boolean;
}

const props = withDefaults(defineProps<SDatePickerProps>(), {
    range: false,
    withTime: false,
});

// Weekday and month names: props take priority over the localized defaults
const weekDays = computed(() => props.weekDayNames ?? tRaw<string[]>('datePicker.weekDays'));
const months = computed(() => props.monthNames ?? tRaw<string[]>('datePicker.months'));

// First day of the week: prop → locale (datePicker.firstDay) → Monday
const firstWeekDay = computed(() => props.firstDay ?? Number(tRaw<number>('datePicker.firstDay') ?? 1));
// weekDays are stored starting from Monday; rotate them for the selected first day of the week (Sun/Mon)
const displayWeekDays = computed(() => {
    const names = weekDays.value;
    const mondayOffset = (firstWeekDay.value + 6) % 7; // Sun(0)→6, Mon(1)→0
    return [...names.slice(mondayOffset), ...names.slice(0, mondayOffset)];
});

// External value in the required props.valueFormat format
const externalValue = defineModel<string | string[] | null>();
dayjs.extend(customParseFormat)

const $input = useTemplateRef<HTMLElement>('input');
const $calendar = useTemplateRef<HTMLElement>('calendar');
const calendarStyles = ref<Record<string, string>>({});

const valueFormat = props.valueFormat ? props.valueFormat : (props.withTime ? `YYYY-MM-DD HH:mm` : 'YYYY-MM-DD');
const inputFormat = props.inputFormat ? props.inputFormat : (props.withTime ? `DD.MM.YYYY HH:mm` : 'DD.MM.YYYY');
const internalFormat = (props.withTime && !props.range) ? 'YYYYMMDDHHmm' : 'YYYYMMDD';

// The internal normalized value is always in the format 'YYYYMMDD' or ['YYYYMMDD', 'YYYYMMDD']
const value = computed(() => {
    let val = externalValue.value;
    // If there is no value but there are buttons — take the first button
    if (!val && props.buttons && Object.keys(props.buttons).length > 0) {
        const [from, to] = Object.values(props.buttons)[0].split('-');
        val = [from, to];
    }
    // If empty
    if (!val) {
        return null;
    }
    // If the format is already correct
    if (valueFormat === internalFormat) {
        return JSON.parse(JSON.stringify((val)));
    }
    // Convert to the required format
    return Array.isArray(val)
        ? val.map(date => dayjs(date as string, valueFormat).format(internalFormat))
        : dayjs(val as string, valueFormat, true).format(internalFormat);
});

// Value for the button picker
const radioValue = computed({
    get: () => {
        if (!value.value) return '';
        return Array.isArray(value.value) ? value.value.join('-') : value.value;
    },
    set: (newValue: string) => {
        externalValue.value = newValue.split('-')
    }
});
// Number of months shown in the date picker. Defaults to 1 for single-date selection; 2 for range selection
const numOfMonths = computed(() => props.numberOfMonths ?? (props.range ? 2 : 1));

// Value shown in the input
const displayValue = computed(() => {
    if (props.range && Array.isArray(value.value)) {
        return value.value.filter(Boolean).map(item => dayjs(item, internalFormat).format(inputFormat)).join(' — ');
    }
    return value.value && !Array.isArray(value.value) ? (dayjs(value.value, internalFormat, true).format(inputFormat)) : t('datePicker.notSelected');
})

/**
 * Month on the first calendar page: 1-12
 */
const firstYear = ref(Number(dayjs().format('YYYY')));
const firstMonth = ref(Number(dayjs().format('MM')));

/**
 * Calendar pages in the format: [{year, month, daysInMonth}, ...]
 */
const calendarPages = computed(() => {
    const result = [];
    for (let index = 0; index < numOfMonths.value; index++) {
        let year = firstYear.value + Math.floor((firstMonth.value - 1 + index) / 12),
            month = (firstMonth.value - 1 + index) % 12 + 1,
            // Number of days from the previous month that fall on the current calendar page (tail)
            previousMonthDaysTail = (dayjs().year(year).month(month - 1).startOf('month').day() - firstWeekDay.value + 7) % 7,
            // Total number of days in the previous month
            daysInPreviousMonth = dayjs().year(year).month(month - 2).daysInMonth(),
            // Number of days in the current month
            daysInMonth = dayjs().year(year).month(month - 1).daysInMonth(),
            // Number of days from the next month that fall on the current calendar page
            leadingNextMonthDays = (7 - (daysInMonth + previousMonthDaysTail) % 7) % 7;
        result.push({ year, month, daysInMonth, daysInPreviousMonth, previousMonthDaysTail, leadingNextMonthDays });
    }

    return result;
});

// Navigation
function prevMonth() {
    firstYear.value = firstMonth.value === 1 ? firstYear.value - 1 : firstYear.value;
    firstMonth.value = (firstMonth.value === 1) ? 12 : (firstMonth.value - 1)
}

function nextMonth() {
    firstYear.value = (firstMonth.value === 12) ? firstYear.value + 1 : firstYear.value;
    firstMonth.value = (firstMonth.value === 12) ? 1 : (firstMonth.value + 1);
}

// If the time is not set, show the current time by default
function getTimePart(part: 'hour' | 'minute') {
    const source = Array.isArray(value.value)
        ? (value.value.length === 2 ? value.value[1] : null)
        : value.value;

    const date = source ? dayjs(source, internalFormat, true) : dayjs();

    return part === 'hour' ? date.hour() : date.minute();
}

const hours = ref(getTimePart('hour'));
const minutes = ref(getTimePart('minute'));

// Increment/decrement hours/minutes
const hoursUp = () => hours.value = hours.value === 23 ? 0 : hours.value + 1;
const hoursDown = () => hours.value = hours.value === 0 ? 23 : hours.value - 1;
const minutesUp = () => minutes.value = minutes.value === 59 ? 0 : minutes.value + 1;
const minutesDown = () => minutes.value = minutes.value === 0 ? 59 : minutes.value - 1;

const displayedHours = computed(() => hours.value < 10 ? `0${hours.value}` : hours.value.toString());
const displayedMinutes = computed(() => minutes.value < 10 ? `0${minutes.value}` : minutes.value.toString());

watch(() => [hours.value, minutes.value], () => {
    if (props.range) return;
    if (!externalValue.value || Array.isArray(externalValue.value)) return;

    // Single-date selection
    externalValue.value = dayjs(externalValue.value, valueFormat, true).hour(hours.value).minute(minutes.value).format(valueFormat);
});

// Formats the date into 'YYYYMMDD'
const dateToString = (year: number, month: number, day: number) => year + ((month < 10) ? '0' : '') + month.toString() + ((day < 10) ? '0' : '') + day.toString();

const isOpened = ref(false);
watch(isOpened, (newValue) => {
    if (newValue === false) return;
    const firstValue = (externalValue.value instanceof Array) ? externalValue.value[0] : externalValue.value;
    if (firstValue === null || firstValue === undefined) {
        firstMonth.value = dayjs().month() + 1;
        firstYear.value = dayjs().year();
        return;
    }
    firstMonth.value = dayjs(firstValue, valueFormat).month() + 1;
    firstYear.value = dayjs(firstValue, valueFormat).year();
});


/**
 * Determine the direction in which the list calendar opens
 *
 * @param rect Object with the rectangle coordinates
 */
function determineCalendarDirection(rect: DOMRect) {
    if (!$calendar.value) return 'drop-down';
    const calendarHeight = $calendar.value.offsetHeight;
    const spaceBelow = document.documentElement.clientHeight - rect.bottom;

    if (spaceBelow >= calendarHeight) {
        // Fits below
        return 'drop-down';
    } else {
        // Does not fit below
        if (rect.top > calendarHeight) {
            // Fits above
            return 'drop-up';
        } else {
            // Does not fit above either, place it where there is more space
            return (rect.top > spaceBelow) ? 'drop-up' : 'drop-down';
        }
    }
}

const openDirection = ref('drop-down');

async function updateCalendarPosition() {
    if (!$input.value) return;
    const rect = $input.value.getBoundingClientRect();
    await nextTick();
    openDirection.value = determineCalendarDirection(rect);

    if ($calendar.value) {
        calendarStyles.value = {
            left: `${rect.left + window.scrollX}px`,
            zIndex: '9999',
        };

        if (openDirection.value === 'drop-up') {
            // For drop-up
            calendarStyles.value['bottom'] = `${document.documentElement.clientHeight - rect.top - window.scrollY + 5}px`;
        } else {
            // For drop-down
            calendarStyles.value['top'] = `${rect.bottom + window.scrollY + 5}px`;
        }
    }
}
watch(isOpened, (newValue) => {
    if (!newValue) return;
    updateCalendarPosition();
});

const isSelected = (year: number, month: number, day: number) => {
    if (prevClickedDate.value) return prevClickedDate.value.startsWith(dateToString(year, month, day));
    if (!value.value) return false;

    if (value.value instanceof Array) {
        // If both dates are selected
        return value.value.reduce((acc, item) => {
            if (item.startsWith(dateToString(year, month, day))) return true;
            return acc;
         }, false);
    }

    return value.value.startsWith(dateToString(year, month, day));
};

/**
 * Hovered date in the format 'YYYYMMDD'
 */
const hoveredDate = ref<string | null>(null);
const hover = (year: number, month: number, day: number) => hoveredDate.value = dateToString(year, month, day);
const blur = () => hoveredDate.value = null;

/**
 * Highlighted dates in the format ['YYYYMMDD', 'YYYYMMDD']
 */
const highlights = computed(() => {
    if (!props.range) return null;
    // Only for a range, provided a date was previously selected
    if (prevClickedDate.value) {
        if ( ! hoveredDate.value) return null;
        const start = (prevClickedDate.value < hoveredDate.value) ? prevClickedDate.value : hoveredDate.value;
        const end = (prevClickedDate.value < hoveredDate.value) ? hoveredDate.value : prevClickedDate.value;
        return [start, end];
    } else if (value.value && Array.isArray(value.value)) {
        return value.value;
    }
    return null;
});

const isHighlighted = function(year: number, month: number, day: number) {
    return highlights.value && highlights.value[0] <= dateToString(year, month, day) && highlights.value[1] >= dateToString(year, month, day);
}

/**
 * Whether the selected date falls outside the min and max values
 *
 * @param y
 * @param m
 * @param d
 */
function isBlocked(y: number, m: number, d: number) {
    const parsedMin = props.min ? dayjs(props.min, 'YYYY-MM-DD') : null;
    const parsedMax = props.max ? dayjs(props.max, 'YYYY-MM-DD') : null;
    const parsedDate = dayjs().year(y).month(m - 1).date(d);

    if (parsedMin && parsedDate.isBefore(parsedMin, 'day')) return true;
    if (parsedMax && parsedDate.isAfter(parsedMax, 'day')) return true;
    return false;
}

// Whether the date matches today's date
function isToday(y: number, m: number, d: number) {
    return dayjs().year(y).month(m - 1).date(d).isSame(dayjs(), 'day');
}

/**
 * The previously selected date within the range, in the format 'YYYYMMDD'
 */
const prevClickedDate = ref<string | null>(null);

function onDateClick(year: number, month: number, day: number) {
    if (isBlocked(year, month, day)) return;
    if (!props.range) {
        // Single-date selection
        let tempValue = dayjs().year(year).month(month - 1).date(day)
        if (hours.value !== undefined && minutes.value !== undefined) {
            tempValue = tempValue.hour(hours.value).minute(minutes.value);
        }
        externalValue.value = tempValue.format(valueFormat);

        // If without time, close immediately after selecting the day
        if (!props.withTime) isOpened.value = false;
    } else if (!prevClickedDate.value) {
        // Selecting the first date in the range
        prevClickedDate.value = dateToString(year, month, day);
    } else {
        const clickedDate = dateToString(year, month, day);
        let start = (prevClickedDate.value < clickedDate) ? prevClickedDate.value : clickedDate;
        let end = (prevClickedDate.value < clickedDate) ? clickedDate : prevClickedDate.value;
        if (valueFormat !== internalFormat) {
            // Custom format
            start = dayjs(start, internalFormat).format(valueFormat);
            end = dayjs(end, internalFormat).format(valueFormat);
        }
        externalValue.value = [start, end];
        prevClickedDate.value = null;
        isOpened.value = false;
    }
}

// Close on click outside
if (typeof document !== 'undefined') {
    useEventListener(document, 'mousedown', (e) => {
        isOpened.value = false;
        prevClickedDate.value = null;
    });
}

// Button values (they come from DateInterval in the Label -> Value format, because the value may repeat for different labels
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
        padding: 6px 30px 6px 10px;
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

    &-main {
        position: relative;
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
        width: fit-content;
        min-width: 180px;
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
            user-select: none;
            & > svg {
                color: var(--s-primary);
                cursor: pointer;
            }
        }
    }
}

.s-datepicker-calendar {
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: absolute;
    left: 0;
    background-color: white;
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


    hr {
        width: 100%;
        border-color: var(--s-grey);
        margin: 0;
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