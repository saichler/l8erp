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
// Learning Management Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { escapeHtml } = Layer8DUtils;
    const { createStatusRenderer, renderEnum, renderBoolean, renderDate, renderMoney } = Layer8DRenderers;

    window.Learning = window.Learning || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const COURSE_TYPE = factory.withValues([
        ['Unspecified', null], ['Training', 'training'], ['Certification', 'certification'],
        ['Compliance', 'compliance'], ['Onboarding', 'onboarding'],
        ['Leadership', 'leadership'], ['Skills', 'skills'], ['Safety', 'safety']
    ]);

    const COURSE_DELIVERY_METHOD = factory.withValues([
        ['Unspecified', null], ['Instructor Led', 'instructor'], ['Instructor Led', 'ilt'],
        ['Virtual ILT', 'virtual'], ['Virtual ILT', 'vilt'], ['E-Learning', 'elearning'],
        ['E-Learning', 'online'], ['Blended', 'blended'], ['On the Job', 'otj'],
        ['On the Job', 'job'], ['Self Study', 'self'], ['Self Study', 'study'], ['Webinar', 'webinar']
    ]);

    const COURSE_CATEGORY = factory.withValues([
        ['Unspecified', null], ['Technical', 'technical'], ['Soft Skills', 'soft'],
        ['Soft Skills', 'skills'], ['Leadership', 'leadership'], ['Compliance', 'compliance'],
        ['Safety', 'safety'], ['Product', 'product'], ['Process', 'process'], ['Tools', 'tools']
    ]);

    const COURSE_LEVEL = factory.withValues([
        ['Unspecified', null], ['Beginner', 'beginner'], ['Intermediate', 'intermediate'],
        ['Advanced', 'advanced'], ['Expert', 'expert']
    ]);

    const SESSION_STATUS = factory.create([
        ['Unspecified', null, ''], ['Scheduled', 'scheduled', 'layer8d-status-pending'],
        ['Open', 'open', 'layer8d-status-active'], ['Full', 'full', 'layer8d-status-pending'],
        ['In Progress', 'progress', 'layer8d-status-active'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Cancelled', 'cancelled', 'layer8d-status-terminated']
    ]);

    const COURSE_ENROLLMENT_STATUS = factory.create([
        ['Unspecified', null, ''], ['Pending', 'pending', 'layer8d-status-pending'],
        ['Active', 'active', 'layer8d-status-active'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Failed', 'failed', 'layer8d-status-terminated'],
        ['Cancelled', 'cancelled', 'layer8d-status-terminated'],
        ['Waitlisted', 'waitlisted', 'layer8d-status-pending'],
        ['Waitlisted', 'waitlist', 'layer8d-status-pending']
    ]);

    const CERTIFICATION_TYPE = factory.withValues([
        ['Unspecified', null], ['Professional', 'professional'], ['Technical', 'technical'],
        ['Industry', 'industry'], ['Vendor', 'vendor'], ['Government', 'government'], ['Internal', 'internal']
    ]);

    const CERTIFICATION_STATUS = factory.create([
        ['Unspecified', null, ''], ['In Progress', 'progress', 'layer8d-status-pending'],
        ['Active', 'active', 'layer8d-status-active'],
        ['Expired', 'expired', 'layer8d-status-terminated'],
        ['Revoked', 'revoked', 'layer8d-status-terminated'],
        ['Pending Renewal', 'pending', 'layer8d-status-pending'],
        ['Pending Renewal', 'renewal', 'layer8d-status-pending']
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

    window.Learning.enums = {
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
        COURSE_ENROLLMENT_STATUS: COURSE_ENROLLMENT_STATUS.enum,
        COURSE_ENROLLMENT_STATUS_VALUES: COURSE_ENROLLMENT_STATUS.values,
        CERTIFICATION_TYPE: CERTIFICATION_TYPE.enum,
        CERTIFICATION_TYPE_VALUES: CERTIFICATION_TYPE.values,
        CERTIFICATION_STATUS: CERTIFICATION_STATUS.enum,
        CERTIFICATION_STATUS_VALUES: CERTIFICATION_STATUS.values,
        SKILL_CATEGORY: SKILL_CATEGORY.enum,
        SKILL_CATEGORY_VALUES: SKILL_CATEGORY.values,
        TRAINING_TYPE: TRAINING_TYPE.enum,
        TRAINING_TYPE_VALUES: TRAINING_TYPE.values
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    const renderSessionStatus = createStatusRenderer(SESSION_STATUS.enum, SESSION_STATUS.classes);
    const renderCourseEnrollmentStatus = createStatusRenderer(COURSE_ENROLLMENT_STATUS.enum, COURSE_ENROLLMENT_STATUS.classes);
    const renderCertificationStatus = createStatusRenderer(CERTIFICATION_STATUS.enum, CERTIFICATION_STATUS.classes);

    function renderCourseDeliveryMethod(method) {
        const methodIcons = { 1: '👨‍🏫', 2: '💻', 3: '🖥️', 4: '🔄', 5: '🏢', 6: '📖', 7: '🎥' };
        const label = COURSE_DELIVERY_METHOD.enum[method] || 'Unknown';
        const icon = methodIcons[method] || '';
        return icon ? `${icon} ${escapeHtml(label)}` : escapeHtml(label);
    }

    function renderCourseLevel(level) {
        const levelColors = { 1: '#10b981', 2: '#3b82f6', 3: '#f59e0b', 4: '#7c3aed' };
        const label = COURSE_LEVEL.enum[level] || 'Unknown';
        const color = levelColors[level] || '#64748b';
        return `<span style="color: ${color}; font-weight: 500;">${escapeHtml(label)}</span>`;
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

    function renderCourseType(v) { return renderEnum(v, COURSE_TYPE.enum); }
    function renderCertificationType(v) { return renderEnum(v, CERTIFICATION_TYPE.enum); }
    function renderSkillCategory(v) { return renderEnum(v, SKILL_CATEGORY.enum); }
    function renderTrainingType(v) { return renderEnum(v, TRAINING_TYPE.enum); }

    window.Learning.render = {
        courseType: renderCourseType,
        courseDeliveryMethod: renderCourseDeliveryMethod,
        courseCategory: (v) => renderEnum(v, COURSE_CATEGORY.enum),
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

    window.Learning._internal = {
        renderSessionStatus, renderCourseEnrollmentStatus, renderCertificationStatus,
        renderCourseDeliveryMethod, renderCourseLevel, renderDurationMinutes,
        renderPercentageLearning, renderProficiencyLevel, renderRatingLearning,
        renderCourseType, renderCertificationType, renderSkillCategory, renderTrainingType
    };

})();
