import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { GetHolidays } from '../../lib/commDate';

import styles from '../../assets/scss/Calendar.scss';

export default function CalHoliday() {
  const [getMoment, setMoment] = useState(moment());
  const [holidays, setHolidays] = useState([]);
  const [reload, setReload] = useState(true);

  let items = [];

  const today = getMoment;
  const firstWeek = today.clone().startOf('month').week();
  const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();

  let year = today.clone().startOf('year').format('YYYY');

  useEffect( ()=> {
    let tHolidays = GetHolidays(year).map((data, index) => data.toString().substring(0, 8));
    setHolidays(tHolidays);
  }, [])

  const findIndexByDate = (date) => {
    let index = -1;
    for (let i = 0; i < items.length; i++) {
      if (items[i].date === date) {
        index = i;
        break;
      }
    }

    return index;
  }

  const changeHoliday = (date) => {
    let index = findIndexByDate(date);

    let data = items[index].holiday;
    let deleteDateIndex = holidays.findIndex((holiday) => holiday == date);
    items[index].holiday = !data;

    items[index].holiday ? 
      holidays.push(date) :
      holidays.splice(deleteDateIndex, 1);

    setHolidays(holidays);
    setReload(!reload);
  }

  const calendarArr = () => {

    const WEEKDAY = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    let result = [];
    let week = firstWeek;

    for (week; week <= lastWeek; week++) {
      result = result.concat(
        <tr key={week}>
          {
            Array(7).fill(0).map((data, index) => {
              let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day');
              let item = {
                date: '',
                holiday: ''
              }

              if (today.format('YYYYMM') === days.format('YYYYMM')) {
                if ((WEEKDAY[days.day()] === 'SAT') || (WEEKDAY[days.day()] === 'SUN')) {
                  item.date = days.format('YYYYMMDD');
                  item.holiday = true;
                  items.push(item);
                }
                else {
                  item.date = days.format('YYYYMMDD');
                  item.holiday = false;
                  items.push(item);
                }

                holidays.map((data) => {
                  if (data === days.format('YYYYMMDD')) {
                    item.date = days.format('YYYYMMDD');
                    item.holiday = true;
                    let index = findIndexByDate(item.date);
                    items[index] = item;
                  }
                });
              }

              if (moment().format('YYYYMMDD') === days.format('YYYYMMDD')) {
                return (
                  <td key={index} onClick={() => changeHoliday(days.format('YYYYMMDD'))}>
                    <div className={styles.today_inner}>
                      <span className={styles.today}>{days.format('D')}</span>
                    </div>
                  </td>
                );
              } else if (days.format('MM') !== today.format('MM')) {
                return (
                  <td key={index}>
                    <div className={styles.inner}>
                      <span className={styles.dimmed}>{days.format('D')}</span>
                    </div>
                  </td>
                );
              } else if (holidays.includes(days.format('YYYYMMDD'))) {
                return (
                  <td key={index} onClick={() =>{changeHoliday(days.format('YYYYMMDD'))}}>
                    <div className={styles.inner}>
                        <span className={ styles.holiday }>{days.format('D')}</span>
                    </div>
                  </td>
                );
              } else if (WEEKDAY[days.day()] === 'SAT') {
                return (
                  <td key={index} onClick={() => changeHoliday(days.format('YYYYMMDD'))}>
                    <div className={styles.inner}>
                      <span className={styles.holiday_sat}>{days.format('D')}</span>
                    </div>
                  </td>
                );
              } else if (WEEKDAY[days.day()] === 'SUN') {
                return (
                  <td key={index}onClick={() => changeHoliday(days.format('YYYYMMDD'))}>
                    <div className={styles.inner}>
                      <span className={styles.holiday_sun}>{days.format('D')}</span>
                    </div>
                  </td>
                );
              }
              else {
                return (
                  <td key={index} onClick={() => changeHoliday(days.format('YYYYMMDD'))}>
                    <div className={styles.inner}>
                      <span className={styles.date}>{days.format('D')}</span>
                    </div>
                  </td>
                );
              }
            })
          }
        </tr>
      );
    }
    console.log(items);
    return result;
  }

  return (
    <div style={{ padding: '10%' }}>
      {reload}
      <table className={styles.calendar}>
        <caption>
          <button className={styles.nav_btn} onClick={() => { setMoment(getMoment.clone().subtract(1, 'month')) }}>&lt;</button>
          <span style={{ padding: '1%' }}>{today.format('YYYY 년 MM 월')}</span>
          <button className={styles.nav_btn} onClick={() => { setMoment(getMoment.clone().add(1, 'month')) }}>&gt;</button>
        </caption>
        <thead>
          <tr>
            <th scope="col" style={{ color: '#f44e4e' }}>일</th>
            <th scope="col">월</th>
            <th scope="col">화</th>
            <th scope="col">수</th>
            <th scope="col">목</th>
            <th scope="col">금</th>
            <th scope="col" style={{ color: '#00c' }}>토</th>
          </tr>
        </thead>
        <tbody>
          {calendarArr()}
        </tbody>
      </table>
    </div>
  );
}