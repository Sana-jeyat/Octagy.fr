import axiosInstance from "@/context/axiosInstance"

export const courseService = {
  checkEnrollment: async (moodleId: string) => {
    const res = await axiosInstance.get(`/courses/${moodleId}/enrollment`)
    return res.data
  },

  createStripePayment: async (moodleId: string) => {
    const res = await axiosInstance.post('/pay/stripe', { courseId: moodleId })
    return res.data
  },

  enrollWithKno: async (moodleId: string, data: { txHash: string; tokenAmount: number | string }) => {
    const res = await axiosInstance.post(`/moodle/course/${moodleId}/enroll`, data)
    return res.data
  },

  saveTransaction: async (payload: any) => {
    await axiosInstance.post('/transactions', payload)
  },
}
