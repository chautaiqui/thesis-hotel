import React, {useState, useEffect} from 'react';
import { Table, DatePicker } from 'antd';
import moment from 'moment';

const onCell = (record, rowIndex) => {
  return {
    onClick: event => {
      if( event.target.tagName === 'TD') {
        if(event.target.firstElementChild.innerText === 'Booking') return
        event.target.parentNode.parentNode.childNodes.forEach(item => {
          item.childNodes.forEach(i => {
              if(i.style.background === 'rgb(127, 255, 0)' && i !== event.target) {
                i.style.background = ''
              }
          })
        }) // check if selected to remove
        event.target.style.background = '#7fff00';
      } else {
        if(event.target.innerText === 'Booking') return
        event.target.parentNode.parentNode.parentNode.childNodes.forEach(item => {
          item.childNodes.forEach(i => {
              if(i.style.background === 'rgb(127, 255, 0)' && i !== event.target) {
                i.style.background = ''
              }
          })
        }) // check if selected to remove
        event.target.parentNode.style.background = '#7fff00';
      }
    },
  }
}
const dcol = [
  {
    title: 'Room',
    dataIndex: 'room',
    key: 'room',
    render: text => <div>{text}</div>,
  },
  {
    key: 'date1',
    align: 'center',
    render: text => <div>{text}</div>,
  },
  {
    key: 'date2',
    align: 'center',
    render: text => <div>{text}</div>,
  },
  {
    key: 'date3',
    align: 'center',
    render: text => <div>{text}</div>,
  },
  {
    key: 'date4',
    align: 'center',
    render: text => <div>{text}</div>,
  },
  {
    key: 'date5',
    align: 'center',
    render: text => <div>{text}</div>,
  },
  {
    key: 'date6',
    align: 'center',
    render: text => <div>{text}</div>,
  },
  {
    key: 'date7',
    align: 'center',
    render: text => <div>{text}</div>,
  },
]


const baseDay = ['Sunday', 'Monday', 'Tuesday', 'Webnesday', 'Thurday', 'Friday', 'Saturday'];
const ListDay = (week, year) => {
  return baseDay.map(item => {
    return moment().day(item).year(year).week(week).format('dddd DD MM');
  });
}
Date.prototype.getWeek = function (dowOffset) {
  var nday, nYear;
  dowOffset = typeof(dowOffset) == 'int' ? dowOffset : 0; //default dowOffset to zero
  var newYear = new Date(this.getFullYear(),0,1);
  var day = newYear.getDay() - dowOffset; //the day of week the year begins on
  day = (day >= 0 ? day : day + 7);
  var daynum = Math.floor((this.getTime() - newYear.getTime() - 
  (this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
  var weeknum;
  //if the year starts before the middle of a week
  if(day < 4) {
      weeknum = Math.floor((daynum+day-1)/7) + 1;
      if(weeknum > 52) {
          nYear = new Date(this.getFullYear() + 1,0,1);
          nday = nYear.getDay() - dowOffset;
          nday = nday >= 0 ? nday : nday + 7;
          /*if the next year starts before the middle of
            the week, it is week #1 of that year*/
          weeknum = nday < 4 ? 1 : 53;
      }
  }
  else {
      weeknum = Math.floor((daynum+day-1)/7);
  }
  return weeknum;
};

const bookingtoDate = (room) => {
  var t = room.map(item => {
    var temp = {};
    var start = moment(item.bookingStart);
    while (!start.isSame(moment(item.bookingEnd))){
      temp = {...temp, [start.format('dddd DD MM')]: 'Booking'}
      start = start.add(1, 'days');
    }
    return temp;
  })
  return t.reduce((f,n)=>({...f,...n}),{})
}


const getWeekYearNow = () => {
  const n = new Date();
  return ListDay(n.getWeek()+1, n.getFullYear());
}
export const Booking = (props) => {
  const { hotel, room } = props;
  console.log(hotel)
  const defCol = getWeekYearNow();
  const [ col, setCol ] = useState(defCol);
  const chooseWeek = (date, dateString) =>{
    console.log(date.format('DD-MM-YYYY'), dateString);
    var temp = dateString.split('-');
    var year = Number(temp[0]);
    var week = Number(temp[1].match(/\d+/g));
    var lstCol = ListDay(week, year);
    setCol(lstCol);
  } 
  useEffect(() => {
    
    var tbody = document.querySelector("#tablebooking tbody");
    if(tbody) {
      tbody.childNodes.forEach(item => {
        item.childNodes.forEach(i => {
          if(i.style.background === 'rgb(127, 255, 0)' || i.style.background === 'red' ){
            i.style.background = '';
          }
          if(i.firstElementChild.innerText === 'Booking'){
            i.style.background = 'red'
          }
        })
      })
    }
  }, [col,defCol])
  // const onSelect = (record, selected, selectedRows, nativeEvent) => {
  //   console.log(record, selected, selectedRows, nativeEvent)
  // }
  return (
    <div>
      <Table 
        id="tablebooking"
        bordered
        title={()=>(<DatePicker
          allowClear={false} 
          picker="week" 
          onChange={chooseWeek}
          disabledDate={(current)=>{
            return current && current < moment().endOf('day').subtract(7, 'days');
          }}
        />)}
        columns={dcol.map((i, idx)=>{
          if(idx===0) return i;
          return {...i, ...{onCell: onCell, title: col[idx-1], dataIndex: col[idx-1]}}
        })} 
        dataSource={room.map(item=> {
          return {...bookingtoDate(item.bookings), room: item.name, key: item._id}
        })}
        editable  
        pagination={false}
      />
    </div>
  )
}
