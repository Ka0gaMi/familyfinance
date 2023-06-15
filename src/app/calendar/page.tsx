"use client"

import React from "react";
import styles from "./page.module.css"
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function Calendar() {
  const calendarItemRef = React.useRef<HTMLDivElement>(null);
  const calendarElement = React.useRef<FullCalendar>(null);

  React.useEffect(() => {
    const calendarItem = calendarItemRef.current;
    const calendar = calendarElement.current?.getApi();
    function handleResize(): void {
      if (calendar != null) {
        calendar.updateSize();
      }
    }
    calendarItem?.addEventListener('transitionend', () => {
      handleResize();
    });
    return () => {
      calendarItem?.removeEventListener('transitionend', () => {
        handleResize();
      });
    };
  }, []);

  return (
    <div className={styles.Calendar}>
      <div className={styles.CalendarItem} ref={calendarItemRef}>
        <FullCalendar
          ref={calendarElement}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{ start: 'title prev next', end: 'today' }}
          buttonText={{
            today: 'Today'
          }}
          height={'auto'}
          contentHeight={'100px'}
          eventDisplay="block"
        />
      </div>
    </div>
  )
}