import React from 'react';

import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';

// https://ej2.syncfusion.com/react/documentation/schedule/getting-started/ <-dokumentacja
const Schedule = () => {
  const data = [
    {
        Id: 2,
        Subject: 'Meeting',
        StartTime: new Date(2018, 1, 15, 10, 0),
        EndTime: new Date(2018, 1, 15, 12, 30),
        IsAllDay: false,
        Status: 'Completed',
        Priority: 'High'
    },
];
  return (
     <ScheduleComponent height='550px' selectedDate={new Date(2018, 1, 15)} eventSettings={{
        dataSource: data,
        fields: {
            id: 'Id',
            subject: { name: 'Subject' },
            isAllDay: { name: 'IsAllDay' },
            startTime: { name: 'StartTime' },
            endTime: { name: 'EndTime' }
        }
    }}>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
    
  )
}

export default Schedule
