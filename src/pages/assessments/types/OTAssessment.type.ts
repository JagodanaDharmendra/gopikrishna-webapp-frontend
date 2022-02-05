interface IOTAssessment {
    assessmentType?: "OT",
    client_id?: string,
    therapist: string,
    assessment_date: string,
    presenting_complaints: string,
    milestone_development: string,
    behavior_cognition: string,
    cognitive_skills: string,
    kinaesthesia: string,
    created_on?: string,
    created_by?: string,
    modified_on?: string,
    modified_by?: string,
    email_sent?: boolean,
    version?: number,
    draft?: boolean,
}

export default IOTAssessment;