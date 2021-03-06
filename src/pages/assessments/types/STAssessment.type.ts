interface ISTAssessment {
    assessmentType?: "ST",
    client_id?: string,
    therapist: string,
    assessment_date: string,
    daddling: string,
    first_word: string,
    main_mode_comm: string,
    family_history: string,
    motor_developments: string,
    oro_peripheral_mechanism: string,
    vegetative_skills: string,
    vision: string,
    hearing: string,
    response_to_name_call: string,
    environmental_sounds: string,
    eye_contact: string,
    attention_to_sound: string,
    limitation_to_body_movements: string,
    limitation_to_speech: string,
    attention_level: string,
    social_smile: string,
    initiate_interaction: string,
    receptive_lang: string,
    expressive_lang: string,
    test_administered: string,
    reels_rl_score: string,
    reels_el_score: string,
    provisional_diagnosis: string,
    recommendations: string,
    created_on?: string,
    created_by?: string,
    modified_on?: string,
    modified_by?: string,
    email_sent?: boolean,
    version?: number,
    draft?: boolean,
}

export default ISTAssessment;