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
/**
 * Mobile Learning Management Module - Enum Definitions
 * Desktop Equivalent: hcm/learning/learning-enums.js
 */
(function() {
    'use strict';

    window.MobileLearning = window.MobileLearning || {};
    MobileLearning.enums = {};

    // ============================================================================
    // COURSE TYPE
    // ============================================================================

    MobileLearning.enums.COURSE_TYPE = {
        0: 'Unspecified', 1: 'Training', 2: 'Certification', 3: 'Compliance',
        4: 'Onboarding', 5: 'Leadership', 6: 'Skills', 7: 'Safety'
    };
    MobileLearning.enums.COURSE_TYPE_VALUES = {
        'training': 1, 'certification': 2, 'compliance': 3, 'onboarding': 4,
        'leadership': 5, 'skills': 6, 'safety': 7
    };

    // ============================================================================
    // COURSE DELIVERY METHOD
    // ============================================================================

    MobileLearning.enums.COURSE_DELIVERY_METHOD = {
        0: 'Unspecified', 1: 'Instructor Led', 2: 'Virtual ILT', 3: 'E-Learning',
        4: 'Blended', 5: 'On the Job', 6: 'Self Study', 7: 'Webinar'
    };
    MobileLearning.enums.COURSE_DELIVERY_METHOD_VALUES = {
        'instructor': 1, 'ilt': 1, 'virtual': 2, 'vilt': 2, 'elearning': 3,
        'online': 3, 'blended': 4, 'otj': 5, 'job': 5, 'self': 6, 'study': 6, 'webinar': 7
    };

    // ============================================================================
    // COURSE CATEGORY
    // ============================================================================

    MobileLearning.enums.COURSE_CATEGORY = {
        0: 'Unspecified', 1: 'Technical', 2: 'Soft Skills', 3: 'Leadership',
        4: 'Compliance', 5: 'Safety', 6: 'Product', 7: 'Process', 8: 'Tools'
    };
    MobileLearning.enums.COURSE_CATEGORY_VALUES = {
        'technical': 1, 'soft': 2, 'skills': 2, 'leadership': 3, 'compliance': 4,
        'safety': 5, 'product': 6, 'process': 7, 'tools': 8
    };

    // ============================================================================
    // COURSE LEVEL
    // ============================================================================

    MobileLearning.enums.COURSE_LEVEL = {
        0: 'Unspecified', 1: 'Beginner', 2: 'Intermediate', 3: 'Advanced', 4: 'Expert'
    };
    MobileLearning.enums.COURSE_LEVEL_VALUES = {
        'beginner': 1, 'intermediate': 2, 'advanced': 3, 'expert': 4
    };

    // ============================================================================
    // SESSION STATUS
    // ============================================================================

    MobileLearning.enums.SESSION_STATUS = {
        0: 'Unspecified', 1: 'Scheduled', 2: 'Open', 3: 'Full', 4: 'In Progress', 5: 'Completed', 6: 'Cancelled'
    };
    MobileLearning.enums.SESSION_STATUS_VALUES = {
        'scheduled': 1, 'open': 2, 'full': 3, 'progress': 4, 'completed': 5, 'cancelled': 6
    };
    MobileLearning.enums.SESSION_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-pending',
        4: 'status-active', 5: 'status-active', 6: 'status-terminated'
    };

    // ============================================================================
    // COURSE ENROLLMENT STATUS
    // ============================================================================

    MobileLearning.enums.COURSE_ENROLLMENT_STATUS = {
        0: 'Unspecified', 1: 'Pending', 2: 'Active', 3: 'Completed', 4: 'Failed', 5: 'Cancelled', 6: 'Waitlisted'
    };
    MobileLearning.enums.COURSE_ENROLLMENT_STATUS_VALUES = {
        'pending': 1, 'active': 2, 'completed': 3, 'failed': 4, 'cancelled': 5, 'waitlisted': 6, 'waitlist': 6
    };
    MobileLearning.enums.COURSE_ENROLLMENT_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-active',
        4: 'status-terminated', 5: 'status-terminated', 6: 'status-pending'
    };

    // ============================================================================
    // CERTIFICATION TYPE
    // ============================================================================

    MobileLearning.enums.CERTIFICATION_TYPE = {
        0: 'Unspecified', 1: 'Professional', 2: 'Technical', 3: 'Industry', 4: 'Vendor', 5: 'Government', 6: 'Internal'
    };
    MobileLearning.enums.CERTIFICATION_TYPE_VALUES = {
        'professional': 1, 'technical': 2, 'industry': 3, 'vendor': 4, 'government': 5, 'internal': 6
    };

    // ============================================================================
    // CERTIFICATION STATUS
    // ============================================================================

    MobileLearning.enums.CERTIFICATION_STATUS = {
        0: 'Unspecified', 1: 'In Progress', 2: 'Active', 3: 'Expired', 4: 'Revoked', 5: 'Pending Renewal'
    };
    MobileLearning.enums.CERTIFICATION_STATUS_VALUES = {
        'progress': 1, 'active': 2, 'expired': 3, 'revoked': 4, 'pending': 5, 'renewal': 5
    };
    MobileLearning.enums.CERTIFICATION_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-terminated', 4: 'status-terminated', 5: 'status-pending'
    };

    // ============================================================================
    // SKILL CATEGORY
    // ============================================================================

    MobileLearning.enums.SKILL_CATEGORY = {
        0: 'Unspecified', 1: 'Technical', 2: 'Soft Skill', 3: 'Leadership', 4: 'Language', 5: 'Tool', 6: 'Domain', 7: 'Certification'
    };
    MobileLearning.enums.SKILL_CATEGORY_VALUES = {
        'technical': 1, 'soft': 2, 'leadership': 3, 'language': 4, 'tool': 5, 'domain': 6, 'certification': 7
    };

    // ============================================================================
    // TRAINING TYPE
    // ============================================================================

    MobileLearning.enums.TRAINING_TYPE = {
        0: 'Unspecified', 1: 'Compliance', 2: 'Safety', 3: 'Security', 4: 'Harassment',
        5: 'Diversity', 6: 'Ethics', 7: 'HIPAA', 8: 'GDPR', 9: 'SOX'
    };
    MobileLearning.enums.TRAINING_TYPE_VALUES = {
        'compliance': 1, 'safety': 2, 'security': 3, 'harassment': 4,
        'diversity': 5, 'ethics': 6, 'hipaa': 7, 'gdpr': 8, 'sox': 9
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileLearning.render = {
        courseType: (v) => MobileRenderers.renderEnum(v, MobileLearning.enums.COURSE_TYPE),
        courseDeliveryMethod: (method) => {
            const icons = { 1: '👨‍🏫', 2: '💻', 3: '🖥️', 4: '🔄', 5: '🏢', 6: '📖', 7: '🎥' };
            const label = MobileLearning.enums.COURSE_DELIVERY_METHOD[method] || 'Unknown';
            return icons[method] ? `${icons[method]} ${MobileUtils.escapeHtml(label)}` : MobileUtils.escapeHtml(label);
        },
        courseCategory: (v) => MobileRenderers.renderEnum(v, MobileLearning.enums.COURSE_CATEGORY),
        courseLevel: (level) => {
            const colors = { 1: '#10b981', 2: '#3b82f6', 3: '#f59e0b', 4: '#7c3aed' };
            const label = MobileLearning.enums.COURSE_LEVEL[level] || 'Unknown';
            return `<span style="color: ${colors[level] || '#64748b'}; font-weight: 500;">${MobileUtils.escapeHtml(label)}</span>`;
        },
        sessionStatus: MobileRenderers.createStatusRenderer(MobileLearning.enums.SESSION_STATUS, MobileLearning.enums.SESSION_STATUS_CLASSES),
        courseEnrollmentStatus: MobileRenderers.createStatusRenderer(MobileLearning.enums.COURSE_ENROLLMENT_STATUS, MobileLearning.enums.COURSE_ENROLLMENT_STATUS_CLASSES),
        certificationType: (v) => MobileRenderers.renderEnum(v, MobileLearning.enums.CERTIFICATION_TYPE),
        certificationStatus: MobileRenderers.createStatusRenderer(MobileLearning.enums.CERTIFICATION_STATUS, MobileLearning.enums.CERTIFICATION_STATUS_CLASSES),
        skillCategory: (v) => MobileRenderers.renderEnum(v, MobileLearning.enums.SKILL_CATEGORY),
        trainingType: (v) => MobileRenderers.renderEnum(v, MobileLearning.enums.TRAINING_TYPE),
        duration: MobileRenderers.renderMinutes,
        percentage: MobileRenderers.renderProgress,
        proficiency: (level) => {
            if (!level) return '-';
            const stars = '★'.repeat(level) + '☆'.repeat(5 - level);
            return `<span title="Level ${level}/5">${stars}</span>`;
        },
        rating: MobileRenderers.renderRating,
        boolean: MobileRenderers.renderBoolean,
        date: MobileRenderers.renderDate
    };

})();
