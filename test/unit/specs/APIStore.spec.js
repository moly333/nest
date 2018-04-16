import store, { myaxios } from '@/store/index'
import MockAdapter from 'axios-mock-adapter'

const mockAxios = new MockAdapter(myaxios)
const APIstate = store.state
const APIdispatch = store.dispatch

describe('API Store', () => {
  it('all states should be empty', () => {
    expect(APIstate.spiders).toEqual([])
    expect(APIstate.running_spiders).toEqual([])
    expect(APIstate.pending_jobs).toEqual([])
    expect(APIstate.finished_jobs).toEqual([])
    expect(APIstate.projects).toEqual([])
    expect(APIstate.selected_project).toEqual('')
    expect(APIstate.selected_spider).toEqual('')
    expect(APIstate.selected_job).toEqual('')
    expect(APIstate.error).toEqual('')
  })
  it('get projects', async () => {
    const items = { status: 'ok', projects: ['proj1', 'proj2'], node_name: 'vagrant' }
    mockAxios.onGet('/listprojects.json').reply(200, items)
    await APIdispatch('getProjects')
    expect(APIstate.projects).toEqual(['proj1', 'proj2'])
    expect(APIstate.selected_project).toEqual('proj1')
    APIdispatch('clearState')
  })
  it('get projects failed', async () => {
    const items = { }
    mockAxios.onGet('/listprojects.json').reply(200, items)
    await APIdispatch('getProjects')
    expect(APIstate.projects).toEqual([])
    APIdispatch('clearState')
  })
  it('get spiders', async () => {
    const items = { status: 'ok', spiders: ['list index out of range', 'sp1', 'sp2'], node_name: 'vagrant' }
    mockAxios.onGet('/listspiders.json?project=').reply(200, items)
    await APIdispatch('getSpiders')
    expect(APIstate.spiders).toEqual([{ name: 'sp1', running: false }, { name: 'sp2', running: false }])
    APIdispatch('clearState')
  })
})
