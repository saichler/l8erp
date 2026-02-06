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
 * Mobile Learning Management Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: hcm/learning/learning-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderMinutes, renderProgress, renderRating, renderBoolean, renderDate } = Layer8MRenderers;

    window.MobileLearning = window.MobileLearning || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const COURSE_TYPE = factory.withValues([
        ['Unspecified', null], ['Training', 'training'], ['Certification', 'certification'],
        ['Compliance', 'compliance'], ['Onboarding', 'onboarding'], ['Leadership', 'leadership'],
        ['Skills', 'skills'], ['Safety', 'safety']
    ]);

    const COURSE_DELIVERY_METHOD = factory.withValues([
        ['Unspecified', null], ['Instructor Led', 'instructor'], ['Virtual ILT', 'virtual'],
        ['E-Learning', 'elearning'], ['Blended', 'blended'], ['On the Job', 'otj'],
        ['Self Study', 'self'], ['Webinar', 'webinar']
    ]);

    const COURSE_CATEGORY = factory.withValues([
        ['Unspecified', null], ['Technical', 'technical'], ['Soft Skills', 'soft'],
        ['Leadership', 'leadership'], ['Compliance', 'compliance'], ['Safety', 'safety'],
        ['Product', 'product'], ['Process', 'process'], ['Tools', 'tools']
    ]);

    const COURSE_LEVEL = factory.withValues([
        ['Unspecified', null], ['Beginner', 'beginner'], ['Intermediate', 'intermediate'],
        ['Advanced', 'advanced'], ['Expert', 'expert']
    ]);

    const SESSION_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Scheduled', 'scheduled', 'status-pending'],
        ['Open', 'open', 'status-active'],
        ['Full', 'full', 'status-pending'],
        ['In Progress', 'progress', 'status-active'],
        ['Completed', 'completed', 'status-active'],
        ['Cancelled', 'cancelled', 'status-terminated']
    ]);

    const COURSE_ENROLLMENT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'status-pending'],
        ['Active', 'active', 'status-active'],
        ['Completed', 'completed', 'status-active'],
        ['Failed', 'failed', 'status-terminated'],
        ['Cancelled', 'cancelled', 'status-terminated'],
        ['Waitlisted', 'waitlisted', 'status-pending']
    ]);

    const CERTIFICATION_TYPE = factory.withValues([
        ['Unspecified', null], ['Professional', 'professional'], ['Technical', 'technical'],
        ['Industry', 'industry'], ['Vendor', 'vendor'], ['Government', 'government'], ['Internal', 'internal']
    ]);

    const CERTIFICATION_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['In Progress', 'progress', 'status-pending'],
        ['Active', 'active', 'status-active'],
        ['Expired', 'expired', 'status-terminated'],
        ['Revoked', 'revoked', 'status-terminated'],
        ['Pending Renewal', 'pending', 'status-pending']
    ]);

    const SKILL_CATEGORY = factory.withValues([
        ['Unspecified', null], ['Technical', 'technical'], ['Soft Skill', 'soft'],
        ['Leadership', 'leadership'], ['Language', 'language'], ['Tool', 'tool'],
        ['Domain', 'domain'], ['Certification', 'certification']
    ]);

    const TRAINING_TYPE = factory.withValues([
        ['Unspecified', null], ['Compliance', 'compliance'], ['Safety', 'safety'],
        ['Security', 'security'], ['Harassment', 'harassment'], ['Diversity', 'diversity'],
        ['Ethics', 'ethics'], ['HIPAA', 'hipaa'], ['GDPR', 'gdpr'], ['SOX', 'sox']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileLearning.enums = {
        COURSE_TYPE: COURSE_TYPE.enum,
        COURSE_TYPE_VALUES: COURSE_TYPE.values,
        COURSE_DELIVERY_METHOD: COURSE_DELIVERY_METHOD.enum,
        COURSE_DELIVERY_METHOD_VALUES: COURSE_DELIVERY_METHOD.values,
        COURSE_CATEGORY: COURSE_CATEGORY.enum,
        COURSE_CATEGORY_VALUES: COURSE_CATEGORY.values,
        COURSE_LEVEL: COURSE_LEVEL.enum,
        COURSE_LEVEL_VALUES: COURSE_LEVEL.values,
        SESSION_STATUS: SESSION_STATUS.enum,
        SESSION_STATUS_VALUES: SESSION_STATUS.values,
        SESSION_STATUS_CLASSES: SESSION_STATUS.classes,
        COURSE_ENROLLMENT_STATUS: COURSE_ENROLLMENT_STATUS.enum,
        COURSE_ENROLLMENT_STATUS_VALUES: COURSE_ENROLLMENT_STATUS.values,
        COURSE_ENROLLMENT_STATUS_CLASSES: COURSE_ENROLLMENT_STATUS.classes,
        CERTIFICATION_TYPE: CERTIFICATION_TYPE.enum,
        CERTIFICATION_TYPE_VALUES: CERTIFICATION_TYPE.values,
        CERTIFICATION_STATUS: CERTIFICATION_STATUS.enum,
        CERTIFICATION_STATUS_VALUES: CERTIFICATION_STATUS.values,
        CERTIFICATION_STATUS_CLASSES: CERTIFICATION_STATUS.classes,
        SKILL_CATEGORY: SKILL_CATEGORY.enum,
        SKILL_CATEGORY_VALUES: SKILL_CATEGORY.values,
        TRAINING_TYPE: TRAINING_TYPE.enum,
        TRAINING_TYPE_VALUES: TRAINING_TYPE.values
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileLearning.render = {
        courseType: (v) => renderEnum(v, COURSE_TYPE.enum),
        courseDeliveryMethod: (method) => {
            const icons = { 1: '👨‍🏫', 2: '💻', 3: '🖥️', 4: '🔄', 5: '🏢', 6: '📖', 7: '🎥' };
            const label = COURSE_DELIVERY_METHOD.enum[method] || 'Unknown';
            return icons[method] ? `${icons[method]} ${Layer8MUtils.escapeHtml(label)}` : Layer8MUtils.escapeHtml(label);
        },
        courseCategory: (v) => renderEnum(v, COURSE_CATEGORY.enum),
        courseLevel: (level) => {
            const colors = { 1: '#10b981', 2: '#3b82f6', 3: '#f59e0b', 4: '#7c3aed' };
            const label = COURSE_LEVEL.enum[level] || 'Unknown';
            return `<span style="color: ${colors[level] || '#64748b'}; font-weight: 500;">${Layer8MUtils.escapeHtml(label)}</span>`;
        },
        sessionStatus: createStatusRenderer(SESSION_STATUS.enum, SESSION_STATUS.classes),
        courseEnrollmentStatus: createStatusRenderer(COURSE_ENROLLMENT_STATUS.enum, COURSE_ENROLLMENT_STATUS.classes),
        certificationType: (v) => renderEnum(v, CERTIFICATION_TYPE.enum),
        certificationStatus: createStatusRenderer(CERTIFICATION_STATUS.enum, CERTIFICATION_STATUS.classes),
        skillCategory: (v) => renderEnum(v, SKILL_CATEGORY.enum),
        trainingType: (v) => renderEnum(v, TRAINING_TYPE.enum),
        duration: renderMinutes,
        percentage: renderProgress,
        proficiency: (level) => {
            if (!level) return '-';
            const stars = '★'.repeat(level) + '☆'.repeat(5 - level);
            return `<span title="Level ${level}/5">${stars}</span>`;
        },
        rating: renderRating,
        boolean: renderBoolean,
        date: renderDate
    };

})();
