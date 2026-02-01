/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
// Learning Management Module - Enum Definitions and Render Functions
// Part 1 of 4 - Load this file first

(function() {
    'use strict';

    // Initialize Learning namespace
    window.Learning = window.Learning || {};

    // Import shared utilities
    const { escapeHtml, formatDate, formatMoney } = Layer8DUtils;
    const { renderEnum, createStatusRenderer, renderBoolean, renderDate, renderMoney } = Layer8DRenderers;

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const COURSE_TYPE = {
        0: 'Unspecified',
        1: 'Training',
        2: 'Certification',
        3: 'Compliance',
        4: 'Onboarding',
        5: 'Leadership',
        6: 'Skills',
        7: 'Safety'
    };

    const COURSE_TYPE_VALUES = {
        'training': 1,
        'certification': 2,
        'compliance': 3,
        'onboarding': 4,
        'leadership': 5,
        'skills': 6,
        'safety': 7
    };

    const COURSE_DELIVERY_METHOD = {
        0: 'Unspecified',
        1: 'Instructor Led',
        2: 'Virtual ILT',
        3: 'E-Learning',
        4: 'Blended',
        5: 'On the Job',
        6: 'Self Study',
        7: 'Webinar'
    };

    const COURSE_DELIVERY_METHOD_VALUES = {
        'instructor': 1,
        'ilt': 1,
        'virtual': 2,
        'vilt': 2,
        'elearning': 3,
        'online': 3,
        'blended': 4,
        'otj': 5,
        'job': 5,
        'self': 6,
        'study': 6,
        'webinar': 7
    };

    const COURSE_CATEGORY = {
        0: 'Unspecified',
        1: 'Technical',
        2: 'Soft Skills',
        3: 'Leadership',
        4: 'Compliance',
        5: 'Safety',
        6: 'Product',
        7: 'Process',
        8: 'Tools'
    };

    const COURSE_CATEGORY_VALUES = {
        'technical': 1,
        'soft': 2,
        'skills': 2,
        'leadership': 3,
        'compliance': 4,
        'safety': 5,
        'product': 6,
        'process': 7,
        'tools': 8
    };

    const COURSE_LEVEL = {
        0: 'Unspecified',
        1: 'Beginner',
        2: 'Intermediate',
        3: 'Advanced',
        4: 'Expert'
    };

    const COURSE_LEVEL_VALUES = {
        'beginner': 1,
        'intermediate': 2,
        'advanced': 3,
        'expert': 4
    };

    const SESSION_STATUS = {
        0: 'Unspecified',
        1: 'Scheduled',
        2: 'Open',
        3: 'Full',
        4: 'In Progress',
        5: 'Completed',
        6: 'Cancelled'
    };

    const SESSION_STATUS_VALUES = {
        'scheduled': 1,
        'open': 2,
        'full': 3,
        'progress': 4,
        'completed': 5,
        'cancelled': 6
    };

    const SESSION_STATUS_CLASSES = {
        1: 'layer8d-status-pending',     // Scheduled
        2: 'layer8d-status-active',      // Open
        3: 'layer8d-status-pending',     // Full
        4: 'layer8d-status-active',      // In Progress
        5: 'layer8d-status-active',      // Completed
        6: 'layer8d-status-terminated'   // Cancelled
    };

    const COURSE_ENROLLMENT_STATUS = {
        0: 'Unspecified',
        1: 'Pending',
        2: 'Active',
        3: 'Completed',
        4: 'Failed',
        5: 'Cancelled',
        6: 'Waitlisted'
    };

    const COURSE_ENROLLMENT_STATUS_VALUES = {
        'pending': 1,
        'active': 2,
        'completed': 3,
        'failed': 4,
        'cancelled': 5,
        'waitlisted': 6,
        'waitlist': 6
    };

    const COURSE_ENROLLMENT_STATUS_CLASSES = {
        1: 'layer8d-status-pending',     // Pending
        2: 'layer8d-status-active',      // Active
        3: 'layer8d-status-active',      // Completed
        4: 'layer8d-status-terminated',  // Failed
        5: 'layer8d-status-terminated',  // Cancelled
        6: 'layer8d-status-pending'      // Waitlisted
    };

    const CERTIFICATION_TYPE = {
        0: 'Unspecified',
        1: 'Professional',
        2: 'Technical',
        3: 'Industry',
        4: 'Vendor',
        5: 'Government',
        6: 'Internal'
    };

    const CERTIFICATION_TYPE_VALUES = {
        'professional': 1,
        'technical': 2,
        'industry': 3,
        'vendor': 4,
        'government': 5,
        'internal': 6
    };

    const CERTIFICATION_STATUS = {
        0: 'Unspecified',
        1: 'In Progress',
        2: 'Active',
        3: 'Expired',
        4: 'Revoked',
        5: 'Pending Renewal'
    };

    const CERTIFICATION_STATUS_VALUES = {
        'progress': 1,
        'active': 2,
        'expired': 3,
        'revoked': 4,
        'pending': 5,
        'renewal': 5
    };

    const CERTIFICATION_STATUS_CLASSES = {
        1: 'layer8d-status-pending',     // In Progress
        2: 'layer8d-status-active',      // Active
        3: 'layer8d-status-terminated',  // Expired
        4: 'layer8d-status-terminated',  // Revoked
        5: 'layer8d-status-pending'      // Pending Renewal
    };

    const SKILL_CATEGORY = {
        0: 'Unspecified',
        1: 'Technical',
        2: 'Soft Skill',
        3: 'Leadership',
        4: 'Language',
        5: 'Tool',
        6: 'Domain',
        7: 'Certification'
    };

    const SKILL_CATEGORY_VALUES = {
        'technical': 1,
        'soft': 2,
        'leadership': 3,
        'language': 4,
        'tool': 5,
        'domain': 6,
        'certification': 7
    };

    const TRAINING_TYPE = {
        0: 'Unspecified',
        1: 'Compliance',
        2: 'Safety',
        3: 'Security',
        4: 'Harassment',
        5: 'Diversity',
        6: 'Ethics',
        7: 'HIPAA',
        8: 'GDPR',
        9: 'SOX'
    };

    const TRAINING_TYPE_VALUES = {
        'compliance': 1,
        'safety': 2,
        'security': 3,
        'harassment': 4,
        'diversity': 5,
        'ethics': 6,
        'hipaa': 7,
        'gdpr': 8,
        'sox': 9
    };

    // ============================================================================
    // STATUS RENDERERS (using factory)
    // ============================================================================

    const renderSessionStatus = createStatusRenderer(SESSION_STATUS, SESSION_STATUS_CLASSES);
    const renderCourseEnrollmentStatus = createStatusRenderer(COURSE_ENROLLMENT_STATUS, COURSE_ENROLLMENT_STATUS_CLASSES);
    const renderCertificationStatus = createStatusRenderer(CERTIFICATION_STATUS, CERTIFICATION_STATUS_CLASSES);

    // ============================================================================
    // MODULE-SPECIFIC RENDERERS
    // ============================================================================

    function renderCourseType(type) {
        return renderEnum(type, COURSE_TYPE);
    }

    function renderCourseDeliveryMethod(method) {
        const methodIcons = {
            1: '👨‍🏫',  // Instructor Led
            2: '💻',  // Virtual ILT
            3: '🖥️',  // E-Learning
            4: '🔄',  // Blended
            5: '🏢',  // On the Job
            6: '📖',  // Self Study
            7: '🎥'   // Webinar
        };
        const label = COURSE_DELIVERY_METHOD[method] || 'Unknown';
        const icon = methodIcons[method] || '';
        return icon ? `${icon} ${escapeHtml(label)}` : escapeHtml(label);
    }

    function renderCourseCategory(cat) {
        return renderEnum(cat, COURSE_CATEGORY);
    }

    function renderCourseLevel(level) {
        const levelColors = {
            1: '#10b981',  // Beginner - green
            2: '#3b82f6',  // Intermediate - blue
            3: '#f59e0b',  // Advanced - amber
            4: '#7c3aed'   // Expert - purple
        };
        const label = COURSE_LEVEL[level] || 'Unknown';
        const color = levelColors[level] || '#64748b';
        return `<span style="color: ${color}; font-weight: 500;">${escapeHtml(label)}</span>`;
    }

    function renderCertificationType(type) {
        return renderEnum(type, CERTIFICATION_TYPE);
    }

    function renderSkillCategory(cat) {
        return renderEnum(cat, SKILL_CATEGORY);
    }

    function renderTrainingType(type) {
        return renderEnum(type, TRAINING_TYPE);
    }

    function renderDurationMinutes(minutes) {
        if (!minutes) return '-';
        if (minutes < 60) return `${minutes} min`;
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }

    function renderPercentageLearning(value) {
        if (value === null || value === undefined) return '-';
        return `${value.toFixed(0)}%`;
    }

    function renderProficiencyLevel(level) {
        if (!level) return '-';
        const stars = '★'.repeat(level) + '☆'.repeat(5 - level);
        return `<span title="Level ${level}/5">${stars}</span>`;
    }

    function renderRatingLearning(rating, maxRating = 5) {
        if (rating === null || rating === undefined) return '-';
        return `${rating.toFixed(1)}/${maxRating}`;
    }

    // ============================================================================
    // EXPORT ENUMS TO NAMESPACE
    // ============================================================================

    window.Learning.enums = {
        COURSE_TYPE,
        COURSE_TYPE_VALUES,
        COURSE_DELIVERY_METHOD,
        COURSE_DELIVERY_METHOD_VALUES,
        COURSE_CATEGORY,
        COURSE_CATEGORY_VALUES,
        COURSE_LEVEL,
        COURSE_LEVEL_VALUES,
        SESSION_STATUS,
        SESSION_STATUS_VALUES,
        COURSE_ENROLLMENT_STATUS,
        COURSE_ENROLLMENT_STATUS_VALUES,
        CERTIFICATION_TYPE,
        CERTIFICATION_TYPE_VALUES,
        CERTIFICATION_STATUS,
        CERTIFICATION_STATUS_VALUES,
        SKILL_CATEGORY,
        SKILL_CATEGORY_VALUES,
        TRAINING_TYPE,
        TRAINING_TYPE_VALUES
    };

    window.Learning.render = {
        courseType: renderCourseType,
        courseDeliveryMethod: renderCourseDeliveryMethod,
        courseCategory: renderCourseCategory,
        courseLevel: renderCourseLevel,
        sessionStatus: renderSessionStatus,
        courseEnrollmentStatus: renderCourseEnrollmentStatus,
        certificationType: renderCertificationType,
        certificationStatus: renderCertificationStatus,
        skillCategory: renderSkillCategory,
        trainingType: renderTrainingType,
        money: renderMoney,
        boolean: renderBoolean,
        date: renderDate,
        duration: renderDurationMinutes,
        percentage: renderPercentageLearning,
        proficiency: renderProficiencyLevel,
        rating: renderRatingLearning
    };

    // Export internal functions for use by other learning files
    window.Learning._internal = {
        renderSessionStatus,
        renderCourseEnrollmentStatus,
        renderCertificationStatus,
        renderCourseType,
        renderCourseDeliveryMethod,
        renderCourseCategory,
        renderCourseLevel,
        renderCertificationType,
        renderSkillCategory,
        renderTrainingType,
        renderDurationMinutes,
        renderPercentageLearning,
        renderProficiencyLevel,
        renderRatingLearning
    };

})();
