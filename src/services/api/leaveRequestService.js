import leaveRequestData from '../mockData/leaveRequest.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let leaveRequests = [...leaveRequestData]

const leaveRequestService = {
  async getAll() {
    await delay(250)
    return [...leaveRequests]
  },

  async getById(id) {
    await delay(200)
    const request = leaveRequests.find(req => req.id === id)
    if (!request) {
      throw new Error('Leave request not found')
    }
    return { ...request }
  },

  async create(requestData) {
    await delay(350)
    const newRequest = {
      id: Date.now().toString(),
      ...requestData,
      status: 'pending'
    }
    leaveRequests = [...leaveRequests, newRequest]
    return { ...newRequest }
  },

  async update(id, updateData) {
    await delay(300)
    const index = leaveRequests.findIndex(req => req.id === id)
    if (index === -1) {
      throw new Error('Leave request not found')
    }
    leaveRequests[index] = { ...leaveRequests[index], ...updateData }
    return { ...leaveRequests[index] }
  },

  async delete(id) {
    await delay(250)
    const index = leaveRequests.findIndex(req => req.id === id)
    if (index === -1) {
      throw new Error('Leave request not found')
    }
    leaveRequests = leaveRequests.filter(req => req.id !== id)
    return { success: true }
  }
}

export default leaveRequestService