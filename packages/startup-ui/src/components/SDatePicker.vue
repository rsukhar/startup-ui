<template>
    <div class="s-datepicker" @click="isOpened=!isOpened" @mousedown.prevent.stop @keydown="handleKeydown">
        <div class="s-datepicker-radio" v-if="buttons && Object.values(buttons).length">
            <SRadioGroup v-model="radioValue" :options="buttonOptions" buttons />
        </div>
        <div class="s-datepicker-main">
            <div v-if="$slots.trigger" class="s-datepicker-trigger" ref="trigger">
                <slot name="trigger" :is-open="isOpened" :value="externalValue" :display-value="displayValue"
                    :open="() => (isOpened = true)" :close="() => (isOpened = false)" :toggle="() => (isOpened = !isOpened)" />
            </div>
            <div v-else class="s-datepicker-input" :class="{ range, clearable, compact, 'icon-start': iconPosition === 'start' }" ref="input">
                <input readonly :value="displayValue" :placeholder="placeholder" :size="compact ? inputSize : undefined" />
                <span v-if="clearable && hasValue" class="s-datepicker-input-clear" @click.stop="clear">
                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M4 4 12 12 M12 4 4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                </span>
                <span class="s-datepicker-input-icon">
                    <component v-if="icon" :is="iconRenderer" :icon="icon" />
                    <svg v-else viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <rect x="2" y="3.3" width="12" height="10.7" rx="1.5" stroke="currentColor" stroke-width="1.3" />
                        <path d="M2 6.6 H14" stroke="currentColor" stroke-width="1.3" />
                        <path d="M5.3 1.7 V4 M10.7 1.7 V4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
                    </svg>
                </span>
            </div>
            <Teleport to="body">
                <div ref="calendar" :style="calendarStyles" class="s-datepicker-calendar" v-if="isOpened" @mousedown.stop>
                    <div class="s-datepicker-calendar-wrapper">
                        <div class="s-datepicker-calendar-page" v-for="({ month, year, daysInMonth, tailDays, nextDays }, index) in calendarPages"
                            :key="`${year}${month}`">
                            <div>
                                <div class="s-datepicker-calendar-header"
                                    :class="{centered: index !== 0 && index !== calendarPages.length - 1}">
                                    <div v-if="index===0" class="s-datepicker-calendar-header-controls" @click="prevMonth">
                                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path d="M10 3.5 5.5 8 10 12.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    <div class="s-datepicker-calendar-header-data">{{ months[month - 1] }}&nbsp;{{ year }}</div>
                                    <div v-if="index===(calendarPages.length - 1)" class="s-datepicker-calendar-header-controls"
                                        @click="nextMonth">
                                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                <div class="calendar-grid">
                                    <span v-for="(d, index) in displayWeekDays" :key="index" class="day-name">{{ d }}</span>
                                    <div v-for="d in tailDays" :key="dateToString(d.year, d.month, d.day)" class="day adjacent" :class="{
                                            selected: isSelected(d.year, d.month, d.day),
                                            inrange: isHighlighted(d.year, d.month, d.day),
                                            today: isToday(d.year, d.month, d.day),
                                            blocked: isBlocked(d.year, d.month, d.day),
                                            active: isActive(d.year, d.month, d.day),
                                        }" @click="onDateClick(d.year, d.month, d.day)" @mouseover="hover(d.year, d.month, d.day)"
                                        @mouseout="blur()">
                                        {{ d.day }}
                                    </div>
                                    <div v-for="day in daysInMonth" :key="dateToString(year, month, day)" class="day" :class="{
                                            selected: isSelected(year, month, day),
                                            inrange: isHighlighted(year, month, day),
                                            today: isToday(year, month, day),
                                            blocked: isBlocked(year, month, day),
                                            active: isActive(year, month, day),
                                        }" @click="onDateClick(year, month, day)" @mouseover="hover(year, month, day)"
                                        @mouseout="blur()">
                                        {{ day }}
                                    </div>
                                    <div v-for="d in nextDays" :key="dateToString(d.year, d.month, d.day)" class="day adjacent" :class="{
                                            selected: isSelected(d.year, d.month, d.day),
                                            inrange: isHighlighted(d.year, d.month, d.day),
                                            today: isToday(d.year, d.month, d.day),
                                            blocked: isBlocked(d.year, d.month, d.day),
                                            active: isActive(d.year, d.month, d.day),
                                        }" @click="onDateClick(d.year, d.month, d.day)" @mouseover="hover(d.year, d.month, d.day)"
                                        @mouseout="blur()">
                                        {{ d.day }}
                                    </div>
                                </div>
                            </div>
                            <div v-if="index !== calendarPages.length - 1" class="splitter"></div>
                        </div>
                    </div>
                    <hr v-if="withTime && !range" />
                    <div v-if="withTime && !range" class="s-datepicker-time">
                        <SSelect class="s-datepicker-time-field" filterable :options="hourOptions" v-model="hourModel" />
                        <span class="s-datepicker-time-sep">:</span>
                        <SSelect class="s-datepicker-time-field" filterable :options="minuteOptions" v-model="minutes" />
                        <SSelect v-if="hour12" class="s-datepicker-time-meridiem" :options="meridiemOptions" v-model="meridiem" />
                    </div>
                </div>
            </Teleport>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, useTemplateRef, nextTick } from "vue"
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useEventListener } from "@vueuse/core";
import SRadioGroup from "./SRadioGroup.vue";
import SSelect from "./SSelect.vue";
import { t, tRaw } from '../locale';
import { getStartupUiIcon } from '../config';

export interface SDatePickerProps {
    range?: boolean;
    // Model value format
    valueFormat?: string;
    // Format displayed in the input
    inputFormat?: string;
    min?: string;
    max?: string;
    numberOfMonths?: number;
    // First day of the week: 0 — Sunday, 1 — Monday. Defaults to the locale value.
    firstDay?: number;
    buttons?: Record<string, string>;
    withTime?: boolean;
    // Show a clear (×) button when a value is selected
    clearable?: boolean;
    // Optional custom icon name for the calendar glyph (e.g. ['far','calendar']), passed to the icon
    // renderer (FontAwesomeIcon by default, or one injected via app.use(StartupUI, { icon })). When
    // omitted, a built-in inline SVG is used so the component carries no FontAwesome dependency.
    icon?: string | string[];
    // Placeholder shown while the input is empty; also replaces the localized "not selected" fallback.
    placeholder?: string;
    // Side the calendar icon sits on: 'end' (default, trailing) or 'start' (leading).
    iconPosition?: 'start' | 'end';
    // Compact/inline layout: height follows the content (not --s-field-height), the field doesn't
    // stretch, and the input shrinks to the format width. Handy for inline chips.
    compact?: boolean;
}

const props = withDefaults(defineProps<SDatePickerProps>(), {
    range: false,
    withTime: false,
    iconPosition: 'end',
});

// Emitted when the calendar opens/closes so a host can coordinate its own click-outside logic
// (the calendar is teleported to <body> as .s-datepicker-calendar — see the docs).
const emit = defineEmits<{
    (e: 'open'): void;
    (e: 'close'): void;
}>();

// Renderer for the optional custom icon prop: an injected component, falling back to a global 'FontAwesomeIcon'.
const iconRenderer = computed(() => getStartupUiIcon() ?? 'FontAwesomeIcon');

// Weekday and month names come from the active locale (not configurable per-instance;
// override them globally via configureStartupUi/locale messages instead)
const weekDays = computed(() => tRaw<string[]>('datePicker.weekDays'));
const months = computed(() => tRaw<string[]>('datePicker.months'));

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
const $trigger = useTemplateRef<HTMLElement>('trigger');
const $calendar = useTemplateRef<HTMLElement>('calendar');
const calendarStyles = ref<Record<string, string>>({});
// The element the calendar is positioned against: the custom #trigger if present, else the input.
const $anchor = computed(() => $trigger.value ?? $input.value);

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
    let text = '';
    if (props.range && Array.isArray(value.value)) {
        text = value.value.filter(Boolean).map(item => dayjs(item, internalFormat).format(inputFormat)).join(' — ');
    } else if (value.value && !Array.isArray(value.value)) {
        text = dayjs(value.value, internalFormat, true).format(inputFormat);
    }
    if (text) return text;
    // No value: an empty string lets the native placeholder show; otherwise the localized fallback.
    return props.placeholder ? '' : t('datePicker.notSelected');
})

// Character width for the input in compact mode — derived from the format (constant, so it doesn't
// jump as the value changes) and widened to fit the placeholder if that's longer.
const inputSize = computed(() => {
    const formatWidth = props.range ? inputFormat.length * 2 + 3 : inputFormat.length;
    return Math.max(formatWidth, props.placeholder?.length ?? 0, 1);
});

// Whether there is a selected value (drives the clearable × button)
const hasValue = computed(() => {
    const v = externalValue.value;
    if (Array.isArray(v)) return v.filter(Boolean).length > 0;
    return v !== null && v !== undefined && v !== '';
});

// Clear the selected value (clearable)
function clear() {
    externalValue.value = null;
    prevClickedDate.value = null;
}

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
        const year = firstYear.value + Math.floor((firstMonth.value - 1 + index) / 12);
        const month = (firstMonth.value - 1 + index) % 12 + 1;
        // Number of days from the previous month that fall on the current calendar page (tail)
        const previousMonthDaysTail = (dayjs().year(year).month(month - 1).startOf('month').day() - firstWeekDay.value + 7) % 7;
        // Total number of days in the previous month
        const daysInPreviousMonth = dayjs().year(year).month(month - 2).daysInMonth();
        // Number of days in the current month
        const daysInMonth = dayjs().year(year).month(month - 1).daysInMonth();
        // Number of days from the next month that fall on the current calendar page
        const leadingNextMonthDays = (7 - (daysInMonth + previousMonthDaysTail) % 7) % 7;

        // Trailing days of the previous month (with year rollover) — rendered before the 1st, clickable
        const prevYear = month === 1 ? year - 1 : year;
        const prevMonthNum = month === 1 ? 12 : month - 1;
        const tailDays = Array.from({ length: previousMonthDaysTail }, (_, i) => ({
            year: prevYear,
            month: prevMonthNum,
            day: daysInPreviousMonth - previousMonthDaysTail + i + 1,
        }));

        // Leading days of the next month (with year rollover) — rendered after the last, clickable
        const nextYear = month === 12 ? year + 1 : year;
        const nextMonthNum = month === 12 ? 1 : month + 1;
        const nextDays = Array.from({ length: leadingNextMonthDays }, (_, i) => ({
            year: nextYear,
            month: nextMonthNum,
            day: i + 1,
        }));

        result.push({ year, month, daysInMonth, tailDays, nextDays });
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

// `hours` (0-23) and `minutes` (0-59) stay the source of truth used by dayjs
const hours = ref(getTimePart('hour'));
const minutes = ref(getTimePart('minute'));

// 12-hour clock with AM/PM, resolved from the active locale (e.g. en-US). Overridable
// globally via locale messages (datePicker.hour12), not per-instance.
const hour12 = computed(() => tRaw<boolean>('datePicker.hour12') === true);

const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

// Option lists for the time SSelects: [value, label] pairs
const hourOptions = computed<[number, string][]>(() =>
    (hour12.value ? Array.from({ length: 12 }, (_, i) => i + 1) : Array.from({ length: 24 }, (_, i) => i))
        .map(h => [h, pad(h)]));
const minuteOptions = computed<[number, string][]>(() => Array.from({ length: 60 }, (_, i) => [i, pad(i)]));
const meridiemOptions = computed<[string, string][]>(() => [
    ['am', t('datePicker.am')],
    ['pm', t('datePicker.pm')],
]);

// SSelect model for the hour field: shows 1-12 on a 12-hour clock, 0-23 otherwise,
// while keeping `hours` in 24-hour form.
const hourModel = computed<number>({
    get: () => {
        if (!hour12.value) return hours.value;
        const h = hours.value % 12;
        return h === 0 ? 12 : h;
    },
    set: (val: number) => {
        if (!hour12.value) { hours.value = val; return; }
        const isPm = hours.value >= 12;
        hours.value = (val % 12) + (isPm ? 12 : 0);
    },
});

// AM/PM model for the meridiem SSelect (12-hour clock only)
const meridiem = computed<string>({
    get: () => (hours.value < 12 ? 'am' : 'pm'),
    set: (m: string) => { hours.value = (hours.value % 12) + (m === 'pm' ? 12 : 0); },
});

watch(() => [hours.value, minutes.value], () => {
    if (props.range) return;
    if (!externalValue.value || Array.isArray(externalValue.value)) return;

    // Single-date selection
    externalValue.value = dayjs(externalValue.value, valueFormat, true).hour(hours.value).minute(minutes.value).format(valueFormat);
});

// Formats the date into 'YYYYMMDD'
const dateToString = (year: number, month: number, day: number) => year + ((month < 10) ? '0' : '') + month.toString() + ((day < 10) ? '0' : '') + day.toString();

const isOpened = ref(false);

// Let the host coordinate with the teleported calendar (e.g. its own click-outside handlers).
watch(isOpened, (open) => { if (open) emit('open'); else emit('close'); });

// Keyboard marker: the date the arrow keys move across (dayjs), Enter commits it
const activeDate = ref<dayjs.Dayjs | null>(null);

watch(isOpened, (newValue) => {
    if (newValue === false) return;
    const firstValue = (externalValue.value instanceof Array) ? externalValue.value[0] : externalValue.value;
    const base = (firstValue === null || firstValue === undefined) ? dayjs() : dayjs(firstValue, valueFormat);
    firstMonth.value = base.month() + 1;
    firstYear.value = base.year();
    // Initialize the keyboard marker and focus the field so arrow keys work right away
    activeDate.value = base;
    nextTick(() => focusInput());
});

// Focus the (readonly) input so the root keydown handler receives arrow/Enter keys
function focusInput() {
    ($input.value?.querySelector('input') as HTMLInputElement | null)?.focus();
}

// Whether a given day is the keyboard marker
function isActive(year: number, month: number, day: number) {
    return !!activeDate.value && activeDate.value.format('YYYYMMDD') === dateToString(year, month, day);
}

// Move the marker by N days, keeping it within min/max and scrolling the visible month into view
function moveActive(deltaDays: number) {
    const next = (activeDate.value ?? dayjs()).add(deltaDays, 'day');
    if (isBlocked(next.year(), next.month() + 1, next.date())) return;
    activeDate.value = next;
    syncCalendarToActive();
}

// Shift the visible calendar so the marker's month is on screen
function syncCalendarToActive() {
    const d = activeDate.value;
    if (!d) return;
    const activeKey = d.year() * 12 + d.month();
    const firstKey = firstYear.value * 12 + (firstMonth.value - 1);
    const lastKey = firstKey + numOfMonths.value - 1;
    if (activeKey < firstKey) {
        firstYear.value = d.year();
        firstMonth.value = d.month() + 1;
    } else if (activeKey > lastKey) {
        const newFirst = activeKey - (numOfMonths.value - 1);
        firstYear.value = Math.floor(newFirst / 12);
        firstMonth.value = (newFirst % 12) + 1;
    }
}

// Commit the marker as the selection (delegates to the same path as a click)
function commitActive() {
    const d = activeDate.value;
    if (d) onDateClick(d.year(), d.month() + 1, d.date());
}

// Keyboard control (focus state): ↓ opens, arrows move the marker, Enter selects, Esc closes
function handleKeydown(e: KeyboardEvent) {
    if (!isOpened.value) {
        if (e.key === 'ArrowDown' || e.key === 'Enter') {
            e.preventDefault();
            isOpened.value = true;
        }
        return;
    }
    switch (e.key) {
        case 'ArrowLeft': e.preventDefault(); moveActive(-1); break;
        case 'ArrowRight': e.preventDefault(); moveActive(1); break;
        case 'ArrowUp': e.preventDefault(); moveActive(-7); break;
        case 'ArrowDown': e.preventDefault(); moveActive(7); break;
        case 'Enter': e.preventDefault(); commitActive(); break;
        case 'Escape': isOpened.value = false; break;
    }
}


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
    if (!$anchor.value) return;
    const rect = $anchor.value.getBoundingClientRect();
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
        const target = e.target as Element | null;
        // The time SSelects teleport their options into <body>, outside the calendar — so a
        // mousedown there bypasses the calendar's own mousedown.stop. Keep the calendar open
        // while picking hours/minutes/AM-PM, otherwise it would dismiss mid-selection.
        if (target?.closest?.('.s-select, .s-select-stylewrapper')) return;
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
    // Default (muted) colour of the field text and icon. Recolour a whole instance — e.g. a red
    // "deadline flag" — by setting `color` on the SDatePicker; the icon and value inherit it.
    color: var(--s-text-light);

    hr {
        width: 100%;
        border-color: var(--s-gray);
    }

    &-trigger {
        display: inline-flex;
        align-items: center;
        cursor: pointer;
    }

    &-input {
        box-sizing: border-box;
        // Total outer height (incl. border + padding) is bound to --s-field-height
        height: var(--s-field-height);
        align-items: center;
        // No vertical padding (the fixed height + flex centering position the text). Horizontal
        // room for the trailing icon by default; mirrored via .icon-start.
        padding-block: 0;
        padding-inline: 10px 30px;
        border: 1px solid #ccc;
        border-radius: var(--s-border-radius);
        cursor: pointer;
        position: relative;

        // Focus state (keyboard navigation): primary border, like the other fields
        &:focus-within {
            border-color: var(--s-primary);
        }

        input {
            border: none;
            outline: none;
            // Inherit the instance colour (see .s-datepicker) so the value recolours with the icon
            color: inherit;
            background: transparent;
            cursor: pointer;
            min-width: fit-content;

            &::placeholder {
                color: var(--s-text-light);
                opacity: 1;
            }
        }

        &-icon {
            // Follows the instance colour (default muted, overridable via `color`)
            color: inherit;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            align-items: center;
            cursor: pointer;
            inset-inline-end: 10px;

            svg {
                width: 16px;
                height: 16px;
            }
        }

        // Icon on the leading edge instead of the trailing one
        &.icon-start {
            padding-inline: 30px 10px;

            .s-datepicker-input-icon {
                inset-inline-start: 10px;
                inset-inline-end: auto;
            }
            // The × then sits alone at the trailing edge
            .s-datepicker-input-clear {
                inset-inline-end: 10px;
            }
        }

        // Reserve room for the clear (×) button so the layout stays stable
        &.clearable {
            padding-inline-end: 52px;
        }
        // With the icon leading, only the × occupies the trailing edge
        &.icon-start.clearable {
            padding-inline-end: 32px;
        }

        &-clear {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            inset-inline-end: 32px;
            display: flex;
            align-items: center;
            color: inherit;
            cursor: pointer;

            svg {
                width: 13px;
                height: 13px;
            }

            &:hover {
                color: var(--s-primary);
            }
        }

        // Compact/inline layout: height follows the content; the input shrinks to its `size`
        &.compact {
            height: auto;
            padding-block: 3px;

            input {
                min-width: 0;
            }
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
        // Fixed minimum sized for the standard range string "DD.MM.YYYY — DD.MM.YYYY"
        // (border-box: includes the 40px horizontal padding + 2px border), so the value fits and
        // the field width doesn't jump as the value changes.
        min-width: 240px;

        // The input must fill the wider wrapper — on its own it's ~20ch and would clip the value.
        input {
            width: 100%;
        }
    }

    // Compact instances shouldn't stretch to fill the row on mobile
    &-main .s-datepicker-input.compact {
        @include mobile() { flex-grow: 0; }
    }

    &-time {
        display: flex;
        align-items: center;
        gap: 8px;

        // Time selects share the row width equally, so 2 (HH:mm) or 3 (HH:mm + AM/PM)
        // always fit within a single-month calendar instead of overflowing it
        .s-select {
            flex: 1 1 0;
            min-width: 0;
        }

        &-sep {
            flex: 0 0 auto;
            font-weight: bold;
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
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            margin-top: -5px;
            margin-bottom: -5px;
            text-align: center;
            color: var(--s-primary);

            svg {
                width: 14px;
                height: 14px;
            }

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
        border-color: var(--s-gray);
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

        // Days of the adjacent (previous/next) months — dimmed but clickable
        &.adjacent {
            color: var(--s-text-light);
        }

        // Keyboard marker
        &.active {
            border-color: var(--s-primary);
        }

        &.blocked {
            color: var(--s-text-light);
            pointer-events: none;
        }
    }
}
</style>