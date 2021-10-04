import produce from 'immer'
import data from '../../MOCK_DATA.json'

const initialState = {
    employee: data
}
export default produce((state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
})