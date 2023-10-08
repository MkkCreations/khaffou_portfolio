import { createSelector } from 'reselect'

const _skills = state => state.skillReducer.skills
const _skill = state => state.skillReducer.skill
const _addSkill = state => state.skillReducer.addSkill
const _deleteSkill = state => state.skillReducer.deleteSkill
const _updateSkill = state => state.skillReducer.updateSkill

export const skillsSelector = createSelector(
    _skills,
    skills => skills
)

export const skillSelector = createSelector(
    _skill,
    skill => skill
)

export const addSkillSelector = createSelector(
    _addSkill,
    addSkill => addSkill
)

export const deleteSkillSelector = createSelector(
    _deleteSkill,
    deleteSkill => deleteSkill
)

export const updateSkillSelector = createSelector(
    _updateSkill,
    updateSkill => updateSkill
)
