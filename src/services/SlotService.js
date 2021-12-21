import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/slots"

class SlotService {
    getSlots() {
        return axios.get(API_URL);
    }

    updateSlot(slot, slotId) {
        return axios.put(API_URL + '/' + slotId, slot);
    }
}

export default new SlotService()