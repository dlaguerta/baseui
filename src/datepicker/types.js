/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable flowtype/generic-spacing */
import * as React from 'react';
import type {ThemeT} from '../styles/types.js';
import type {OverrideT} from '../helpers/overrides.js';
import {STATE_CHANGE_TYPE} from './constants.js';

// eslint-disable-next-line flowtype/no-weak-types
type LocaleT = any; // see https://github.com/date-fns/date-fns/blob/master/src/locale/index.js.flow

export type DatepickerOverridesT<T> = {
  Root?: OverrideT<T>,
  CalendarContainer?: OverrideT<T>,
  CalendarHeader?: OverrideT<T>,
  PrevButton?: OverrideT<T>,
  NextButton?: OverrideT<T>,
  MonthSelect?: OverrideT<T>,
  YearSelect?: OverrideT<T>,
  MonthHeader?: OverrideT<T>,
  WeekdayHeader?: OverrideT<T>,
  Month?: OverrideT<T>,
  Week?: OverrideT<T>,
  Day?: OverrideT<T>,
};

export type DayPropsT = {
  disabled: boolean,
  date: Date,
  filterDate: ?(day: Date) => boolean,
  highlightedDate: ?Date,
  includeDates: ?Array<Date>,
  isHighlighted: boolean,
  isRange: boolean,
  maxDate: ?Date,
  minDate: ?Date,
  month: ?number,
  onSelect: ({date: Date | Array<Date>}) => mixed,
  onClick: ({event: Event, date: Date}) => mixed,
  onMouseOver: ({event: Event, date: Date}) => mixed,
  onMouseLeave: ({event: Event, date: Date}) => mixed,
  overrides?: DatepickerOverridesT<{}>,
  peekNextMonth: boolean,
  value: ?Date | Array<Date>,
};

export type DayStateT = {
  isHovered: boolean,
};

export type WeekPropsT = {
  date: Date,
  excludeDates: ?Array<Date>,
  filterDate: ?(day: Date) => boolean,
  // highlighted while keyboard navigating or hovered
  highlightedDate: ?Date,
  includeDates: ?Array<Date>,
  isRange: boolean,
  locale: ?LocaleT,
  maxDate: ?Date,
  minDate: ?Date,
  month: ?number,
  onDayClick: ({date: Date, event: Event}) => mixed,
  onDayMouseOver: ({date: Date, event: Event}) => mixed,
  onDayMouseLeave: ({date: Date, event: Event}) => mixed,
  onSelect: ({date: Date | Array<Date>}) => mixed,
  overrides?: DatepickerOverridesT<{}>,
  peekNextMonth: boolean,
  selected: ?Date | Array<Date>,
};

export type MonthPropsT = WeekPropsT;

export type CalendarPropsT = {
  excludeDates: ?Array<Date>,
  filterDate: ?(day: Date) => boolean,
  highlightedDate: ?Date,
  includeDates: ?Array<Date>,
  isRange: boolean,
  locale: ?LocaleT,
  maxDate: ?Date,
  minDate: ?Date,
  monthsShown: number,
  onDayClick: ({date: Date, event: Event}) => void,
  onDayMouseOver: ({date: Date, event: Event}) => void,
  onDayMouseLeave: ({date: Date, event: Event}) => void,
  onMonthChange: ({date: Date}) => void,
  onYearChange: ({date: Date}) => void,
  onSelect: ({date: Date | Array<Date>}) => void,
  overrides?: DatepickerOverridesT<{}>,
  peekNextMonth: boolean,
  selected: ?Date | Array<Date>,
  setActiveState: boolean => void,
};

export type HeaderPropsT = CalendarPropsT & {
  date: Date,
};

export type SharedStylePropsT = {
  $date: Date,
  $disabled: boolean,
  $isHighlighted: boolean,
  $isHovered: boolean,
  $outsideMonth: boolean,
  $pseudoHighlighted: boolean,
  $pseudoSelected: boolean,
  $selected: boolean,
  $startDate: boolean,
  $isRange: boolean,
  $hasRangeHighlighted: boolean,
  $hasRangeOnRight: boolean,
  $hasRangeSelected: boolean,
  $theme: ThemeT,
};

export type StateChangeTypeT = ?$Values<typeof STATE_CHANGE_TYPE>;

export type CalendarStateT = {
  value?: ?Date | Array<Date>,
};

export type NavigationContainerStateT = {
  // indicates a highlighted date on hover and keyboard navigation
  highlightedDate?: ?Date,
  // used to disable keyboard navigation when a month or year select
  // dropdown is opened
  isActive?: boolean,
  // last remembered highlighted date to restore
  // when keyboard navigating after a mouse moved off the cal and reset
  // highlightedDate value
  lastHighlightedDate?: Date,
};

export type StateReducerT = (
  stateType: StateChangeTypeT,
  nextState: CalendarStateT,
  currentState: CalendarStateT,
) => CalendarStateT;

export type NavigationContainerStateReducerT = (
  stateType: StateChangeTypeT,
  nextState: NavigationContainerStateT,
  currentState: NavigationContainerStateT,
) => NavigationContainerStateT;

export type StatefulContainerPropsT = {
  children: CalendarPropsT => React.Node,
  initialState: CalendarStateT,
  stateReducer: StateReducerT,
  onSelect: ({date: Date}) => void,
};

export type NavigationContainerPropsT = {
  children: CalendarPropsT => React.Node,
  highlightedDate?: ?Date,
  onDayMouseOver: (params: {date: Date, event: Event}) => void,
  onDayMouseLeave: (params: {date: Date, event: Event}) => void,
  onSelect: ({date: Date | Array<Date>}) => void,
  selected?: ?Date | Array<Date>,
  stateReducer: NavigationContainerStateReducerT,
};

export type StatefulDatepickerPropsT = $Diff<
  StatefulContainerPropsT,
  {
    children: CalendarPropsT => React.Node,
  },
>;
