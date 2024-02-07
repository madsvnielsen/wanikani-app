interface Assignment {
    created_at: Date,
    subject_id : number,
    subject_type: SubjectType,
    level: number,
    srs_stage : number,
    unlocked_at: Date  | null,
    startedAt: Date,
    passed_at: Date  | null,
    burned_at: Date  | null,
    available_at: Date  | null,
    resurrected_at: Date  | null,
    hidden : boolean

}
