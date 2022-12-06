import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import 'moment-timezone'
import 'react-big-calendar/lib/sass/styles.scss'
export default function Calendrier({calendarData})
{
    const localizer = momentLocalizer(moment)
    const data = calendarData.split("\r\n")
    const events = []
    const toDateFormat=(date) => {
        return new Date(moment(date,"YYYYMMDDTHHmm"))

    }
    data.forEach((event,SummaryPosition) => {
        if(event.includes("SUMMARY")){
            events.push({
                title: event.split(':')[1],
                start: toDateFormat(data[SummaryPosition-3].split(':')[1]),
                end: toDateFormat(data[SummaryPosition-5].split(':')[1])
            })
        }
    })

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                min={new Date(0,0,0,6,0,0)}
                max={new Date(0,0,0,23,0,0)}
                style={{ height: 500,margin:"50px" }}
            />
        </div>
    )

}