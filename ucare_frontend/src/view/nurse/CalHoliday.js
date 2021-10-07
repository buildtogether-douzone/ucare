import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import { GetHolidays } from '../../lib/commDate';
import styles from '../../assets/scss/Calendar.scss';
import holidayService from '../../service/holidayService';

export default function CalHoliday() {

  const [getMoment, setMoment] = useState(moment());
  const [holidays, setHolidays] = useState([]);
  const [dbHolidays, setDbHolidays] = useState([]);
  const [holidayItems, setHolidaysItems] = useState([]);
  const [reload, setReload] = useState(true);

  const today = getMoment;
  const firstWeek = today.clone().startOf('month').week();
  const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();

  const WEEKDAY = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const toast = useRef(null);

  let items = [];
  let year = today.clone().startOf('year').format('YYYY');
  let tHolidays = GetHolidays(year).map((data, index) => data.toString().substring(0, 8));

  useEffect(() => {
    retrieveItems(getMoment.clone().format('YYYY-MM'));
  }, []);

  useEffect(() => {
    tHolidays = GetHolidays(year).map((data, index) => data.toString().substring(0, 8));
    setHolidays(tHolidays);
  }, [holidayItems]);

  useEffect(() => {
    for (let i = 0; i < holidayItems.length; i++) {
      if (WEEKDAY[new Date(holidayItems[i].date).getDay()] === 'SAT' || WEEKDAY[new Date(holidayItems[i].date).getDay()] === 'SUN') {
        continue;
      }
      if (holidayItems[i].holiday === true) {
        holidays.push(holidayItems[i].date.replace(/\-/g, ''));
      }
    }
    setDbHolidays(holidays)
  }, [holidays]);

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

  const subtractMonth = () => {
    setMoment(getMoment.clone().subtract(1, 'month'));
    retrieveItems(getMoment.clone().subtract(1, 'month').format('YYYY-MM'));
  }

  const addMonth = () => {
    setMoment(getMoment.clone().add(1, 'month'));
    retrieveItems(getMoment.clone().add(1, 'month').format('YYYY-MM'));
  }

  const changeHoliday = (date) => {
    let index = findIndexByDate(date);
    let dayOfWeek = WEEKDAY[new Date(date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')).getDay()];

    if (dayOfWeek === 'SAT' || dayOfWeek === 'SUN') return;

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

              if (days.format('MM') !== today.format('MM')) {
                return (
                  <td key={index}>
                    <div className={styles.inner}>
                      <span className={styles.dimmed}>{days.format('D')}</span>
                    </div>
                  </td>
                );
              } else if (dbHolidays.includes(days.format('YYYYMMDD'))) {
                return (
                  <td key={index} onClick={() => { changeHoliday(days.format('YYYYMMDD')) }}>
                    <div className={styles.inner}>
                      <span className={styles.holiday}>{days.format('D')}</span>
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
                  <td key={index} onClick={() => changeHoliday(days.format('YYYYMMDD'))}>
                    <div className={styles.inner}>
                      <span className={styles.holiday_sun}>{days.format('D')}</span>
                    </div>
                  </td>
                );
              } else if (moment().format('YYYYMMDD') === days.format('YYYYMMDD')) {
                return (
                  <td key={index} onClick={() => changeHoliday(days.format('YYYYMMDD'))}>
                    <div className={styles.today_inner}>
                      <span className={styles.today}>{days.format('D')}</span>
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
    return result;
  }

  const saveItems = () => {
    holidayService.update(items)
      .then(res => {
        console.log('정보가 성공적으로 전송 되었습니다.');
        toast.current.show({ severity: 'success', summary: '알림', detail: '저장 완료되었습니다.', life: 3000 });
      })
      .catch(err => {
        console.log('update holiday data() 에러', err);
      });
  }

  const retrieveItems = (date) => {
    holidayService.retrieve(date)
      .then(res => {
        console.log('정보가 성공적으로 조회 되었습니다.');
        setHolidaysItems(res.data);
      })
      .catch(err => {
        console.log('retrieve holiday 에러', err);
      });
  }

  return (
    <div style={{ padding: '1%', textAlign: 'center', width: '100%' }}>
      <Toast ref={toast} position="top-center" />
      {reload}
      <div style={{ width: '90%', display: 'inline-block', margin: '1%' }}>
        <Button style={{ float: 'right', backgroundColor: '#FFFFFF', borderColor: '#1C91FB', color: '#1C91FB' }} label="저장" icon="pi pi-check" className="p-button-sm" onClick={saveItems} />
        <button className={styles.nav_btn} style={{ marginRight: '32%' }} onClick={() => { addMonth() }}>&gt;</button>
        <span style={{ paddingRight: '5%', paddingLeft: '5%', float: 'right', fontSize: '26px' }}>{today.format('YYYY년 MM월')}</span>
        <button className={styles.nav_btn} onClick={() => { subtractMonth() }}>&lt;</button>
        {(holidayItems.length !== 0) ?
          <Button style={{ float: 'left', backgroundColor: '#FFFFFF', borderColor: '#1C91FB', color: '#1C91FB' }} label="저장 여부: O" className="p-button-sm" disabled />
          : <Button style={{ float: 'left', backgroundColor: '#FFFFFF', borderColor: '#1C91FB', color: '#1C91FB' }} label="저장 여부: X" className="p-button-sm" disabled />
        }
      </div>
      <Card style={{ width: '90%', display: 'inline-block', marginBottom: '3%' }}>
        <table className={styles.calendar}>
          <thead>
            <tr>
              <th scope="col" style={{ color: '#f44e4e', textAlign: 'center', fontSize: '18px', opacity: '80%' }}>Sun</th>
              <th scope="col" style={{ textAlign: 'center', fontSize: '18px', opacity: '80%' }}>Mon</th>
              <th scope="col" style={{ textAlign: 'center', fontSize: '18px', opacity: '80%' }}>Tue</th>
              <th scope="col" style={{ textAlign: 'center', fontSize: '18px', opacity: '80%' }}>Wed</th>
              <th scope="col" style={{ textAlign: 'center', fontSize: '18px', opacity: '80%' }}>Thu</th>
              <th scope="col" style={{ textAlign: 'center', fontSize: '18px', opacity: '80%' }}>Fri</th>
              <th scope="col" style={{ color: '#2A32FB', textAlign: 'center', fontSize: '18px', opacity: '80%' }}>Sat</th>
            </tr>
          </thead>
          <tbody>
            {calendarArr()}
          </tbody>
        </table>
      </Card>
    </div>
  );
}