import React, { Component } from "react";
import SlotService from "../services/SlotService";

class AllSlots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slots: [],
    };
  }

  componentDidMount() {
    SlotService.getSlots().then((res) => {
      this.setState({ slots: res.data });
    });
  }

  alreadyBooked() {
    return (
      <span className="bg-green-900" ></span>
    )
  }

  addButton(slot) {
    return (
      <button
        className="flex-inline text-white bg-blue-700 border-0 py-2 px-3 focus:outline-none hover:bg-blue-600 rounded text-base w-24 min-w-full md:min-w-0"
        onClick={() => this.updateSlotStatus(slot)}
      >
        Book slot
      </button>
    );
  }

  updateSlotStatus(slot) {
    if (window.confirm("Are you sure you wish to book this slot?")) {
      slot.booked = !slot.booked;
      console.log(slot);
      SlotService.updateSlot(slot, slot.id);
      window.location.reload(false);
    }
  }

  render() {
    return (
      <div className="px-5 py-10 mx-auto text-center lg:px-40">
        <div className="flex flex-col w-full mb-10">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-4">
            All slots
          </h1>
        </div>
        <div className="flex flex-wrap -m-4 h-auto sm:max-content">
          <table className="table-auto border border-black">
            <thead>
              <tr className="border border-black">
                <th className="border border-black">Start time</th>
                <th className="border border-black">End time</th>
                <th className="border border-black">Booking status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.slots.map((slot) => (
                <tr key={slot.id} className="h-12">
                    {console.log(new Date(slot.start_time).toLocaleTimeString())}
                  <td className="px-5 py-1 border border-gray-300">{new Date(slot.start_time).toLocaleTimeString()}</td>
                  <td className="px-5 py-1 border border-gray-300">{new Date(slot.end_time).toLocaleTimeString()}</td>
                  <td className={slot.booked ? " px-3 py-1 border border-gray-300 bg-green-500" : "px-3 py-1 border border-gray-300"}>
                    {slot.booked ? "Slot already booked" : this.addButton(slot)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AllSlots;
