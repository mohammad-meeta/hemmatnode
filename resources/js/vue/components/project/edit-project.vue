<template lang="pug">
.container-child
    notification(
        :notification-type="notificationType",
        @on-close="closeNotification",
        v-if="showNotification"
    )
        span(v-html="notificationMessage")

    .column.is-full(v-show="isLoadingMode")
        h1 در حال بارگذاری
    .form-small(v-show="! isLoadingMode")
        .field
            b-collapse.panel(
                aria-id="contentIdForA11y2",
                animation="slide",
                v-model="isOpen"
            )
                .inline-items.panel-heading(
                    slot="trigger",
                    slot-scope="props",
                    role="button",
                    aria-controls="contentIdForA11y2"
                )
                    strong
                        | مشخصات پروژه
                    .card-header-icon
                        b-icon(:icon="props.open ? 'menu-down' : 'menu-up'")
                .panel-block
                    .panel-full
                        .field
                            label.label نام پروژه
                            .control
                                input.input(
                                    type="text",
                                    placeholder="نام پروژه",
                                    autofocus,
                                    v-model="projectData.title",
                                    required
                                )
                        .field
                            label.label برنامه متناظر
                            .control
                                .select.is-primary
                                    select(v-model="projectData.program_id")
                                        option(
                                            v-for="(program, programIndex) in programs",
                                            :value="program._id"
                                        ) {{ program.title }}
                        .field
                            label.label هدف برنامه
                            .control
                                textarea.textarea(
                                    placeholder="هدف برنامه",
                                    v-model="projectData.target"
                                )
                        .field
                            label.label شاخص های اثر متناظر
                            .control
                                textarea.textarea(
                                    placeholder="شاخص های اثر متناظر",
                                    v-model="projectData.same_effects_index"
                                )
                        .panel
                            .panel-heading
                                | مشارکت کنندگان
                            .panel-block
                                .panel-full
                                    .field
                                        label.label مجری سازمانی
                                        .control
                                            input.input(
                                                type="text",
                                                placeholder="مجری سازمانی",
                                                autofocus,
                                                v-model="projectData.organ_moderator",
                                                required
                                            )
                                    .field
                                        label.label
                                            | مجری پروژه - پیمانکار
                                            .control
                                                input.input(
                                                    type="text",
                                                    placeholder="مجری پروژه - پیمانکار",
                                                    autofocus,
                                                    v-model="projectData.project_moderator",
                                                    required
                                                )
                                    .field
                                        label.label مشاورین
                                            .control
                                                input.input(
                                                    type="text",
                                                    placeholder="مشاورین",
                                                    autofocus,
                                                    v-model="projectData.consoultant",
                                                    required
                                                )
                                    .field
                                        label.label ناظر پروژه
                                            .control
                                                input.input(
                                                    type="text",
                                                    placeholder="ناظر پروژه",
                                                    autofocus,
                                                    v-model="projectData.supervisor",
                                                    required
                                                )
                                    .field
                                        label.label کمیته راهبردی طرح
                                        .control
                                            textarea.textarea(
                                                placeholder="کمیته راهبردی طرح",
                                                v-model="projectData.committee_leadership"
                                            )
                                    .field
                                        label.label همکاران اصلی پروژه
                                            .control
                                                input.input(
                                                    type="text",
                                                    placeholder="همکاران اصلی پروژه",
                                                    autofocus,
                                                    v-model="projectData.coworker",
                                                    required
                                                )

            b-collapse.panel(
                aria-id="contentIdForA11y2",
                animation="slide",
                v-model="isOpen"
            )
                .inline-items.panel-heading(
                    slot="trigger",
                    slot-scope="props",
                    role="button",
                    aria-controls="contentIdForA11y2"
                )
                    strong
                        | بیان ضرورت
                    .card-header-icon
                        b-icon(:icon="props.open ? 'menu-down' : 'menu-up'")
                .panel-block
                    .panel-full
                        .field
                            label.label
                                | تعریف مسئله -نیاز اصلی
                            .control
                                textarea.textarea(
                                    placeholder="تعریف مسئله -نیاز اصلی",
                                    v-model="projectData.description"
                                )
                        .field
                            label.label مروری برمداخلات و خدمات بهبوددهنده وضعیت درتجربیات جهانی و ملی
                            .control
                                textarea.textarea(
                                    placeholder="مروری برمداخلات و خدمات بهبوددهنده وضعیت در تجربیات جهانی و ملی",
                                    v-model="projectData.intervention_review"
                                )
                        .field
                            label.label
                                | ارتباط پروژه با اقدامات قبلی سازمان یا سازمان های دیگر در پرداختن به این مسئله-تکمیل کننده،نقض کننده،جدید بودن
                            .control
                                textarea.textarea(
                                    placeholder="ارتباط پروژه با اقدامات قبلی سازمان یا سازمان های دیگر در پرداختن به این مسئله-تکمیل کننده،نقض کننده،جدیدبودن",
                                    v-model="projectData.pervious_action_relation"
                                )
                        .field
                            label.checkbox
                                input(
                                    type="checkbox",
                                    v-model="projectData.target_corresponding"
                                )
                                |
                                | تناظر با اهداف راهبردی و اسناد بالادستی سازمان؟
                        .field
                            label.label به ارتقای کدام شاخص اثر کمک می کند؟
                                .control
                                    input.input(
                                        type="text",
                                        placeholder="به ارتقای کدام شاخص اثر کمک می کند؟",
                                        autofocus,
                                        v-model="projectData.help_ipmrove_index",
                                        required
                                    )
                        .field
                            label.label
                                |
                                | سایر فواید پروژه درحیطه
                            .control
                                textarea.textarea(
                                    placeholder="سایرفواید پروژه درحیطه",
                                    v-model="projectData.other_benefit"
                                )

            b-collapse.panel(
                aria-id="contentIdForA11y2",
                animation="slide",
                v-model="isOpen"
            )
                .inline-items.panel-heading(
                    slot="trigger",
                    slot-scope="props",
                    role="button",
                    aria-controls="contentIdForA11y2"
                )
                    strong
                        | برآمد های پروژه
                    .card-header-icon
                        b-icon(:icon="props.open ? 'menu-down' : 'menu-up'")
                .panel-block
                    .panel-full
                        .container.main-content
                            .inline-cards
                                .inline-card.w-100(
                                    v-for="result in projectData.results"
                                )
                                    .inline-card-body-item
                                        a(
                                            @click.prevent="showResultData(result)"
                                        ) {{ result.result }}
                                        b-modal.departments-modal(
                                            :active.sync="isModalActive"
                                        )
                                            list-result(
                                                :result="selectedResult"
                                            )

                        //- b-collapse.card(animation='slide', v-for='(result, index) of projectData.results', :key='index', :open='isOpen == index', @open='isOpen = index')
                        //-     .card-header(slot='trigger', slot-scope='props', role='button')
                        //-         p.card-header-title
                        //-             | {{ result.result }}
                        //-         a.card-header-icon
                        //-             b-icon(:icon="props.open ? 'menu-down' : 'menu-up'")
                        //-     .card-content
                        //-         .content
                        //-             .field
                        //-                 label.label
                        //-                     | عنوان
                        //-                 .control
                        //-                     input.input(placeholder='عنوان', v-model='result.result')

                        //-             .field
                        //-                 label.label
                        //-                     | استاندارد
                        //-                 .control
                        //-                     input.input(placeholder='استاندارد', v-model='result.standard')

                        //-             .field
                        //-                 label.label
                        //-                     | هزینه
                        //-                 .control
                        //-                     input.input(type='text' ,placeholder='هزینه', v-model='result.cast')

                        //-             .field
                        //-                 label.label
                        //-                     | تاریخ
                        //-                 .control
                        //-                     date-picker(v-model='result.deadline' format="YYYY-MM-DD HH:mm:ss"
                        //-                         display-format="jDD/jMM/jYYYY HH:mm" type="datetime" required)

                        //-             .field
                        //-                 label.label
                        //-                     | فایل
                        //-                 .control
                        //-                     result-file-upload(ref="resultFileUpload", :old-files="resultOldFiles")

        .field
            label.label هدف کلی (محصول پروژه)
                .control
                    input.input(
                        type="text",
                        placeholder="هدف کلی (محصول پروژه)",
                        autofocus,
                        v-model="projectData.final_product",
                        required
                    )
        .field
            label.label
                |
                | نحوه کاربست محصول پروژه
            .control
                textarea.textarea(
                    placeholder="نحوه کاربست محصول پروژه",
                    v-model="projectData.result_apply"
                )
        .field
            .panel
                .panel-heading
                    | فایل های ضمیمه
                .panel-block
                    file-upload(ref="fileUpload", :old-files="oldFiles")
        .field
            label.checkbox
                input(type="checkbox", v-model="projectData.is_active")
                |
                | فعال
        .field.is-grouped
            .control(v-show="! isLoadingMode")
                a.button.is-link.is-rounded(
                    href="#",
                    @click.prevent="commandClick(ENUMS.COMMAND.SAVE)"
                )
                    |
                    | ثبت
</template>

<script>
"use strict";

const AxiosHelper = require("JS-HELPERS/axios-helper");
const ENUMS = require("JS-HELPERS/enums");
const ProjectValidator = require("JS-VALIDATORS/project-register-validator");
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const FileUpload = require("VUE-COMPONENTS/general/file-upload.vue").default;
const ListResult = require("VUE-COMPONENTS/project/list-result.vue").default;

export default {
    name: "EditProject",

    components: {
        Notification,
        FileUpload,
        ListResult,
    },

    data: () => ({
        ENUMS,
        selectedResult: {},
        fileList: [],
        files: [],
        deletedOldFiles: [],
        oldFiles: [],
        programs: [],
        projectData: {
            title: null,
            program_id: null,
            target: null,
            same_effects_index: null,
            organ_moderator: null,
            project_moderator: null,
            consoultant: null,
            supervisor: null,
            committee_leadership: null,
            coworker: null,
            description: null,
            intervention_review: null,
            pervious_action_relation: null,
            target_corresponding: null,
            help_ipmrove_index: null,
            final_product: null,
            other_benefit: null,
            result_apply: null,
            files: {},
            results: [],
            oldFiles: [],
            deletedOldFiles: [],
            is_active: false,
        },

        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false,
        isOpen: true,
        isModalActive: false,
    }),

    props: {
        registerUrl: {
            type: String,
            default: "",
        },

        editUrl: {
            type: String,
            default: "",
        },

        editResultUrl: {
            type: String,
            default: null,
        },

        programsUrl: {
            type: String,
            default: "",
        },
    },

    created() {
        this.loadPrograms();
    },

    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
    },

    methods: {
        /**
         * show result data
         */
        showResultData(payload) {
            Vue.set(this, "selectedResult", payload);
            this.isModalActive = true;
        },
        /**
         * Load specific project
         */
        loadProjectData(data) {
            const temp = {
                _id: data._id,
                dep: data.dep.title,
                department_id: data.dep._id,
                files: data.files,
                is_active: data.is_active,
                title: data.title,
                program_id: data.program_id,
                target: data.target,
                results: data.results,
                same_effects_index: data.same_effects_index,
                organ_moderator: data.organ_moderator,
                project_moderator: data.project_moderator,
                consoultant: data.consoultant,
                supervisor: data.supervisor,
                committee_leadership: data.committee_leadership,
                coworker: data.coworker,
                description: data.description,
                intervention_review: data.intervention_review,
                pervious_action_relation: data.pervious_action_relation,
                target_corresponding: data.target_corresponding,
                help_ipmrove_index: data.help_ipmrove_index,
                final_product: data.final_product,
                other_benefit: data.other_benefit,
                result_apply: data.result_apply,
            };

            Vue.set(this, "oldFiles", data.files);
            this.$refs.fileUpload.updateOldFiles(data.files);

            Vue.set(this, "projectData", temp);
        },
        /**
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg) {
            switch (arg) {
                case ENUMS.COMMAND.SAVE:
                    this.editProject();
                    break;
            }
        },

        /**
         * Load all programs for select programs in form
         */
        async loadPrograms() {
            const res = await AxiosHelper.send("get", this.programsUrl, "");
            let data = res.data;
            data = data.data.data;
            Vue.set(this, "programs", data);
        },

        /**
         * Show Loading
         */
        showLoading() {
            Vue.set(this, "showLoadingFlag", true);
        },

        /**
         * HideLoading
         */
        hideLoading() {
            Vue.set(this, "showLoadingFlag", false);
        },

        /**
         * Set notification
         */
        setNotification(message, notificationType = "is-info") {
            Vue.set(this, "notificationType", notificationType);
            Vue.set(this, "notificationMessage", message);
        },

        /**
         * Close Notification
         */
        closeNotification() {
            this.setNotification(null);
        },

        /**
         * Edit project
         */
        editProject() {
            const isValid = this.validate();
            if (!isValid) {
                return;
            }

            /******************************************************** */
            const Presults = this.projectData.results;
            for (let index = 0; index < Presults.length; index++) {
                const element = Presults[index];

                const urlResult = this.editResultUrl.replace(
                    "$id$",
                    element._id
                );

                const newResFiles = element.resfiles.filter(
                    (x) => x instanceof File
                );
                const deletedResFiles = element.resfiles.filter(
                    (x) => x.deleted
                );

                const resultData = {
                    _id: element._id,
                    files: newResFiles,
                    result: element.result,
                    project_id: this.projectData._id,
                    standard: element.standard,
                    cast: element.cast,
                    deadline: element.deadline,
                    deletedOldFiles: deletedResFiles,
                    is_active: true,
                };

                AxiosHelper.send("patch", urlResult, resultData, {
                    sendAsFormData: true,
                    filesArray: "files",
                })
                    .then((res) => {
                        //const data = JSON.parse(res.config.data);
                        const data = res.data;
                        this.$emit("on-result-update", {
                            sender: this,
                            data,
                        });
                    })
                    .catch((err) => {
                        console.error(err);
                        this.setNotification(
                            ".خطا در ویرایش برآمدها",
                            "is-danger"
                        );
                    })
                    .then(() => this.hideLoading());
            }
            /********************************** */

            const deletedFiles = this.$refs.fileUpload.getDeletedFiles();
            const newFiles = this.$refs.fileUpload.getNewFiles();

            let newUploaded = newFiles.map((x) => x.file);
            Vue.set(this, "files", newUploaded);

            let deleteUploaded = deletedFiles.map((x) => x._id);
            Vue.set(this, "deletedOldFiles", deleteUploaded);

            let projectData = {
                _id: this.projectData._id,
                title: this.projectData.title,
                body: this.projectData.body,
                department_id: this.projectData.department_id,
                is_active: this.projectData.is_active,
                files: this.files,
                oldFiles: this.oldFiles,
                deletedOldFiles: this.deletedOldFiles,
                program_id: this.projectData.program_id,
                target: this.projectData.target,
                same_effects_index: this.projectData.same_effects_index,
                organ_moderator: this.projectData.organ_moderator,
                project_moderator: this.projectData.project_moderator,
                consoultant: this.projectData.consoultant,
                supervisor: this.projectData.supervisor,
                committee_leadership: this.projectData.committee_leadership,
                coworker: this.projectData.coworker,
                description: this.projectData.description,
                intervention_review: this.projectData.intervention_review,
                pervious_action_relation: this.projectData
                    .pervious_action_relation,
                target_corresponding: this.projectData.target_corresponding,
                help_ipmrove_index: this.projectData.help_ipmrove_index,
                final_product: this.projectData.final_product,
                other_benefit: this.projectData.other_benefit,
                result_apply: this.projectData.result_apply,
            };

            this.showLoading();
            const url = this.editUrl.replace("$id$", projectData._id);
            AxiosHelper.send("patch", url, projectData, {
                sendAsFormData: true,
                filesArray: "files",
            })
                .then((res) => {
                    //const data = JSON.parse(res.config.data);
                    const data = res.data;
                    this.$emit("on-update", {
                        sender: this,
                        data,
                    });
                })
                .catch((err) => {
                    console.error(err);
                    this.setNotification(".خطا در ویرایش پروژه", "is-danger");
                })
                .then(() => this.showLoading());
        },

        /**
         * Validate new project data
         */
        validate() {
            const result = ProjectValidator.validate(this.projectData);

            if (result.passes) {
                this.closeNotification();
                return true;
            }

            const errors = result.validator.errors.all();
            const error = Object.keys(errors)
                .map((key) => errors[key].join("\n"))
                .join("</br>");

            console.log(error);
            this.setNotification(error, "is-danger");
            return false;
        },
    },
};
</script>
