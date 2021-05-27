import React, {useState, useEffect, useMemo } from 'react';
import { Table, DatePicker, Form, Input, Select, Button, Row, Col } from 'antd';
import moment from 'moment';
import { EditText } from 'react-edit-text';

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

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const baseDay = ['Sunday', 'Monday', 'Tuesday', 'Webnesday', 'Thurday', 'Friday', 'Saturday'];

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
const ListDay = (week, year) => {
  return baseDay.map(item => {
    return moment().day(item).year(year).week(week).format('dddd DD MM');
  });
}

const getWeekYearNow = () => {
  const n = new Date();
  return ListDay(n.getWeek()+1, n.getFullYear());
}
export const Booking = (props) => {
  const { hotel, room } = props;
  const defCol = useMemo(() => getWeekYearNow(), [hotel, room]);

  const [ col, setCol ] = useState(defCol);
  const [ choose, setChoose ] = useState({});
  const [ form ] = Form.useForm();

  const chooseWeek = (date, dateString) =>{
    console.log(date, dateString);
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
  useEffect(()=>{
    if(choose.room) {
      var _r = room.find(i=>i.name===choose.room);
      var _len = choose.lstday.length;
      if(_len === 1) {
        var price = _r.roomType.price;
        var startDate = choose.lstday[0].format('DD MM YYYY');
        var endDate = choose.lstday[0].add(1, 'days').format('DD MM YYYY');
      } else {
        var price = _r.roomType.price * _len;
        var startDate = choose.lstday[0].format('DD MM YYYY');
        var endDate = choose.lstday[_len-1].format('DD MM YYYY');
      }
      form.setFieldsValue({
        room: choose.room,
        startDate: startDate,
        endDate: endDate,
        price: price
      })
       
    }
  },[choose])
  // const onSelect = (record, selected, selectedRows, nativeEvent) => {
  //   console.log(record, selected, selectedRows, nativeEvent)
  // }

  const onCell = (record, rowIndex) => {
    return {
      onClick: event => {
        console.log(record, event.target)
        if(event.target.tagName !== 'TD') return;
        var _b = document.querySelector('#tablebooking tbody');
        var _p;
        _b.childNodes.forEach(item=>{
          if(item.firstElementChild.firstElementChild.innerText === choose.room) _p = item;
        })
        var _c = event.target.parentNode;
        // console.log(_b, _p, _c);
        var idx = Array.prototype.slice.call(event.target.parentNode.childNodes).findIndex(item => item === event.target);
        var thead = document.querySelector("#tablebooking thead tr");
        var _d = thead.childNodes[idx].innerText;
        var _tm = _d + ' ' + 2021;
        var tmm = _tm.match(/\d+/g);
        var tm = moment(tmm.join(' '), 'DD MM YYYY', true);
        _b.childNodes.forEach(item => {
          if(item === _c) {
            // item co trung voi _past ko
            if(_p && _p === _c) {
              // check date
              var newlst = tm < choose.lstday[0] ? [tm, ...choose.lstday] : [...choose.lstday, tm];
              var check = true;
              newlst.forEach((item, index) => {
                // console.log(item)
              }) 
              console.log(check, newlst)
              if(check) {
                event.target.style.background = '#7fff00';
                setChoose({...choose, lstday: newlst})
              } else {
                _c.childNodes.forEach(i=>{
                  if(i.style.background === 'red') return
                  i.style.background = '';
                });
                event.target.style.background = '#7fff00';
                setChoose({...choose, lstday: [tm]})
              }
              // console.log('past: ',_p, choose.lstday)
              // setChoose({...choose, lstday: [...choose.lstday, tm]})
            } else { // current !== past
              // xoa het _p
              if(_p){
                _p.childNodes.forEach(i => {
                  if(i.style.background === 'red') return
                  i.style.background = '';
                })
              }
              // choose _c
              _c.childNodes.forEach(i => {
                if(i===event.target) {
                  i.style.background = '#7fff00';
                  setChoose({room: record.room, lstday: [tm]});
                }
              })
            }
          } else {
            item.childNodes.forEach(i => {
              if(i.style.background === 'red') return
              i.style.background = ''
            })
          }
        })


        // if( event.target.tagName === 'TD') {
        //   if(event.target.firstElementChild.innerText === 'Booking') return
        //   event.target.parentNode.parentNode.childNodes.forEach(item => {
        //     item.childNodes.forEach(i => {
        //         if(i.style.background === 'rgb(127, 255, 0)' && i !== event.target) {
        //           i.style.background = ''
        //         }
        //     })
        //   }) // check if selected to remove
        //   event.target.style.background = '#7fff00';
        //   var idx = Array.prototype.slice.call(event.target.parentNode.childNodes).findIndex(item => item === event.target);
        //   var thead = document.querySelector("#tablebooking thead tr");
        //   var d = thead.childNodes[idx].innerText;
        //   setChoose({room: record.room, day: d});
        // } else {
        //   if(event.target.innerText === 'Booking') return
        //   event.target.parentNode.parentNode.parentNode.childNodes.forEach(item => {
        //     item.childNodes.forEach(i => {
        //         if(i.style.background === 'rgb(127, 255, 0)' && i !== event.target) {
        //           i.style.background = ''
        //         }
        //     })
        //   }) // check if selected to remove
        //   event.target.parentNode.style.background = '#7fff00';
        // }
      },
    }
  }
  console.log(choose)
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
      {choose.room && <div style={{marginTop: 20, border: '1px solid'}}>
        <Row gutter={[16,16]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{padding: 10}}>
            <Form
              form={form}
              name="form_booking"
              {...formItemLayout}
              onFinish={()=>{}}
            >
              <Form.Item name="room" label="Room" >
                <Input className='custom-input' disabled/>
              </Form.Item>
              <Form.Item name="price" label="Price" >
                <Input className='custom-input' disabled/>
              </Form.Item>
              <Form.Item name="startDate" label="Start Date" >
                <Input className='custom-input' disabled/>
              </Form.Item> 
              <Form.Item name="endDate" label="End Date" >
                <Input className='custom-input' disabled/>
              </Form.Item> 
              <Form.Item name="voucher" label="Add voucher" >
                <Select 
                  placeholder = 'add voucher'
                  options={[0.2,0.3,0.4].map(i=>({label:i, value:i }))}
                />
              </Form.Item>    
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Booking
                </Button>
              </Form.Item>    
            </Form>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{padding: 10}}>
            Facility
          </Col>
        </Row>
      </div>}
    </div>
  )
}
