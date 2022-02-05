interface IBTAssessment {
    assessmentType?: "BT",
    client_id?: string,
    therapist: string,
    assessment_date: Date,
    prenatal_history: string,
    family_history: string,
    development_history: string,
    school_history: string,
    tests_administered: string,
    behavior_observation: string,
    test_results: string,
    impression: string,
    recommendations: string,
    created_on?: string,
    created_by?: string,
    modified_on?: string,
    modified_by?: string,
    email_sent?: boolean,
    version?: number,
    draft?: boolean,
}

export default IBTAssessment;