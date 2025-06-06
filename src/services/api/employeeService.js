import employeeData from '../mockData/employee.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let employees = [...employeeData]

const employeeService = {
  async getAll() {
    await delay(300)
    return [...employees]
  },

  async getById(id) {
    await delay(200)
    const employee = employees.find(emp => emp.id === id)
    if (!employee) {
      throw new Error('Employee not found')
    }
    return { ...employee }
  },

  async create(employeeData) {
    await delay(400)
    const newEmployee = {
      id: Date.now().toString(),
      ...employeeData,
      startDate: employeeData.startDate || new Date().toISOString().split('T')[0],
      avatar: employeeData.avatar || `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?w=150&h=150&fit=crop&crop=face`
    }
    employees = [...employees, newEmployee]
    return { ...newEmployee }
  },

  async update(id, updateData) {
    await delay(300)
    const index = employees.findIndex(emp => emp.id === id)
    if (index === -1) {
      throw new Error('Employee not found')
    }
    employees[index] = { ...employees[index], ...updateData }
    return { ...employees[index] }
  },

  async delete(id) {
    await delay(250)
    const index = employees.findIndex(emp => emp.id === id)
    if (index === -1) {
      throw new Error('Employee not found')
    }
    employees = employees.filter(emp => emp.id !== id)
    return { success: true }
  }
}

export default employeeService