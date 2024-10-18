import React, { useState } from "react";
import moment from "moment";

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(moment());
    const today = moment();

    const daysOfWeek = moment.weekdaysShort();
    const startOfMonth = currentDate.clone().startOf("month");
    const endOfMonth = currentDate.clone().endOf("month");

    const startOfWeek = startOfMonth.clone().startOf("week");
    const endOfWeek = endOfMonth.clone().endOf("week");

    const handlePrevMonth = () => {
        setCurrentDate(currentDate.clone().subtract(1, "month"));
    };

    const handleNextMonth = () => {
        setCurrentDate(currentDate.clone().add(1, "month"));
    };

    const renderDaysOfWeek = () => {
        return daysOfWeek.map((day, index) => (
            <div className="col text-center font-weight-bold py-2 px-2" key={index}>
                {day}
            </div>
        ));
    };

    const renderCells = () => {
        let day = startOfWeek.clone().subtract(1, "day");
        const calendar = [];

        while (day.isBefore(endOfWeek, "day")) {
            const week = Array(7).fill(0).map(() => {
                // Clone the day at the start of each iteration
                const dayCopy = day.clone();
                day.add(1, "day"); // Increment the day here to avoid closure issues

                const isCurrentMonth = dayCopy.month() === currentDate.month();
                const isToday = dayCopy.isSame(today, "day");

                return (
                    <div
                        className={`col text-center p-0 ${isCurrentMonth
                            ? isToday
                                ? "bg-warning text-white font-weight-bold"
                                : "bg-white text-dark"
                            : "text-muted"
                            }`}
                        key={dayCopy.format("DDMMYY")}
                        style={{
                            borderRadius: isToday ? "60px" : "none",
                            transition: "transform 0.2s",
                            height: "45px",
                            width: "45px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto",
                        }}
                    >
                        {dayCopy.date()}
                    </div>
                );
            });
            calendar.push(week);
        }

        return calendar.map((week, index) => (
            <div className="row mb-2" key={index}>
                {week}
            </div>
        ));
    };



    return (
        <div className="strech-card card p-4 calendar-component calendar-bg">
            <div className=" text-primary">
                <h4 className="mb-0" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                    {currentDate.format("MMMM")}, {currentDate.format("YYYY")}
                </h4>
                <div className="d-flex justify-content-end">
                    <button
                        className="btn btn-light rounded-circle p-2 mr-1"
                        onClick={handlePrevMonth}
                    >
                        <i className="fa-solid fa-circle-arrow-left" style={{ fontSize: '25px' }}></i>
                    </button>
                    <button
                        className="btn btn-light rounded-circle p-2 ml-1"
                        onClick={handleNextMonth}
                    >
                        <i className="fa-solid fa-circle-arrow-right" style={{ fontSize: '25px' }}></i>
                    </button>
                </div>
            </div>
            <div className="card-body p-0 p-xl-auto">
                <div className="row">{renderDaysOfWeek()}</div>
                {renderCells()}
            </div>
        </div>
    );
};

export default Calendar;
