/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/general/file-upload.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/vue/components/general/file-upload.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var uuidV4 = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js").v4;

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "FileUpload",
  props: {
    oldFiles: {
      type: Array,
      "default": function _default() {
        return [];
      }
    }
  },
  computed: {
    fileList: function fileList(state) {
      return state.files.filter(function (x) {
        return !x.is_deleted;
      });
    }
  },
  data: function data() {
    return {
      files: []
    };
  },

  /**
   * Create method
   */
  created: function created() {},
  methods: {
    /**
     * Update old files
     */
    updateOldFiles: function updateOldFiles(oldFiles) {
      var _this = this;

      Vue.set(this, "files", []);
      oldFiles.forEach(function (file) {
        var item = {
          _id: file._id,
          type: "old",
          file: _objectSpread({}, file),
          is_deleted: false
        };
        Vue.set(_this.files, _this.files.length, item);
      });
    },

    /**
     * Get files list
     */
    getFiles: function getFiles() {
      return this.files;
    },

    /**
     * Get deleted files list
     */
    getDeletedFiles: function getDeletedFiles() {
      return this.files.filter(function (x) {
        return x.is_deleted;
      });
    },

    /**
     * Get new files
     */
    getNewFiles: function getNewFiles() {
      return this.files.filter(function (x) {
        return x.type == "new";
      });
    },

    /**
     * Show file upload
     */
    showFileUpload: function showFileUpload() {
      this.$refs.fileInput.click();
    },

    /**
     * Add new attachment(s)
     */
    addAttachment: function addAttachment() {
      var files = this.$refs.fileInput.files;

      for (var i = 0; i < files.length; ++i) {
        var obj = {
          _id: uuidV4(),
          type: "new",
          file: files[i],
          is_deleted: false
        };
        console.log(obj);
        Vue.set(this.files, this.files.length, obj);
      }
    },

    /**
     * Remove a file from list
     */
    removeFile: function removeFile(file) {
      var confirmDelete = confirm("آیا برای حذف فایل اطمینان دارید؟");

      if (confirmDelete) {
        if (file.type == "old") {
          Vue.set(file, "is_deleted", true);
        } else {
          var index = this.files.findIndex(function (x) {
            return x._id == file._id;
          });
          Vue["delete"](this.files, index);
        }
      }
    },

    /**
     * Human size
     */
    humanFileSize: function humanFileSize(bytes) {
      var si = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var dp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var thresh = si ? 1000 : 1024;

      if (Math.abs(bytes) < thresh) {
        return bytes + " B";
      }

      var units = si ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"] : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
      var u = -1;
      var r = Math.pow(10, dp);

      do {
        bytes /= thresh;
        ++u;
      } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

      return bytes.toFixed(dp) + " " + units[u];
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/general/loading.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/vue/components/general/loading.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
//
//
//
//
//
//


module.exports = {
  name: "Loading"
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/general/notification.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/vue/components/general/notification.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

//
//
//
//
//
//
module.exports = {
  name: "Notifiaction",
  props: {
    notificationType: {
      type: String,
      "default": "is-info"
    }
  },
  methods: {
    /**
     * Close notification dialog
     */
    closeNotifiaction: function closeNotifiaction(e) {
      this.$emit('on-close', this);
    }
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/user/edit-user.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/vue/components/user/edit-user.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var _ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");

var AxiosHelper = __webpack_require__(/*! JS-HELPERS/axios-helper */ "./resources/js/helpers/axios-helper.js");

var ENUMS = __webpack_require__(/*! JS-HELPERS/enums */ "./resources/js/helpers/enums.js");

var UserValidator = __webpack_require__(/*! JS-VALIDATORS/user-register-validator */ "./resources/js/validators/user-register-validator.js");

var Notification = __webpack_require__(/*! VUE-COMPONENTS/general/notification.vue */ "./resources/js/vue/components/general/notification.vue")["default"];

var FileUpload = __webpack_require__(/*! VUE-COMPONENTS/general/file-upload.vue */ "./resources/js/vue/components/general/file-upload.vue")["default"];

module.exports = {
  name: "EditUser",
  components: {
    Notification: Notification,
    FileUpload: FileUpload
  },
  data: function data() {
    return {
      ENUMS: ENUMS,
      roles: [],
      files: [],
      deletedOldFiles: [],
      oldFiles: [],
      departments: [],
      userData: {
        name: null,
        password: null,
        email: null,
        firstName: null,
        lastName: null,
        nationCode: null,
        cellphone: null,
        files: [],
        deletedOldFiles: [],
        isActive: false,
        role_group_role: [],
        role_group_group: null
      },
      notificationMessage: null,
      notificationType: "is-info",
      showLoadingFlag: false
    };
  },
  props: {
    editUrl: {
      type: String,
      "default": ""
    },
    rolesUrl: {
      type: String,
      "default": ""
    },
    departmentsUrl: {
      type: String,
      "default": ""
    },
    userDatas: {
      role_group_role: [],
      role_group_group: null
    }
  },
  created: function created() {
    this.loadRoles();
    this.loadDepartments();
  },
  computed: {
    isLoadingMode: function isLoadingMode(state) {
      return state.showLoadingFlag == true;
    },
    showNotification: function showNotification(state) {
      return state.notificationMessage != null;
    }
  },
  methods: {
    /**
     * Load specific user
     */
    loadUserData: function loadUserData(data) {
      var temp = {
        _id: data._id,
        name: data.name,
        email: data.email,
        firstName: data.profile.first_name,
        lastName: data.profile.last_name,
        nationCode: data.profile.nation_code,
        cellphone: data.cellphone,
        role_group_role: JSON.parse(data.role_group_role),
        role_group_group: data.role_group_group,
        files: _.cloneDeep(data.files),
        isActive: data.is_active
      };
      Vue.set(this, "oldFiles", temp.files);
      Vue.set(this, "userData", temp);
      this.$refs.fileUpload.updateOldFiles(data.files);
    },

    /**
     * load all roles for select roles in form
     */
    loadRoles: function loadRoles() {
      var _this = this;

      var url = this.rolesUrl;
      AxiosHelper.send("get", url, "").then(function (res) {
        var resData = res.data;
        var datas = resData.data.data;
        Vue.set(_this, "roles", datas);
      });
    },

    /**
     * load all departments for select departments in form
     */
    loadDepartments: function loadDepartments() {
      var _this2 = this;

      var url = this.departmentsUrl;
      AxiosHelper.send("get", url, "").then(function (res) {
        var resData = res.data;
        var datas = resData.data;
        Vue.set(_this2, "departments", datas.data);
      });
    },

    /**
     * On Command
     *
     * @param      {Object}  arg     The argument
     */
    commandClick: function commandClick(arg) {
      switch (arg) {
        case ENUMS.COMMAND.SAVE:
          this.editUser();
          break;
      }
    },

    /**
     * Show Loading
     */
    showLoading: function showLoading() {
      Vue.set(this, "showLoadingFlag", true);
    },

    /**
     * HideLoading
     */
    hideLoading: function hideLoading() {
      Vue.set(this, "showLoadingFlag", false);
    },

    /**
     * Set notification
     */
    setNotification: function setNotification(message) {
      var notificationType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "is-info";
      Vue.set(this, "notificationType", notificationType);
      Vue.set(this, "notificationMessage", message);
    },

    /**
     * Close Notification
     */
    closeNotification: function closeNotification() {
      this.setNotification(null);
    },

    /**
     * Edit user
     */
    editUser: function editUser() {
      var _this3 = this;

      if (!this.validate()) {
        return;
      }

      this.showLoading();
      var userData = {
        _id: this.userData._id,
        name: this.userData.name,
        password: this.userData.password,
        email: this.userData.email,
        first_name: this.userData.firstName,
        last_name: this.userData.lastName,
        nation_code: this.userData.nationCode,
        cellphone: this.userData.cellphone,
        role_group_role: this.userData.role_group_role,
        role_group_group: this.userData.role_group_group,
        is_active: this.userData.isActive,
        files: this.files,
        deletedOldFiles: this.deletedOldFiles
      };
      var url = this.editUrl.replace("$id$", userData._id);
      AxiosHelper.send("patch", url, userData, {
        sendAsFormData: true,
        filesArray: "files"
      }).then(function (res) {
        var data = res.data;

        _this3.$emit("on-update", {
          sender: _this3,
          data: data
        });
      })["catch"](function (err) {
        console.error(err);

        _this3.setNotification(".خطا در ذخیره کاربر", "is-danger");
      }).then(function () {
        return _this3.hideLoading();
      });
    },

    /**
     * Validate new user data
     */
    validate: function validate() {
      var result = UserValidator.validateEdit(this.userData);

      if (result.passes) {
        this.closeNotification();
        return true;
      }

      var errors = result.validator.errors.all();
      var error = Object.keys(errors).map(function (key) {
        return errors[key].join("\n");
      }).join("</br>");
      console.log(error);
      this.setNotification(error, "is-danger");
      return false;
    }
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/user/list-user.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/vue/components/user/list-user.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var ENUMS = __webpack_require__(/*! JS-HELPERS/enums */ "./resources/js/helpers/enums.js");

var Paginate = __webpack_require__(/*! vuejs-paginate */ "./node_modules/vuejs-paginate/dist/index.js");

Vue.component("paginate", Paginate);
module.exports = {
  props: {
    listUrl: {
      type: String,
      "default": ""
    }
  },
  data: function data() {
    return {
      ENUMS: ENUMS,
      users: [],
      usersCount: 0,
      pageCount: 0
    };
  },
  computed: {
    hasUsers: function hasUsers(state) {
      return (state.users || []).length;
    }
  },
  methods: {
    /**
     * Load users
     */
    loadUsers: function loadUsers(pageId) {
      var _this = this;

      var url = this.listUrl.replace("$page$", pageId);
      url = url.replace("$pageSize$", 50);
      AxiosHelper.send("get", url, "").then(function (res) {
        var resData = res.data;
        Vue.set(_this, "users", resData.data.data);
        Vue.set(_this, "usersCount", resData.data.count);

        _this.paginator();
      });
    },

    /**
     * On Command
     *
     * @param      {Object}  arg     The argument
     */
    commandClick: function commandClick(arg, data) {
      this.$emit("on-command", {
        arg: arg,
        data: data
      });
    },

    /**
     * To Persian Date
     */
    toPersianDate: function toPersianDate(date) {
      return DateHelper.toPersianDateLong(date);
    },

    /**
     * Paginator
     */
    paginator: function paginator() {
      var pageCount = Math.ceil(this.usersCount / 50);
      Vue.set(this, "pageCount", pageCount);
    },

    /**
     * paginator click link
     */
    paginatorClick: function paginatorClick(id) {
      this.loadUsers(id);
    },

    /**
     * add new user data to list data
     */
    addToUserList: function addToUserList(payload) {
      var newUserData = {
        _id: payload.data._id,
        name: payload.data.name,
        email: payload.data.email,
        profile: {
          first_name: payload.data.profile.first_name,
          last_name: payload.data.profile.last_name,
          nation_code: payload.data.profile.nation_code
        },
        cellphone: payload.data.cellphone,
        is_active: payload.data.is_active,
        createdAt: payload.data.createdAt
      };
      this.users.unshift(newUserData);
    },
    editInUserList: function editInUserList(payload) {
      var data = payload.data;
      var editedUserData = {
        _id: data._id,
        name: data.name,
        email: data.email,
        cellphone: data.cellphone,
        is_active: data.is_active,
        createdAt: data.createdAt,
        first_name: data.profile.first_name,
        last_name: data.profile.last_name,
        nation_code: data.profile.nation_code
      };
      console.log(editedUserData);
      var foundIndex = this.users.findIndex(function (x) {
        return x._id == editedUserData._id;
      });
      this.users[foundIndex].name = editedUserData.name;
      this.users[foundIndex].email = editedUserData.email;
      this.users[foundIndex].profile.first_name = editedUserData.first_name;
      this.users[foundIndex].profile.last_name = editedUserData.last_name;
      this.users[foundIndex].profile.nation_code = editedUserData.nation_code;
      this.users[foundIndex].cellphone = editedUserData.cellphone;
      this.users[foundIndex].is_active = editedUserData.is_active;
    }
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/user/register-user.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/vue/components/user/register-user.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var AxiosHelper = __webpack_require__(/*! JS-HELPERS/axios-helper */ "./resources/js/helpers/axios-helper.js");

var ENUMS = __webpack_require__(/*! JS-HELPERS/enums */ "./resources/js/helpers/enums.js");

var UserValidator = __webpack_require__(/*! JS-VALIDATORS/user-register-validator */ "./resources/js/validators/user-register-validator.js");

var Notification = __webpack_require__(/*! VUE-COMPONENTS/general/notification.vue */ "./resources/js/vue/components/general/notification.vue")["default"];

var FileUpload = __webpack_require__(/*! VUE-COMPONENTS/general/file-upload.vue */ "./resources/js/vue/components/general/file-upload.vue")["default"];

module.exports = {
  name: "RegisterUser",
  components: {
    Notification: Notification,
    FileUpload: FileUpload
  },
  data: function data() {
    return {
      ENUMS: ENUMS,
      roles: [],
      files: [],
      deletedOldFiles: [],
      oldFiles: [],
      departments: [],
      userData: {
        name: null,
        password: null,
        email: null,
        firstName: null,
        lastName: null,
        nationCode: null,
        cellphone: null,
        files: [],
        deletedOldFiles: [],
        isActive: false,
        role_group_role: [],
        role_group_group: null
      },
      notificationMessage: null,
      notificationType: "is-info",
      showLoadingFlag: false
    };
  },
  props: {
    registerUrl: {
      type: String,
      "default": ""
    },
    rolesUrl: {
      type: String,
      "default": ""
    },
    departmentsUrl: {
      type: String,
      "default": ""
    }
  },
  created: function created() {
    this.loadRoles();
    this.loadDepartments();
  },
  computed: {
    isLoadingMode: function isLoadingMode(state) {
      return state.showLoadingFlag == true;
    },
    showNotification: function showNotification(state) {
      return state.notificationMessage != null;
    }
  },
  methods: {
    /**
     * On Command
     *
     * @param      {Object}  arg     The argument
     */
    commandClick: function commandClick(arg) {
      switch (arg) {
        case ENUMS.COMMAND.SAVE:
          this.registerUser();
          break;
      }
    },

    /**
     * load all departments for select departments in form
     */
    loadDepartments: function loadDepartments() {
      var _this = this;

      var url = this.departmentsUrl;
      AxiosHelper.send("get", url, "").then(function (res) {
        var resData = res.data;
        var datas = resData.data.data;
        Vue.set(_this, "departments", datas);
      });
    },

    /**
     * load all roles for select roles in form
     */
    loadRoles: function loadRoles() {
      var _this2 = this;

      var url = this.rolesUrl;
      AxiosHelper.send("get", url, "").then(function (res) {
        var resData = res.data;
        var datas = resData.data.data;
        Vue.set(_this2, "roles", datas);
      });
    },

    /**
     * Show Loading
     */
    showLoading: function showLoading() {
      Vue.set(this, "showLoadingFlag", true);
    },

    /**
     * HideLoading
     */
    hideLoading: function hideLoading() {
      Vue.set(this, "showLoadingFlag", false);
    },

    /**
     * Set notification
     */
    setNotification: function setNotification(message) {
      var notificationType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "is-info";
      Vue.set(this, "notificationType", notificationType);
      Vue.set(this, "notificationMessage", message);
    },

    /**
     * Close Notification
     */
    closeNotification: function closeNotification() {
      this.setNotification(null);
    },

    /**
     * Register new user
     */
    registerUser: function registerUser() {
      var _this3 = this;

      var isValid = this.validate();

      if (!isValid) {
        return;
      }

      var deletedFiles = this.$refs.fileUpload.getDeletedFiles();
      var newFiles = this.$refs.fileUpload.getNewFiles();
      var newUploaded = newFiles.map(function (x) {
        return x.file;
      });
      Vue.set(this, "files", newUploaded);
      var deleteUploaded = deletedFiles.map(function (x) {
        return x._id;
      });
      Vue.set(this, "deletedOldFiles", deleteUploaded);
      var userData = {
        name: this.userData.name,
        password: this.userData.password,
        email: this.userData.email,
        first_name: this.userData.firstName,
        last_name: this.userData.lastName,
        nation_code: this.userData.nationCode,
        cellphone: this.userData.cellphone,
        role_group_role: this.userData.role_group_role,
        role_group_group: this.userData.role_group_group,
        is_active: this.userData.isActive,
        files: this.files,
        deletedOldFiles: this.deletedOldFiles
      };
      this.showLoading();
      var url = this.registerUrl;
      console.log(userData);
      AxiosHelper.send("post", url, userData, {
        sendAsFormData: true,
        filesArray: "files"
      }).then(function (res) {
        var data = res.data;

        if (data.success) {
          _this3.$emit("on-register", {
            sender: _this3,
            data: {
              data: data
            }
          });
        }
      })["catch"](function (err) {
        var data = err.response.data;

        _this3.setNotification(data, "is-danger");
      }).then(function () {
        return _this3.hideLoading();
      }); //this.changeFormMode(ENUMS.FORM_MODE.LIST);
      //this.$refs.userList.loadUsers(1);
    },

    /**
     * Validate new user data
     */
    validate: function validate() {
      var result = UserValidator.validate(this.userData);

      if (result.passes) {
        this.closeNotification();
        return true;
      }

      var errors = result.validator.errors.all();
      var error = Object.keys(errors).map(function (key) {
        return errors[key].join("\n");
      }).join("</br>");
      console.log(error);
      this.setNotification(error, "is-danger");
      return false;
    }
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/user/show-user.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/vue/components/user/show-user.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var ENUMS = __webpack_require__(/*! JS-HELPERS/enums */ "./resources/js/helpers/enums.js");

module.exports = {
  name: "ShowUser",
  data: function data() {
    return {
      ENUMS: ENUMS,
      userData: {
        _id: null,
        name: null,
        email: null,
        firstName: null,
        lastName: null,
        nationCode: null,
        cellphone: null,
        roles: {},
        isActive: false
      },
      showLoadingFlag: false
    };
  },
  computed: {
    isLoadingMode: function isLoadingMode(state) {
      return state.showLoadingFlag == true;
    },
    showNotification: function showNotification(state) {
      return state.notificationMessage != null;
    }
  },
  methods: {
    /**
     * Load specific user
     */
    loadUserData: function loadUserData(data) {
      var temp = {
        _id: data._id,
        name: data.name,
        password: data.password,
        email: data.email,
        firstName: data.profile.first_name,
        lastName: data.profile.last_name,
        nationCode: data.profile.nation_code,
        cellphone: data.cellphone,
        roles: data.roles,
        isActive: data.is_active
      };
      console.log(temp);
      Vue.set(this, "userData", temp);
    },

    /**
     * Show Loading
     */
    showLoading: function showLoading() {
      Vue.set(this, "showLoadingFlag", true);
    },

    /**
     * HideLoading
     */
    hideLoading: function hideLoading() {
      Vue.set(this, "showLoadingFlag", false);
    }
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/user/users.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/vue/components/user/users.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var Routes = __webpack_require__(/*! JS-CORE/routes */ "./resources/js/core/routes.js");

var ENUMS = __webpack_require__(/*! JS-HELPERS/enums */ "./resources/js/helpers/enums.js");

var Loading = __webpack_require__(/*! VUE-COMPONENTS/general/loading.vue */ "./resources/js/vue/components/general/loading.vue")["default"];

var RegisterUser = __webpack_require__(/*! VUE-COMPONENTS/user/register-user.vue */ "./resources/js/vue/components/user/register-user.vue")["default"];

var ListUser = __webpack_require__(/*! VUE-COMPONENTS/user/list-user.vue */ "./resources/js/vue/components/user/list-user.vue")["default"];

var EditUser = __webpack_require__(/*! VUE-COMPONENTS/user/edit-user.vue */ "./resources/js/vue/components/user/edit-user.vue")["default"];

var ShowUser = __webpack_require__(/*! VUE-COMPONENTS/user/show-user.vue */ "./resources/js/vue/components/user/show-user.vue")["default"];

var Notification = __webpack_require__(/*! VUE-COMPONENTS/general/notification.vue */ "./resources/js/vue/components/general/notification.vue")["default"];

module.exports = {
  name: "Users",
  components: {
    Loading: Loading,
    ListUser: ListUser,
    RegisterUser: RegisterUser,
    EditUser: EditUser,
    ShowUser: ShowUser,
    Notification: Notification
  },
  data: function data() {
    return {
      ENUMS: ENUMS,
      formModeStack: [],
      users: [],
      notificationMessage: null,
      notificationType: "is-info"
    };
  },
  props: {
    title: {
      type: String,
      "default": null
    },
    listUrl: {
      type: String,
      "default": null
    },
    rolesUrl: {
      type: String,
      "default": null
    },
    registerUrl: {
      type: String,
      "default": null
    },
    editUrl: {
      type: String,
      "default": null
    },
    departmentsUrl: {
      type: String,
      "default": null
    }
  },
  computed: {
    formMode: function formMode(state) {
      return state.formModeStack[state.formModeStack.length - 1];
    },
    modeLoading: function modeLoading(state) {
      return state.formMode == ENUMS.FORM_MODE.LOADING;
    },
    modeList: function modeList(state) {
      return state.formMode == ENUMS.FORM_MODE.LIST;
    },
    modeRegister: function modeRegister(state) {
      return state.formMode == ENUMS.FORM_MODE.REGISTER;
    },
    modeEdit: function modeEdit(state) {
      return state.formMode == ENUMS.FORM_MODE.EDIT;
    },
    modeShow: function modeShow(state) {
      return state.formMode == ENUMS.FORM_MODE.SHOW;
    },
    showNotification: function showNotification(state) {
      return state.notificationMessage != null;
    }
  },
  created: function created() {
    this.init();
  },
  mounted: function mounted() {
    this.changeFormMode(ENUMS.FORM_MODE.LIST);
    this.$refs.userList.loadUsers(1);
  },
  methods: {
    /**
     * On Register user
     */
    onUserRegister: function onUserRegister(payload) {
      this.$refs.userList.addToUserList(payload.data.data);
      this.changeFormMode(ENUMS.FORM_MODE.LIST);
      this.setNotification(".کاربر با موفقیت ذخیره شد", "is-success");
    },

    /**
     * On Update user
     */
    onUserUpdate: function onUserUpdate(payload) {
      this.changeFormMode(ENUMS.FORM_MODE.LIST);
      this.$refs.userList.editInUserList(payload.data);
      this.setNotification(".کاربر با موفقیت ویرایش شد", "is-success");
    },

    /**
     * On commands clicked
     */
    onCommand: function onCommand(payload) {
      var arg = payload.arg || null;
      var data = payload.data || {};
      arg = arg || payload;

      switch (arg) {
        case ENUMS.COMMAND.NEW:
          this.changeFormMode(ENUMS.FORM_MODE.REGISTER);
          break;

        case ENUMS.COMMAND.REGISTER:
          /* TODO: REGISTER NEW USER */
          console.log("REGISTER NEW USER", arg);
          break;

        case ENUMS.COMMAND.EDIT:
          /* TODO: REGISTER NEW USER */
          this.$refs.userEdit.loadUserData(data);
          this.changeFormMode(ENUMS.FORM_MODE.EDIT);
          break;

        case ENUMS.COMMAND.CANCEL:
          this.changeFormMode(null, {
            pop: true
          });
          break;

        case ENUMS.COMMAND.SHOW:
          this.$refs.userShow.loadUserData(data);
          this.changeFormMode(ENUMS.FORM_MODE.SHOW);
          break;
      }
    },

    /**
     * On Command
     *
     * @param      {Object}  arg     The argument
     */
    commandClick: function commandClick(arg) {
      this.onCommand(arg);
    },

    /**
     * Init method
     */
    init: function init() {
      this.changeFormMode(ENUMS.FORM_MODE.LOADING);
    },

    /**
     * Change form mode
     */
    changeFormMode: function changeFormMode(mode, options) {
      var opts = Object.assign({
        pop: false
      }, options);

      if (opts.pop) {
        if (this.formModeStack.length > 0) {
          Vue["delete"](this.formModeStack, this.formModeStack.length - 1);
        }
      } else {
        Vue.set(this.formModeStack, this.formModeStack.length, mode);
      }
    },

    /**
     * Set notification
     */
    setNotification: function setNotification(message) {
      var notificationType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "is-info";
      Vue.set(this, "notificationType", notificationType);
      Vue.set(this, "notificationMessage", message);
    },

    /**
     * Close Notification
     */
    closeNotification: function closeNotification() {
      this.setNotification(null);
    }
  }
};

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getTimezoneOffsetInMilliseconds; });
var MILLISECONDS_IN_MINUTE = 60000;
/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */

function getTimezoneOffsetInMilliseconds(dirtyDate) {
  var date = new Date(dirtyDate.getTime());
  var baseTimezoneOffset = date.getTimezoneOffset();
  date.setSeconds(0, 0);
  var millisecondsPartOfTimezoneOffset = date.getTime() % MILLISECONDS_IN_MINUTE;
  return baseTimezoneOffset * MILLISECONDS_IN_MINUTE + millisecondsPartOfTimezoneOffset;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/toInteger/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/toInteger/index.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return toInteger; });
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }

  var number = Number(dirtyNumber);

  if (isNaN(number)) {
    return number;
  }

  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isValid/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/esm/isValid/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isValid; });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");

/**
 * @name isValid
 * @category Common Helpers
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise.
 * Argument is converted to Date using `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * Invalid Date is a Date, whose time value is NaN.
 *
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - Now `isValid` doesn't throw an exception
 *   if the first argument is not an instance of Date.
 *   Instead, argument is converted beforehand using `toDate`.
 *
 *   Examples:
 *
 *   | `isValid` argument        | Before v2.0.0 | v2.0.0 onward |
 *   |---------------------------|---------------|---------------|
 *   | `new Date()`              | `true`        | `true`        |
 *   | `new Date('2016-01-01')`  | `true`        | `true`        |
 *   | `new Date('')`            | `false`       | `false`       |
 *   | `new Date(1488370835081)` | `true`        | `true`        |
 *   | `new Date(NaN)`           | `false`       | `false`       |
 *   | `'2016-01-01'`            | `TypeError`   | `true`        |
 *   | `''`                      | `TypeError`   | `false`       |
 *   | `1488370835081`           | `TypeError`   | `true`        |
 *   | `NaN`                     | `TypeError`   | `false`       |
 *
 *   We introduce this change to make *date-fns* consistent with ECMAScript behavior
 *   that try to coerce arguments to the expected type
 *   (which is also the case with other *date-fns* functions).
 *
 * @param {*} date - the date to check
 * @returns {Boolean} the date is valid
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // For the valid date:
 * var result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the value, convertable into a date:
 * var result = isValid(1393804800000)
 * //=> true
 *
 * @example
 * // For the invalid date:
 * var result = isValid(new Date(''))
 * //=> false
 */

function isValid(dirtyDate) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDate);
  return !isNaN(date);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/parseISO/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/esm/parseISO/index.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parseISO; });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/getTimezoneOffsetInMilliseconds/index.js */ "./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js");


var MILLISECONDS_IN_HOUR = 3600000;
var MILLISECONDS_IN_MINUTE = 60000;
var DEFAULT_ADDITIONAL_DIGITS = 2;
var patterns = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
};
var dateRegex = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
var timeRegex = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
var timezoneRegex = /^([+-])(\d{2})(?::?(\d{2}))?$/;
/**
 * @name parseISO
 * @category Common Helpers
 * @summary Parse ISO string
 *
 * @description
 * Parse the given string in ISO 8601 format and return an instance of Date.
 *
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If the argument isn't a string, the function cannot parse the string or
 * the values are invalid, it returns Invalid Date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The previous `parse` implementation was renamed to `parseISO`.
 *
 *   ```javascript
 *   // Before v2.0.0
 *   parse('2016-01-01')
 *
 *   // v2.0.0 onward
 *   parseISO('2016-01-01')
 *   ```
 *
 * - `parseISO` now validates separate date and time values in ISO-8601 strings
 *   and returns `Invalid Date` if the date is invalid.
 *
 *   ```javascript
 *   parseISO('2018-13-32')
 *   //=> Invalid Date
 *   ```
 *
 * - `parseISO` now doesn't fall back to `new Date` constructor
 *   if it fails to parse a string argument. Instead, it returns `Invalid Date`.
 *
 * @param {String} argument - the value to convert
 * @param {Object} [options] - an object with options.
 * @param {0|1|2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * var result = parseISO('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert string '+02014101' to date,
 * // if the additional number of digits in the extended year format is 1:
 * var result = parseISO('+02014101', { additionalDigits: 1 })
 * //=> Fri Apr 11 2014 00:00:00
 */

function parseISO(argument, dirtyOptions) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
  }

  var options = dirtyOptions || {};
  var additionalDigits = options.additionalDigits == null ? DEFAULT_ADDITIONAL_DIGITS : Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(options.additionalDigits);

  if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
    throw new RangeError('additionalDigits must be 0, 1 or 2');
  }

  if (!(typeof argument === 'string' || Object.prototype.toString.call(argument) === '[object String]')) {
    return new Date(NaN);
  }

  var dateStrings = splitDateString(argument);
  var date;

  if (dateStrings.date) {
    var parseYearResult = parseYear(dateStrings.date, additionalDigits);
    date = parseDate(parseYearResult.restDateString, parseYearResult.year);
  }

  if (isNaN(date) || !date) {
    return new Date(NaN);
  }

  var timestamp = date.getTime();
  var time = 0;
  var offset;

  if (dateStrings.time) {
    time = parseTime(dateStrings.time);

    if (isNaN(time) || time === null) {
      return new Date(NaN);
    }
  }

  if (dateStrings.timezone) {
    offset = parseTimezone(dateStrings.timezone);

    if (isNaN(offset)) {
      return new Date(NaN);
    }
  } else {
    var fullTime = timestamp + time;
    var fullTimeDate = new Date(fullTime);
    offset = Object(_lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(fullTimeDate); // Adjust time when it's coming from DST

    var fullTimeDateNextDay = new Date(fullTime);
    fullTimeDateNextDay.setDate(fullTimeDate.getDate() + 1);
    var offsetDiff = Object(_lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(fullTimeDateNextDay) - offset;

    if (offsetDiff > 0) {
      offset += offsetDiff;
    }
  }

  return new Date(timestamp + time + offset);
}

function splitDateString(dateString) {
  var dateStrings = {};
  var array = dateString.split(patterns.dateTimeDelimiter);
  var timeString;

  if (/:/.test(array[0])) {
    dateStrings.date = null;
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];

    if (patterns.timeZoneDelimiter.test(dateStrings.date)) {
      dateStrings.date = dateString.split(patterns.timeZoneDelimiter)[0];
      timeString = dateString.substr(dateStrings.date.length, dateString.length);
    }
  }

  if (timeString) {
    var token = patterns.timezone.exec(timeString);

    if (token) {
      dateStrings.time = timeString.replace(token[1], '');
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }

  return dateStrings;
}

function parseYear(dateString, additionalDigits) {
  var regex = new RegExp('^(?:(\\d{4}|[+-]\\d{' + (4 + additionalDigits) + '})|(\\d{2}|[+-]\\d{' + (2 + additionalDigits) + '})$)');
  var captures = dateString.match(regex); // Invalid ISO-formatted year

  if (!captures) return {
    year: null
  };
  var year = captures[1] && parseInt(captures[1]);
  var century = captures[2] && parseInt(captures[2]);
  return {
    year: century == null ? year : century * 100,
    restDateString: dateString.slice((captures[1] || captures[2]).length)
  };
}

function parseDate(dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) return null;
  var captures = dateString.match(dateRegex); // Invalid ISO-formatted string

  if (!captures) return null;
  var isWeekDate = !!captures[4];
  var dayOfYear = parseDateUnit(captures[1]);
  var month = parseDateUnit(captures[2]) - 1;
  var day = parseDateUnit(captures[3]);
  var week = parseDateUnit(captures[4]);
  var dayOfWeek = parseDateUnit(captures[5]) - 1;

  if (isWeekDate) {
    if (!validateWeekDate(year, week, dayOfWeek)) {
      return new Date(NaN);
    }

    return dayOfISOWeekYear(year, week, dayOfWeek);
  } else {
    var date = new Date(0);

    if (!validateDate(year, month, day) || !validateDayOfYearDate(year, dayOfYear)) {
      return new Date(NaN);
    }

    date.setUTCFullYear(year, month, Math.max(dayOfYear, day));
    return date;
  }
}

function parseDateUnit(value) {
  return value ? parseInt(value) : 1;
}

function parseTime(timeString) {
  var captures = timeString.match(timeRegex);
  if (!captures) return null; // Invalid ISO-formatted time

  var hours = parseTimeUnit(captures[1]);
  var minutes = parseTimeUnit(captures[2]);
  var seconds = parseTimeUnit(captures[3]);

  if (!validateTime(hours, minutes, seconds)) {
    return NaN;
  }

  return hours * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE + seconds * 1000;
}

function parseTimeUnit(value) {
  return value && parseFloat(value.replace(',', '.')) || 0;
}

function parseTimezone(timezoneString) {
  if (timezoneString === 'Z') return 0;
  var captures = timezoneString.match(timezoneRegex);
  if (!captures) return 0;
  var sign = captures[1] === '+' ? -1 : 1;
  var hours = parseInt(captures[2]);
  var minutes = captures[3] && parseInt(captures[3]) || 0;

  if (!validateTimezone(hours, minutes)) {
    return NaN;
  }

  return sign * (hours * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE);
}

function dayOfISOWeekYear(isoWeekYear, week, day) {
  var date = new Date(0);
  date.setUTCFullYear(isoWeekYear, 0, 4);
  var fourthOfJanuaryDay = date.getUTCDay() || 7;
  var diff = (week - 1) * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
} // Validation functions
// February is null to handle the leap year (using ||)


var daysInMonths = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYearIndex(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100;
}

function validateDate(year, month, date) {
  return month >= 0 && month <= 11 && date >= 1 && date <= (daysInMonths[month] || (isLeapYearIndex(year) ? 29 : 28));
}

function validateDayOfYearDate(year, dayOfYear) {
  return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex(year) ? 366 : 365);
}

function validateWeekDate(_year, week, day) {
  return week >= 1 && week <= 53 && day >= 0 && day <= 6;
}

function validateTime(hours, minutes, seconds) {
  if (hours === 24) {
    return minutes === 0 && seconds === 0;
  }

  return seconds >= 0 && seconds < 60 && minutes >= 0 && minutes < 60 && hours >= 0 && hours < 25;
}

function validateTimezone(_hours, minutes) {
  return minutes >= 0 && minutes <= 59;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/toDate/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/toDate/index.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return toDate; });
/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
  }

  var argStr = Object.prototype.toString.call(argument); // Clone the date

  if (argument instanceof Date || typeof argument === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"); // eslint-disable-next-line no-console

      console.warn(new Error().stack);
    }

    return new Date(NaN);
  }
}

/***/ }),

/***/ "./node_modules/form-data/lib/browser.js":
/*!***********************************************!*\
  !*** ./node_modules/form-data/lib/browser.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* eslint-env browser */
module.exports = typeof self == 'object' ? self.FormData : window.FormData;


/***/ }),

/***/ "./node_modules/lodash/lodash.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/lodash.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, module) {var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
;(function() {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /** Used as the semantic version number. */
  var VERSION = '4.17.15';

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /** Error message constants. */
  var CORE_ERROR_TEXT = 'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.',
      FUNC_ERROR_TEXT = 'Expected a function';

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /** Used as the maximum memoize cache size. */
  var MAX_MEMOIZE_SIZE = 500;

  /** Used as the internal argument placeholder. */
  var PLACEHOLDER = '__lodash_placeholder__';

  /** Used to compose bitmasks for cloning. */
  var CLONE_DEEP_FLAG = 1,
      CLONE_FLAT_FLAG = 2,
      CLONE_SYMBOLS_FLAG = 4;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG = 1,
      COMPARE_UNORDERED_FLAG = 2;

  /** Used to compose bitmasks for function metadata. */
  var WRAP_BIND_FLAG = 1,
      WRAP_BIND_KEY_FLAG = 2,
      WRAP_CURRY_BOUND_FLAG = 4,
      WRAP_CURRY_FLAG = 8,
      WRAP_CURRY_RIGHT_FLAG = 16,
      WRAP_PARTIAL_FLAG = 32,
      WRAP_PARTIAL_RIGHT_FLAG = 64,
      WRAP_ARY_FLAG = 128,
      WRAP_REARG_FLAG = 256,
      WRAP_FLIP_FLAG = 512;

  /** Used as default options for `_.truncate`. */
  var DEFAULT_TRUNC_LENGTH = 30,
      DEFAULT_TRUNC_OMISSION = '...';

  /** Used to detect hot functions by number of calls within a span of milliseconds. */
  var HOT_COUNT = 800,
      HOT_SPAN = 16;

  /** Used to indicate the type of lazy iteratees. */
  var LAZY_FILTER_FLAG = 1,
      LAZY_MAP_FLAG = 2,
      LAZY_WHILE_FLAG = 3;

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0,
      MAX_SAFE_INTEGER = 9007199254740991,
      MAX_INTEGER = 1.7976931348623157e+308,
      NAN = 0 / 0;

  /** Used as references for the maximum length and index of an array. */
  var MAX_ARRAY_LENGTH = 4294967295,
      MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
      HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

  /** Used to associate wrap methods with their bit flags. */
  var wrapFlags = [
    ['ary', WRAP_ARY_FLAG],
    ['bind', WRAP_BIND_FLAG],
    ['bindKey', WRAP_BIND_KEY_FLAG],
    ['curry', WRAP_CURRY_FLAG],
    ['curryRight', WRAP_CURRY_RIGHT_FLAG],
    ['flip', WRAP_FLIP_FLAG],
    ['partial', WRAP_PARTIAL_FLAG],
    ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],
    ['rearg', WRAP_REARG_FLAG]
  ];

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      asyncTag = '[object AsyncFunction]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      domExcTag = '[object DOMException]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      nullTag = '[object Null]',
      objectTag = '[object Object]',
      promiseTag = '[object Promise]',
      proxyTag = '[object Proxy]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      symbolTag = '[object Symbol]',
      undefinedTag = '[object Undefined]',
      weakMapTag = '[object WeakMap]',
      weakSetTag = '[object WeakSet]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to match empty string literals in compiled template source. */
  var reEmptyStringLeading = /\b__p \+= '';/g,
      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

  /** Used to match HTML entities and HTML characters. */
  var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
      reUnescapedHtml = /[&<>"']/g,
      reHasEscapedHtml = RegExp(reEscapedHtml.source),
      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

  /** Used to match template delimiters. */
  var reEscape = /<%-([\s\S]+?)%>/g,
      reEvaluate = /<%([\s\S]+?)%>/g,
      reInterpolate = /<%=([\s\S]+?)%>/g;

  /** Used to match property names within property paths. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/,
      rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
      reHasRegExpChar = RegExp(reRegExpChar.source);

  /** Used to match leading and trailing whitespace. */
  var reTrim = /^\s+|\s+$/g,
      reTrimStart = /^\s+/,
      reTrimEnd = /\s+$/;

  /** Used to match wrap detail comments. */
  var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
      reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
      reSplitDetails = /,? & /;

  /** Used to match words composed of alphanumeric characters. */
  var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

  /** Used to match backslashes in property paths. */
  var reEscapeChar = /\\(\\)?/g;

  /**
   * Used to match
   * [ES template delimiters](http://ecma-international.org/ecma-262/7.0/#sec-template-literal-lexical-components).
   */
  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

  /** Used to match `RegExp` flags from their coerced string values. */
  var reFlags = /\w*$/;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /** Used to match Latin Unicode letters (excluding mathematical operators). */
  var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

  /** Used to ensure capturing order of template delimiters. */
  var reNoMatch = /($^)/;

  /** Used to match unescaped characters in compiled string literals. */
  var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

  /** Used to compose unicode character classes. */
  var rsAstralRange = '\\ud800-\\udfff',
      rsComboMarksRange = '\\u0300-\\u036f',
      reComboHalfMarksRange = '\\ufe20-\\ufe2f',
      rsComboSymbolsRange = '\\u20d0-\\u20ff',
      rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
      rsDingbatRange = '\\u2700-\\u27bf',
      rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
      rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
      rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
      rsPunctuationRange = '\\u2000-\\u206f',
      rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
      rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
      rsVarRange = '\\ufe0e\\ufe0f',
      rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

  /** Used to compose unicode capture groups. */
  var rsApos = "['\u2019]",
      rsAstral = '[' + rsAstralRange + ']',
      rsBreak = '[' + rsBreakRange + ']',
      rsCombo = '[' + rsComboRange + ']',
      rsDigits = '\\d+',
      rsDingbat = '[' + rsDingbatRange + ']',
      rsLower = '[' + rsLowerRange + ']',
      rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
      rsFitz = '\\ud83c[\\udffb-\\udfff]',
      rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
      rsNonAstral = '[^' + rsAstralRange + ']',
      rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
      rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
      rsUpper = '[' + rsUpperRange + ']',
      rsZWJ = '\\u200d';

  /** Used to compose unicode regexes. */
  var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
      rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
      rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
      rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
      reOptMod = rsModifier + '?',
      rsOptVar = '[' + rsVarRange + ']?',
      rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
      rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
      rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
      rsSeq = rsOptVar + reOptMod + rsOptJoin,
      rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq,
      rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

  /** Used to match apostrophes. */
  var reApos = RegExp(rsApos, 'g');

  /**
   * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
   * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
   */
  var reComboMark = RegExp(rsCombo, 'g');

  /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
  var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

  /** Used to match complex or compound words. */
  var reUnicodeWord = RegExp([
    rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
    rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
    rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
    rsUpper + '+' + rsOptContrUpper,
    rsOrdUpper,
    rsOrdLower,
    rsDigits,
    rsEmoji
  ].join('|'), 'g');

  /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
  var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

  /** Used to detect strings that need a more robust regexp to match words. */
  var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

  /** Used to assign default `context` object properties. */
  var contextProps = [
    'Array', 'Buffer', 'DataView', 'Date', 'Error', 'Float32Array', 'Float64Array',
    'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Map', 'Math', 'Object',
    'Promise', 'RegExp', 'Set', 'String', 'Symbol', 'TypeError', 'Uint8Array',
    'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap',
    '_', 'clearTimeout', 'isFinite', 'parseInt', 'setTimeout'
  ];

  /** Used to make template sourceURLs easier to identify. */
  var templateCounter = -1;

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
  typedArrayTags[errorTag] = typedArrayTags[funcTag] =
  typedArrayTags[mapTag] = typedArrayTags[numberTag] =
  typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
  typedArrayTags[setTag] = typedArrayTags[stringTag] =
  typedArrayTags[weakMapTag] = false;

  /** Used to identify `toStringTag` values supported by `_.clone`. */
  var cloneableTags = {};
  cloneableTags[argsTag] = cloneableTags[arrayTag] =
  cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
  cloneableTags[boolTag] = cloneableTags[dateTag] =
  cloneableTags[float32Tag] = cloneableTags[float64Tag] =
  cloneableTags[int8Tag] = cloneableTags[int16Tag] =
  cloneableTags[int32Tag] = cloneableTags[mapTag] =
  cloneableTags[numberTag] = cloneableTags[objectTag] =
  cloneableTags[regexpTag] = cloneableTags[setTag] =
  cloneableTags[stringTag] = cloneableTags[symbolTag] =
  cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
  cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag] = cloneableTags[funcTag] =
  cloneableTags[weakMapTag] = false;

  /** Used to map Latin Unicode letters to basic Latin letters. */
  var deburredLetters = {
    // Latin-1 Supplement block.
    '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
    '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
    '\xc7': 'C',  '\xe7': 'c',
    '\xd0': 'D',  '\xf0': 'd',
    '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
    '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
    '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
    '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
    '\xd1': 'N',  '\xf1': 'n',
    '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
    '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
    '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
    '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
    '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
    '\xc6': 'Ae', '\xe6': 'ae',
    '\xde': 'Th', '\xfe': 'th',
    '\xdf': 'ss',
    // Latin Extended-A block.
    '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
    '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
    '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
    '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
    '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
    '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
    '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
    '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
    '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
    '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
    '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
    '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
    '\u0134': 'J',  '\u0135': 'j',
    '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
    '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
    '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
    '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
    '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
    '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
    '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
    '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
    '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
    '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
    '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
    '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
    '\u0163': 't',  '\u0165': 't', '\u0167': 't',
    '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
    '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
    '\u0174': 'W',  '\u0175': 'w',
    '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
    '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
    '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
    '\u0132': 'IJ', '\u0133': 'ij',
    '\u0152': 'Oe', '\u0153': 'oe',
    '\u0149': "'n", '\u017f': 's'
  };

  /** Used to map characters to HTML entities. */
  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  /** Used to map HTML entities to characters. */
  var htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
  };

  /** Used to escape characters for inclusion in compiled string literals. */
  var stringEscapes = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  /** Built-in method references without a dependency on `root`. */
  var freeParseFloat = parseFloat,
      freeParseInt = parseInt;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || Function('return this')();

  /** Detect free variable `exports`. */
  var freeExports =  true && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      // Use `util.types` for Node.js 10+.
      var types = freeModule && freeModule.require && freeModule.require('util').types;

      if (types) {
        return types;
      }

      // Legacy `process.binding('util')` for Node.js < 10.
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }());

  /* Node.js helper references. */
  var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer,
      nodeIsDate = nodeUtil && nodeUtil.isDate,
      nodeIsMap = nodeUtil && nodeUtil.isMap,
      nodeIsRegExp = nodeUtil && nodeUtil.isRegExp,
      nodeIsSet = nodeUtil && nodeUtil.isSet,
      nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

  /*--------------------------------------------------------------------------*/

  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0: return func.call(thisArg);
      case 1: return func.call(thisArg, args[0]);
      case 2: return func.call(thisArg, args[0], args[1]);
      case 3: return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }

  /**
   * A specialized version of `baseAggregator` for arrays.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} setter The function to set `accumulator` values.
   * @param {Function} iteratee The iteratee to transform keys.
   * @param {Object} accumulator The initial aggregated object.
   * @returns {Function} Returns `accumulator`.
   */
  function arrayAggregator(array, setter, iteratee, accumulator) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      var value = array[index];
      setter(accumulator, value, iteratee(value), array);
    }
    return accumulator;
  }

  /**
   * A specialized version of `_.forEach` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEach(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }

  /**
   * A specialized version of `_.forEachRight` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEachRight(array, iteratee) {
    var length = array == null ? 0 : array.length;

    while (length--) {
      if (iteratee(array[length], length, array) === false) {
        break;
      }
    }
    return array;
  }

  /**
   * A specialized version of `_.every` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if all elements pass the predicate check,
   *  else `false`.
   */
  function arrayEvery(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (!predicate(array[index], index, array)) {
        return false;
      }
    }
    return true;
  }

  /**
   * A specialized version of `_.filter` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  function arrayFilter(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }

  /**
   * A specialized version of `_.includes` for arrays without support for
   * specifying an index to search from.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */
  function arrayIncludes(array, value) {
    var length = array == null ? 0 : array.length;
    return !!length && baseIndexOf(array, value, 0) > -1;
  }

  /**
   * This function is like `arrayIncludes` except that it accepts a comparator.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @param {Function} comparator The comparator invoked per element.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */
  function arrayIncludesWith(array, value, comparator) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (comparator(value, array[index])) {
        return true;
      }
    }
    return false;
  }

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */
  function arrayPush(array, values) {
    var index = -1,
        length = values.length,
        offset = array.length;

    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }

  /**
   * A specialized version of `_.reduce` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {boolean} [initAccum] Specify using the first element of `array` as
   *  the initial value.
   * @returns {*} Returns the accumulated value.
   */
  function arrayReduce(array, iteratee, accumulator, initAccum) {
    var index = -1,
        length = array == null ? 0 : array.length;

    if (initAccum && length) {
      accumulator = array[++index];
    }
    while (++index < length) {
      accumulator = iteratee(accumulator, array[index], index, array);
    }
    return accumulator;
  }

  /**
   * A specialized version of `_.reduceRight` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {boolean} [initAccum] Specify using the last element of `array` as
   *  the initial value.
   * @returns {*} Returns the accumulated value.
   */
  function arrayReduceRight(array, iteratee, accumulator, initAccum) {
    var length = array == null ? 0 : array.length;
    if (initAccum && length) {
      accumulator = array[--length];
    }
    while (length--) {
      accumulator = iteratee(accumulator, array[length], length, array);
    }
    return accumulator;
  }

  /**
   * A specialized version of `_.some` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */
  function arraySome(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Gets the size of an ASCII `string`.
   *
   * @private
   * @param {string} string The string inspect.
   * @returns {number} Returns the string size.
   */
  var asciiSize = baseProperty('length');

  /**
   * Converts an ASCII `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function asciiToArray(string) {
    return string.split('');
  }

  /**
   * Splits an ASCII `string` into an array of its words.
   *
   * @private
   * @param {string} The string to inspect.
   * @returns {Array} Returns the words of `string`.
   */
  function asciiWords(string) {
    return string.match(reAsciiWord) || [];
  }

  /**
   * The base implementation of methods like `_.findKey` and `_.findLastKey`,
   * without support for iteratee shorthands, which iterates over `collection`
   * using `eachFunc`.
   *
   * @private
   * @param {Array|Object} collection The collection to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {Function} eachFunc The function to iterate over `collection`.
   * @returns {*} Returns the found element or its key, else `undefined`.
   */
  function baseFindKey(collection, predicate, eachFunc) {
    var result;
    eachFunc(collection, function(value, key, collection) {
      if (predicate(value, key, collection)) {
        result = key;
        return false;
      }
    });
    return result;
  }

  /**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 1 : -1);

    while ((fromRight ? index-- : ++index < length)) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOf(array, value, fromIndex) {
    return value === value
      ? strictIndexOf(array, value, fromIndex)
      : baseFindIndex(array, baseIsNaN, fromIndex);
  }

  /**
   * This function is like `baseIndexOf` except that it accepts a comparator.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @param {Function} comparator The comparator invoked per element.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOfWith(array, value, fromIndex, comparator) {
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (comparator(array[index], value)) {
        return index;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.isNaN` without support for number objects.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
   */
  function baseIsNaN(value) {
    return value !== value;
  }

  /**
   * The base implementation of `_.mean` and `_.meanBy` without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {number} Returns the mean.
   */
  function baseMean(array, iteratee) {
    var length = array == null ? 0 : array.length;
    return length ? (baseSum(array, iteratee) / length) : NAN;
  }

  /**
   * The base implementation of `_.property` without support for deep paths.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function baseProperty(key) {
    return function(object) {
      return object == null ? undefined : object[key];
    };
  }

  /**
   * The base implementation of `_.propertyOf` without support for deep paths.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Function} Returns the new accessor function.
   */
  function basePropertyOf(object) {
    return function(key) {
      return object == null ? undefined : object[key];
    };
  }

  /**
   * The base implementation of `_.reduce` and `_.reduceRight`, without support
   * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} accumulator The initial value.
   * @param {boolean} initAccum Specify using the first or last element of
   *  `collection` as the initial value.
   * @param {Function} eachFunc The function to iterate over `collection`.
   * @returns {*} Returns the accumulated value.
   */
  function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
    eachFunc(collection, function(value, index, collection) {
      accumulator = initAccum
        ? (initAccum = false, value)
        : iteratee(accumulator, value, index, collection);
    });
    return accumulator;
  }

  /**
   * The base implementation of `_.sortBy` which uses `comparer` to define the
   * sort order of `array` and replaces criteria objects with their corresponding
   * values.
   *
   * @private
   * @param {Array} array The array to sort.
   * @param {Function} comparer The function to define sort order.
   * @returns {Array} Returns `array`.
   */
  function baseSortBy(array, comparer) {
    var length = array.length;

    array.sort(comparer);
    while (length--) {
      array[length] = array[length].value;
    }
    return array;
  }

  /**
   * The base implementation of `_.sum` and `_.sumBy` without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {number} Returns the sum.
   */
  function baseSum(array, iteratee) {
    var result,
        index = -1,
        length = array.length;

    while (++index < length) {
      var current = iteratee(array[index]);
      if (current !== undefined) {
        result = result === undefined ? current : (result + current);
      }
    }
    return result;
  }

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  /**
   * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
   * of key-value pairs for `object` corresponding to the property names of `props`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the key-value pairs.
   */
  function baseToPairs(object, props) {
    return arrayMap(props, function(key) {
      return [key, object[key]];
    });
  }

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }

  /**
   * The base implementation of `_.values` and `_.valuesIn` which creates an
   * array of `object` property values corresponding to the property names
   * of `props`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the array of property values.
   */
  function baseValues(object, props) {
    return arrayMap(props, function(key) {
      return object[key];
    });
  }

  /**
   * Checks if a `cache` value for `key` exists.
   *
   * @private
   * @param {Object} cache The cache to query.
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function cacheHas(cache, key) {
    return cache.has(key);
  }

  /**
   * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the first unmatched string symbol.
   */
  function charsStartIndex(strSymbols, chrSymbols) {
    var index = -1,
        length = strSymbols.length;

    while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
    return index;
  }

  /**
   * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the last unmatched string symbol.
   */
  function charsEndIndex(strSymbols, chrSymbols) {
    var index = strSymbols.length;

    while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
    return index;
  }

  /**
   * Gets the number of `placeholder` occurrences in `array`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} placeholder The placeholder to search for.
   * @returns {number} Returns the placeholder count.
   */
  function countHolders(array, placeholder) {
    var length = array.length,
        result = 0;

    while (length--) {
      if (array[length] === placeholder) {
        ++result;
      }
    }
    return result;
  }

  /**
   * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
   * letters to basic Latin letters.
   *
   * @private
   * @param {string} letter The matched letter to deburr.
   * @returns {string} Returns the deburred letter.
   */
  var deburrLetter = basePropertyOf(deburredLetters);

  /**
   * Used by `_.escape` to convert characters to HTML entities.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  var escapeHtmlChar = basePropertyOf(htmlEscapes);

  /**
   * Used by `_.template` to escape characters for inclusion in compiled string literals.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  function escapeStringChar(chr) {
    return '\\' + stringEscapes[chr];
  }

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  /**
   * Checks if `string` contains Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a symbol is found, else `false`.
   */
  function hasUnicode(string) {
    return reHasUnicode.test(string);
  }

  /**
   * Checks if `string` contains a word composed of Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a word is found, else `false`.
   */
  function hasUnicodeWord(string) {
    return reHasUnicodeWord.test(string);
  }

  /**
   * Converts `iterator` to an array.
   *
   * @private
   * @param {Object} iterator The iterator to convert.
   * @returns {Array} Returns the converted array.
   */
  function iteratorToArray(iterator) {
    var data,
        result = [];

    while (!(data = iterator.next()).done) {
      result.push(data.value);
    }
    return result;
  }

  /**
   * Converts `map` to its key-value pairs.
   *
   * @private
   * @param {Object} map The map to convert.
   * @returns {Array} Returns the key-value pairs.
   */
  function mapToArray(map) {
    var index = -1,
        result = Array(map.size);

    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  /**
   * Replaces all `placeholder` elements in `array` with an internal placeholder
   * and returns an array of their indexes.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {*} placeholder The placeholder to replace.
   * @returns {Array} Returns the new array of placeholder indexes.
   */
  function replaceHolders(array, placeholder) {
    var index = -1,
        length = array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (value === placeholder || value === PLACEHOLDER) {
        array[index] = PLACEHOLDER;
        result[resIndex++] = index;
      }
    }
    return result;
  }

  /**
   * Converts `set` to an array of its values.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the values.
   */
  function setToArray(set) {
    var index = -1,
        result = Array(set.size);

    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }

  /**
   * Converts `set` to its value-value pairs.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the value-value pairs.
   */
  function setToPairs(set) {
    var index = -1,
        result = Array(set.size);

    set.forEach(function(value) {
      result[++index] = [value, value];
    });
    return result;
  }

  /**
   * A specialized version of `_.indexOf` which performs strict equality
   * comparisons of values, i.e. `===`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function strictIndexOf(array, value, fromIndex) {
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * A specialized version of `_.lastIndexOf` which performs strict equality
   * comparisons of values, i.e. `===`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function strictLastIndexOf(array, value, fromIndex) {
    var index = fromIndex + 1;
    while (index--) {
      if (array[index] === value) {
        return index;
      }
    }
    return index;
  }

  /**
   * Gets the number of symbols in `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the string size.
   */
  function stringSize(string) {
    return hasUnicode(string)
      ? unicodeSize(string)
      : asciiSize(string);
  }

  /**
   * Converts `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function stringToArray(string) {
    return hasUnicode(string)
      ? unicodeToArray(string)
      : asciiToArray(string);
  }

  /**
   * Used by `_.unescape` to convert HTML entities to characters.
   *
   * @private
   * @param {string} chr The matched character to unescape.
   * @returns {string} Returns the unescaped character.
   */
  var unescapeHtmlChar = basePropertyOf(htmlUnescapes);

  /**
   * Gets the size of a Unicode `string`.
   *
   * @private
   * @param {string} string The string inspect.
   * @returns {number} Returns the string size.
   */
  function unicodeSize(string) {
    var result = reUnicode.lastIndex = 0;
    while (reUnicode.test(string)) {
      ++result;
    }
    return result;
  }

  /**
   * Converts a Unicode `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function unicodeToArray(string) {
    return string.match(reUnicode) || [];
  }

  /**
   * Splits a Unicode `string` into an array of its words.
   *
   * @private
   * @param {string} The string to inspect.
   * @returns {Array} Returns the words of `string`.
   */
  function unicodeWords(string) {
    return string.match(reUnicodeWord) || [];
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Create a new pristine `lodash` function using the `context` object.
   *
   * @static
   * @memberOf _
   * @since 1.1.0
   * @category Util
   * @param {Object} [context=root] The context object.
   * @returns {Function} Returns a new `lodash` function.
   * @example
   *
   * _.mixin({ 'foo': _.constant('foo') });
   *
   * var lodash = _.runInContext();
   * lodash.mixin({ 'bar': lodash.constant('bar') });
   *
   * _.isFunction(_.foo);
   * // => true
   * _.isFunction(_.bar);
   * // => false
   *
   * lodash.isFunction(lodash.foo);
   * // => false
   * lodash.isFunction(lodash.bar);
   * // => true
   *
   * // Create a suped-up `defer` in Node.js.
   * var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
   */
  var runInContext = (function runInContext(context) {
    context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));

    /** Built-in constructor references. */
    var Array = context.Array,
        Date = context.Date,
        Error = context.Error,
        Function = context.Function,
        Math = context.Math,
        Object = context.Object,
        RegExp = context.RegExp,
        String = context.String,
        TypeError = context.TypeError;

    /** Used for built-in method references. */
    var arrayProto = Array.prototype,
        funcProto = Function.prototype,
        objectProto = Object.prototype;

    /** Used to detect overreaching core-js shims. */
    var coreJsData = context['__core-js_shared__'];

    /** Used to resolve the decompiled source of functions. */
    var funcToString = funcProto.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /** Used to generate unique IDs. */
    var idCounter = 0;

    /** Used to detect methods masquerading as native. */
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
      return uid ? ('Symbol(src)_1.' + uid) : '';
    }());

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString = objectProto.toString;

    /** Used to infer the `Object` constructor. */
    var objectCtorString = funcToString.call(Object);

    /** Used to restore the original `_` reference in `_.noConflict`. */
    var oldDash = root._;

    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
      funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    /** Built-in value references. */
    var Buffer = moduleExports ? context.Buffer : undefined,
        Symbol = context.Symbol,
        Uint8Array = context.Uint8Array,
        allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined,
        getPrototype = overArg(Object.getPrototypeOf, Object),
        objectCreate = Object.create,
        propertyIsEnumerable = objectProto.propertyIsEnumerable,
        splice = arrayProto.splice,
        spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined,
        symIterator = Symbol ? Symbol.iterator : undefined,
        symToStringTag = Symbol ? Symbol.toStringTag : undefined;

    var defineProperty = (function() {
      try {
        var func = getNative(Object, 'defineProperty');
        func({}, '', {});
        return func;
      } catch (e) {}
    }());

    /** Mocked built-ins. */
    var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout,
        ctxNow = Date && Date.now !== root.Date.now && Date.now,
        ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeCeil = Math.ceil,
        nativeFloor = Math.floor,
        nativeGetSymbols = Object.getOwnPropertySymbols,
        nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
        nativeIsFinite = context.isFinite,
        nativeJoin = arrayProto.join,
        nativeKeys = overArg(Object.keys, Object),
        nativeMax = Math.max,
        nativeMin = Math.min,
        nativeNow = Date.now,
        nativeParseInt = context.parseInt,
        nativeRandom = Math.random,
        nativeReverse = arrayProto.reverse;

    /* Built-in method references that are verified to be native. */
    var DataView = getNative(context, 'DataView'),
        Map = getNative(context, 'Map'),
        Promise = getNative(context, 'Promise'),
        Set = getNative(context, 'Set'),
        WeakMap = getNative(context, 'WeakMap'),
        nativeCreate = getNative(Object, 'create');

    /** Used to store function metadata. */
    var metaMap = WeakMap && new WeakMap;

    /** Used to lookup unminified function names. */
    var realNames = {};

    /** Used to detect maps, sets, and weakmaps. */
    var dataViewCtorString = toSource(DataView),
        mapCtorString = toSource(Map),
        promiseCtorString = toSource(Promise),
        setCtorString = toSource(Set),
        weakMapCtorString = toSource(WeakMap);

    /** Used to convert symbols to primitives and strings. */
    var symbolProto = Symbol ? Symbol.prototype : undefined,
        symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
        symbolToString = symbolProto ? symbolProto.toString : undefined;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` object which wraps `value` to enable implicit method
     * chain sequences. Methods that operate on and return arrays, collections,
     * and functions can be chained together. Methods that retrieve a single value
     * or may return a primitive value will automatically end the chain sequence
     * and return the unwrapped value. Otherwise, the value must be unwrapped
     * with `_#value`.
     *
     * Explicit chain sequences, which must be unwrapped with `_#value`, may be
     * enabled using `_.chain`.
     *
     * The execution of chained methods is lazy, that is, it's deferred until
     * `_#value` is implicitly or explicitly called.
     *
     * Lazy evaluation allows several methods to support shortcut fusion.
     * Shortcut fusion is an optimization to merge iteratee calls; this avoids
     * the creation of intermediate arrays and can greatly reduce the number of
     * iteratee executions. Sections of a chain sequence qualify for shortcut
     * fusion if the section is applied to an array and iteratees accept only
     * one argument. The heuristic for whether a section qualifies for shortcut
     * fusion is subject to change.
     *
     * Chaining is supported in custom builds as long as the `_#value` method is
     * directly or indirectly included in the build.
     *
     * In addition to lodash methods, wrappers have `Array` and `String` methods.
     *
     * The wrapper `Array` methods are:
     * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
     *
     * The wrapper `String` methods are:
     * `replace` and `split`
     *
     * The wrapper methods that support shortcut fusion are:
     * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
     * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
     * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
     *
     * The chainable wrapper methods are:
     * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
     * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
     * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
     * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
     * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
     * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
     * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
     * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
     * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
     * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
     * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
     * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
     * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
     * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
     * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
     * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
     * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
     * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
     * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
     * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
     * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
     * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
     * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
     * `zipObject`, `zipObjectDeep`, and `zipWith`
     *
     * The wrapper methods that are **not** chainable by default are:
     * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
     * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
     * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
     * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
     * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
     * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
     * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
     * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
     * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
     * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
     * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
     * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
     * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
     * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
     * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
     * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
     * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
     * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
     * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
     * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
     * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
     * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
     * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
     * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
     * `upperFirst`, `value`, and `words`
     *
     * @name _
     * @constructor
     * @category Seq
     * @param {*} value The value to wrap in a `lodash` instance.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var wrapped = _([1, 2, 3]);
     *
     * // Returns an unwrapped value.
     * wrapped.reduce(_.add);
     * // => 6
     *
     * // Returns a wrapped value.
     * var squares = wrapped.map(square);
     *
     * _.isArray(squares);
     * // => false
     *
     * _.isArray(squares.value());
     * // => true
     */
    function lodash(value) {
      if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
        if (value instanceof LodashWrapper) {
          return value;
        }
        if (hasOwnProperty.call(value, '__wrapped__')) {
          return wrapperClone(value);
        }
      }
      return new LodashWrapper(value);
    }

    /**
     * The base implementation of `_.create` without support for assigning
     * properties to the created object.
     *
     * @private
     * @param {Object} proto The object to inherit from.
     * @returns {Object} Returns the new object.
     */
    var baseCreate = (function() {
      function object() {}
      return function(proto) {
        if (!isObject(proto)) {
          return {};
        }
        if (objectCreate) {
          return objectCreate(proto);
        }
        object.prototype = proto;
        var result = new object;
        object.prototype = undefined;
        return result;
      };
    }());

    /**
     * The function whose prototype chain sequence wrappers inherit from.
     *
     * @private
     */
    function baseLodash() {
      // No operation performed.
    }

    /**
     * The base constructor for creating `lodash` wrapper objects.
     *
     * @private
     * @param {*} value The value to wrap.
     * @param {boolean} [chainAll] Enable explicit method chain sequences.
     */
    function LodashWrapper(value, chainAll) {
      this.__wrapped__ = value;
      this.__actions__ = [];
      this.__chain__ = !!chainAll;
      this.__index__ = 0;
      this.__values__ = undefined;
    }

    /**
     * By default, the template delimiters used by lodash are like those in
     * embedded Ruby (ERB) as well as ES2015 template strings. Change the
     * following template settings to use alternative delimiters.
     *
     * @static
     * @memberOf _
     * @type {Object}
     */
    lodash.templateSettings = {

      /**
       * Used to detect `data` property values to be HTML-escaped.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      'escape': reEscape,

      /**
       * Used to detect code to be evaluated.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      'evaluate': reEvaluate,

      /**
       * Used to detect `data` property values to inject.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      'interpolate': reInterpolate,

      /**
       * Used to reference the data object in the template text.
       *
       * @memberOf _.templateSettings
       * @type {string}
       */
      'variable': '',

      /**
       * Used to import variables into the compiled template.
       *
       * @memberOf _.templateSettings
       * @type {Object}
       */
      'imports': {

        /**
         * A reference to the `lodash` function.
         *
         * @memberOf _.templateSettings.imports
         * @type {Function}
         */
        '_': lodash
      }
    };

    // Ensure wrappers are instances of `baseLodash`.
    lodash.prototype = baseLodash.prototype;
    lodash.prototype.constructor = lodash;

    LodashWrapper.prototype = baseCreate(baseLodash.prototype);
    LodashWrapper.prototype.constructor = LodashWrapper;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
     *
     * @private
     * @constructor
     * @param {*} value The value to wrap.
     */
    function LazyWrapper(value) {
      this.__wrapped__ = value;
      this.__actions__ = [];
      this.__dir__ = 1;
      this.__filtered__ = false;
      this.__iteratees__ = [];
      this.__takeCount__ = MAX_ARRAY_LENGTH;
      this.__views__ = [];
    }

    /**
     * Creates a clone of the lazy wrapper object.
     *
     * @private
     * @name clone
     * @memberOf LazyWrapper
     * @returns {Object} Returns the cloned `LazyWrapper` object.
     */
    function lazyClone() {
      var result = new LazyWrapper(this.__wrapped__);
      result.__actions__ = copyArray(this.__actions__);
      result.__dir__ = this.__dir__;
      result.__filtered__ = this.__filtered__;
      result.__iteratees__ = copyArray(this.__iteratees__);
      result.__takeCount__ = this.__takeCount__;
      result.__views__ = copyArray(this.__views__);
      return result;
    }

    /**
     * Reverses the direction of lazy iteration.
     *
     * @private
     * @name reverse
     * @memberOf LazyWrapper
     * @returns {Object} Returns the new reversed `LazyWrapper` object.
     */
    function lazyReverse() {
      if (this.__filtered__) {
        var result = new LazyWrapper(this);
        result.__dir__ = -1;
        result.__filtered__ = true;
      } else {
        result = this.clone();
        result.__dir__ *= -1;
      }
      return result;
    }

    /**
     * Extracts the unwrapped value from its lazy wrapper.
     *
     * @private
     * @name value
     * @memberOf LazyWrapper
     * @returns {*} Returns the unwrapped value.
     */
    function lazyValue() {
      var array = this.__wrapped__.value(),
          dir = this.__dir__,
          isArr = isArray(array),
          isRight = dir < 0,
          arrLength = isArr ? array.length : 0,
          view = getView(0, arrLength, this.__views__),
          start = view.start,
          end = view.end,
          length = end - start,
          index = isRight ? end : (start - 1),
          iteratees = this.__iteratees__,
          iterLength = iteratees.length,
          resIndex = 0,
          takeCount = nativeMin(length, this.__takeCount__);

      if (!isArr || (!isRight && arrLength == length && takeCount == length)) {
        return baseWrapperValue(array, this.__actions__);
      }
      var result = [];

      outer:
      while (length-- && resIndex < takeCount) {
        index += dir;

        var iterIndex = -1,
            value = array[index];

        while (++iterIndex < iterLength) {
          var data = iteratees[iterIndex],
              iteratee = data.iteratee,
              type = data.type,
              computed = iteratee(value);

          if (type == LAZY_MAP_FLAG) {
            value = computed;
          } else if (!computed) {
            if (type == LAZY_FILTER_FLAG) {
              continue outer;
            } else {
              break outer;
            }
          }
        }
        result[resIndex++] = value;
      }
      return result;
    }

    // Ensure `LazyWrapper` is an instance of `baseLodash`.
    LazyWrapper.prototype = baseCreate(baseLodash.prototype);
    LazyWrapper.prototype.constructor = LazyWrapper;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Hash(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }

    /**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : undefined;
    }

    /**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
    }

    /**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
      return this;
    }

    // Add methods to `Hash`.
    Hash.prototype.clear = hashClear;
    Hash.prototype['delete'] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;

    /*------------------------------------------------------------------------*/

    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function ListCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function listCacheDelete(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      --this.size;
      return true;
    }

    /**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function listCacheGet(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      return index < 0 ? undefined : data[index][1];
    }

    /**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }

    /**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */
    function listCacheSet(key, value) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }

    // Add methods to `ListCache`.
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype['delete'] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function MapCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        'hash': new Hash,
        'map': new (Map || ListCache),
        'string': new Hash
      };
    }

    /**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function mapCacheDelete(key) {
      var result = getMapData(this, key)['delete'](key);
      this.size -= result ? 1 : 0;
      return result;
    }

    /**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }

    /**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }

    /**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */
    function mapCacheSet(key, value) {
      var data = getMapData(this, key),
          size = data.size;

      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }

    // Add methods to `MapCache`.
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype['delete'] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;

    /*------------------------------------------------------------------------*/

    /**
     *
     * Creates an array cache object to store unique values.
     *
     * @private
     * @constructor
     * @param {Array} [values] The values to cache.
     */
    function SetCache(values) {
      var index = -1,
          length = values == null ? 0 : values.length;

      this.__data__ = new MapCache;
      while (++index < length) {
        this.add(values[index]);
      }
    }

    /**
     * Adds `value` to the array cache.
     *
     * @private
     * @name add
     * @memberOf SetCache
     * @alias push
     * @param {*} value The value to cache.
     * @returns {Object} Returns the cache instance.
     */
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }

    /**
     * Checks if `value` is in the array cache.
     *
     * @private
     * @name has
     * @memberOf SetCache
     * @param {*} value The value to search for.
     * @returns {number} Returns `true` if `value` is found, else `false`.
     */
    function setCacheHas(value) {
      return this.__data__.has(value);
    }

    // Add methods to `SetCache`.
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }

    /**
     * Removes all key-value entries from the stack.
     *
     * @private
     * @name clear
     * @memberOf Stack
     */
    function stackClear() {
      this.__data__ = new ListCache;
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the stack.
     *
     * @private
     * @name delete
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function stackDelete(key) {
      var data = this.__data__,
          result = data['delete'](key);

      this.size = data.size;
      return result;
    }

    /**
     * Gets the stack value for `key`.
     *
     * @private
     * @name get
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function stackGet(key) {
      return this.__data__.get(key);
    }

    /**
     * Checks if a stack value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function stackHas(key) {
      return this.__data__.has(key);
    }

    /**
     * Sets the stack `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache instance.
     */
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }

    // Add methods to `Stack`.
    Stack.prototype.clear = stackClear;
    Stack.prototype['delete'] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;

    /*------------------------------------------------------------------------*/

    /**
     * Creates an array of the enumerable property names of the array-like `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @param {boolean} inherited Specify returning inherited property names.
     * @returns {Array} Returns the array of property names.
     */
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value),
          isArg = !isArr && isArguments(value),
          isBuff = !isArr && !isArg && isBuffer(value),
          isType = !isArr && !isArg && !isBuff && isTypedArray(value),
          skipIndexes = isArr || isArg || isBuff || isType,
          result = skipIndexes ? baseTimes(value.length, String) : [],
          length = result.length;

      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) &&
            !(skipIndexes && (
               // Safari 9 has enumerable `arguments.length` in strict mode.
               key == 'length' ||
               // Node.js 0.10 has enumerable non-index properties on buffers.
               (isBuff && (key == 'offset' || key == 'parent')) ||
               // PhantomJS 2 has enumerable non-index properties on typed arrays.
               (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
               // Skip index properties.
               isIndex(key, length)
            ))) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * A specialized version of `_.sample` for arrays.
     *
     * @private
     * @param {Array} array The array to sample.
     * @returns {*} Returns the random element.
     */
    function arraySample(array) {
      var length = array.length;
      return length ? array[baseRandom(0, length - 1)] : undefined;
    }

    /**
     * A specialized version of `_.sampleSize` for arrays.
     *
     * @private
     * @param {Array} array The array to sample.
     * @param {number} n The number of elements to sample.
     * @returns {Array} Returns the random elements.
     */
    function arraySampleSize(array, n) {
      return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
    }

    /**
     * A specialized version of `_.shuffle` for arrays.
     *
     * @private
     * @param {Array} array The array to shuffle.
     * @returns {Array} Returns the new shuffled array.
     */
    function arrayShuffle(array) {
      return shuffleSelf(copyArray(array));
    }

    /**
     * This function is like `assignValue` except that it doesn't assign
     * `undefined` values.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignMergeValue(object, key, value) {
      if ((value !== undefined && !eq(object[key], value)) ||
          (value === undefined && !(key in object))) {
        baseAssignValue(object, key, value);
      }
    }

    /**
     * Assigns `value` to `key` of `object` if the existing value is not equivalent
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
          (value === undefined && !(key in object))) {
        baseAssignValue(object, key, value);
      }
    }

    /**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }

    /**
     * Aggregates elements of `collection` on `accumulator` with keys transformed
     * by `iteratee` and values set by `setter`.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} setter The function to set `accumulator` values.
     * @param {Function} iteratee The iteratee to transform keys.
     * @param {Object} accumulator The initial aggregated object.
     * @returns {Function} Returns `accumulator`.
     */
    function baseAggregator(collection, setter, iteratee, accumulator) {
      baseEach(collection, function(value, key, collection) {
        setter(accumulator, value, iteratee(value), collection);
      });
      return accumulator;
    }

    /**
     * The base implementation of `_.assign` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssign(object, source) {
      return object && copyObject(source, keys(source), object);
    }

    /**
     * The base implementation of `_.assignIn` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssignIn(object, source) {
      return object && copyObject(source, keysIn(source), object);
    }

    /**
     * The base implementation of `assignValue` and `assignMergeValue` without
     * value checks.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function baseAssignValue(object, key, value) {
      if (key == '__proto__' && defineProperty) {
        defineProperty(object, key, {
          'configurable': true,
          'enumerable': true,
          'value': value,
          'writable': true
        });
      } else {
        object[key] = value;
      }
    }

    /**
     * The base implementation of `_.at` without support for individual paths.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {string[]} paths The property paths to pick.
     * @returns {Array} Returns the picked elements.
     */
    function baseAt(object, paths) {
      var index = -1,
          length = paths.length,
          result = Array(length),
          skip = object == null;

      while (++index < length) {
        result[index] = skip ? undefined : get(object, paths[index]);
      }
      return result;
    }

    /**
     * The base implementation of `_.clamp` which doesn't coerce arguments.
     *
     * @private
     * @param {number} number The number to clamp.
     * @param {number} [lower] The lower bound.
     * @param {number} upper The upper bound.
     * @returns {number} Returns the clamped number.
     */
    function baseClamp(number, lower, upper) {
      if (number === number) {
        if (upper !== undefined) {
          number = number <= upper ? number : upper;
        }
        if (lower !== undefined) {
          number = number >= lower ? number : lower;
        }
      }
      return number;
    }

    /**
     * The base implementation of `_.clone` and `_.cloneDeep` which tracks
     * traversed objects.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} bitmask The bitmask flags.
     *  1 - Deep clone
     *  2 - Flatten inherited properties
     *  4 - Clone symbols
     * @param {Function} [customizer] The function to customize cloning.
     * @param {string} [key] The key of `value`.
     * @param {Object} [object] The parent object of `value`.
     * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
     * @returns {*} Returns the cloned value.
     */
    function baseClone(value, bitmask, customizer, key, object, stack) {
      var result,
          isDeep = bitmask & CLONE_DEEP_FLAG,
          isFlat = bitmask & CLONE_FLAT_FLAG,
          isFull = bitmask & CLONE_SYMBOLS_FLAG;

      if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value);
      }
      if (result !== undefined) {
        return result;
      }
      if (!isObject(value)) {
        return value;
      }
      var isArr = isArray(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = getTag(value),
            isFunc = tag == funcTag || tag == genTag;

        if (isBuffer(value)) {
          return cloneBuffer(value, isDeep);
        }
        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
          result = (isFlat || isFunc) ? {} : initCloneObject(value);
          if (!isDeep) {
            return isFlat
              ? copySymbolsIn(value, baseAssignIn(result, value))
              : copySymbols(value, baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object ? value : {};
          }
          result = initCloneByTag(value, tag, isDeep);
        }
      }
      // Check for circular references and return its corresponding clone.
      stack || (stack = new Stack);
      var stacked = stack.get(value);
      if (stacked) {
        return stacked;
      }
      stack.set(value, result);

      if (isSet(value)) {
        value.forEach(function(subValue) {
          result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
        });
      } else if (isMap(value)) {
        value.forEach(function(subValue, key) {
          result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
        });
      }

      var keysFunc = isFull
        ? (isFlat ? getAllKeysIn : getAllKeys)
        : (isFlat ? keysIn : keys);

      var props = isArr ? undefined : keysFunc(value);
      arrayEach(props || value, function(subValue, key) {
        if (props) {
          key = subValue;
          subValue = value[key];
        }
        // Recursively populate clone (susceptible to call stack limits).
        assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
      });
      return result;
    }

    /**
     * The base implementation of `_.conforms` which doesn't clone `source`.
     *
     * @private
     * @param {Object} source The object of property predicates to conform to.
     * @returns {Function} Returns the new spec function.
     */
    function baseConforms(source) {
      var props = keys(source);
      return function(object) {
        return baseConformsTo(object, source, props);
      };
    }

    /**
     * The base implementation of `_.conformsTo` which accepts `props` to check.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property predicates to conform to.
     * @returns {boolean} Returns `true` if `object` conforms, else `false`.
     */
    function baseConformsTo(object, source, props) {
      var length = props.length;
      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (length--) {
        var key = props[length],
            predicate = source[key],
            value = object[key];

        if ((value === undefined && !(key in object)) || !predicate(value)) {
          return false;
        }
      }
      return true;
    }

    /**
     * The base implementation of `_.delay` and `_.defer` which accepts `args`
     * to provide to `func`.
     *
     * @private
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {Array} args The arguments to provide to `func`.
     * @returns {number|Object} Returns the timer id or timeout object.
     */
    function baseDelay(func, wait, args) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return setTimeout(function() { func.apply(undefined, args); }, wait);
    }

    /**
     * The base implementation of methods like `_.difference` without support
     * for excluding multiple arrays or iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Array} values The values to exclude.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     */
    function baseDifference(array, values, iteratee, comparator) {
      var index = -1,
          includes = arrayIncludes,
          isCommon = true,
          length = array.length,
          result = [],
          valuesLength = values.length;

      if (!length) {
        return result;
      }
      if (iteratee) {
        values = arrayMap(values, baseUnary(iteratee));
      }
      if (comparator) {
        includes = arrayIncludesWith;
        isCommon = false;
      }
      else if (values.length >= LARGE_ARRAY_SIZE) {
        includes = cacheHas;
        isCommon = false;
        values = new SetCache(values);
      }
      outer:
      while (++index < length) {
        var value = array[index],
            computed = iteratee == null ? value : iteratee(value);

        value = (comparator || value !== 0) ? value : 0;
        if (isCommon && computed === computed) {
          var valuesIndex = valuesLength;
          while (valuesIndex--) {
            if (values[valuesIndex] === computed) {
              continue outer;
            }
          }
          result.push(value);
        }
        else if (!includes(values, computed, comparator)) {
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.forEach` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     */
    var baseEach = createBaseEach(baseForOwn);

    /**
     * The base implementation of `_.forEachRight` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     */
    var baseEachRight = createBaseEach(baseForOwnRight, true);

    /**
     * The base implementation of `_.every` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`
     */
    function baseEvery(collection, predicate) {
      var result = true;
      baseEach(collection, function(value, index, collection) {
        result = !!predicate(value, index, collection);
        return result;
      });
      return result;
    }

    /**
     * The base implementation of methods like `_.max` and `_.min` which accepts a
     * `comparator` to determine the extremum value.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The iteratee invoked per iteration.
     * @param {Function} comparator The comparator used to compare values.
     * @returns {*} Returns the extremum value.
     */
    function baseExtremum(array, iteratee, comparator) {
      var index = -1,
          length = array.length;

      while (++index < length) {
        var value = array[index],
            current = iteratee(value);

        if (current != null && (computed === undefined
              ? (current === current && !isSymbol(current))
              : comparator(current, computed)
            )) {
          var computed = current,
              result = value;
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.fill` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     */
    function baseFill(array, value, start, end) {
      var length = array.length;

      start = toInteger(start);
      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = (end === undefined || end > length) ? length : toInteger(end);
      if (end < 0) {
        end += length;
      }
      end = start > end ? 0 : toLength(end);
      while (start < end) {
        array[start++] = value;
      }
      return array;
    }

    /**
     * The base implementation of `_.filter` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */
    function baseFilter(collection, predicate) {
      var result = [];
      baseEach(collection, function(value, index, collection) {
        if (predicate(value, index, collection)) {
          result.push(value);
        }
      });
      return result;
    }

    /**
     * The base implementation of `_.flatten` with support for restricting flattening.
     *
     * @private
     * @param {Array} array The array to flatten.
     * @param {number} depth The maximum recursion depth.
     * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
     * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
     * @param {Array} [result=[]] The initial result value.
     * @returns {Array} Returns the new flattened array.
     */
    function baseFlatten(array, depth, predicate, isStrict, result) {
      var index = -1,
          length = array.length;

      predicate || (predicate = isFlattenable);
      result || (result = []);

      while (++index < length) {
        var value = array[index];
        if (depth > 0 && predicate(value)) {
          if (depth > 1) {
            // Recursively flatten arrays (susceptible to call stack limits).
            baseFlatten(value, depth - 1, predicate, isStrict, result);
          } else {
            arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    }

    /**
     * The base implementation of `baseForOwn` which iterates over `object`
     * properties returned by `keysFunc` and invokes `iteratee` for each property.
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseFor = createBaseFor();

    /**
     * This function is like `baseFor` except that it iterates over properties
     * in the opposite order.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseForRight = createBaseFor(true);

    /**
     * The base implementation of `_.forOwn` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwn(object, iteratee) {
      return object && baseFor(object, iteratee, keys);
    }

    /**
     * The base implementation of `_.forOwnRight` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwnRight(object, iteratee) {
      return object && baseForRight(object, iteratee, keys);
    }

    /**
     * The base implementation of `_.functions` which creates an array of
     * `object` function property names filtered from `props`.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Array} props The property names to filter.
     * @returns {Array} Returns the function names.
     */
    function baseFunctions(object, props) {
      return arrayFilter(props, function(key) {
        return isFunction(object[key]);
      });
    }

    /**
     * The base implementation of `_.get` without support for default values.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @returns {*} Returns the resolved value.
     */
    function baseGet(object, path) {
      path = castPath(path, object);

      var index = 0,
          length = path.length;

      while (object != null && index < length) {
        object = object[toKey(path[index++])];
      }
      return (index && index == length) ? object : undefined;
    }

    /**
     * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
     * `keysFunc` and `symbolsFunc` to get the enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @param {Function} symbolsFunc The function to get the symbols of `object`.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }

    /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function baseGetTag(value) {
      if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
      }
      return (symToStringTag && symToStringTag in Object(value))
        ? getRawTag(value)
        : objectToString(value);
    }

    /**
     * The base implementation of `_.gt` which doesn't coerce arguments.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than `other`,
     *  else `false`.
     */
    function baseGt(value, other) {
      return value > other;
    }

    /**
     * The base implementation of `_.has` without support for deep paths.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */
    function baseHas(object, key) {
      return object != null && hasOwnProperty.call(object, key);
    }

    /**
     * The base implementation of `_.hasIn` without support for deep paths.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */
    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }

    /**
     * The base implementation of `_.inRange` which doesn't coerce arguments.
     *
     * @private
     * @param {number} number The number to check.
     * @param {number} start The start of the range.
     * @param {number} end The end of the range.
     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
     */
    function baseInRange(number, start, end) {
      return number >= nativeMin(start, end) && number < nativeMax(start, end);
    }

    /**
     * The base implementation of methods like `_.intersection`, without support
     * for iteratee shorthands, that accepts an array of arrays to inspect.
     *
     * @private
     * @param {Array} arrays The arrays to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of shared values.
     */
    function baseIntersection(arrays, iteratee, comparator) {
      var includes = comparator ? arrayIncludesWith : arrayIncludes,
          length = arrays[0].length,
          othLength = arrays.length,
          othIndex = othLength,
          caches = Array(othLength),
          maxLength = Infinity,
          result = [];

      while (othIndex--) {
        var array = arrays[othIndex];
        if (othIndex && iteratee) {
          array = arrayMap(array, baseUnary(iteratee));
        }
        maxLength = nativeMin(array.length, maxLength);
        caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
          ? new SetCache(othIndex && array)
          : undefined;
      }
      array = arrays[0];

      var index = -1,
          seen = caches[0];

      outer:
      while (++index < length && result.length < maxLength) {
        var value = array[index],
            computed = iteratee ? iteratee(value) : value;

        value = (comparator || value !== 0) ? value : 0;
        if (!(seen
              ? cacheHas(seen, computed)
              : includes(result, computed, comparator)
            )) {
          othIndex = othLength;
          while (--othIndex) {
            var cache = caches[othIndex];
            if (!(cache
                  ? cacheHas(cache, computed)
                  : includes(arrays[othIndex], computed, comparator))
                ) {
              continue outer;
            }
          }
          if (seen) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.invert` and `_.invertBy` which inverts
     * `object` with values transformed by `iteratee` and set by `setter`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} setter The function to set `accumulator` values.
     * @param {Function} iteratee The iteratee to transform values.
     * @param {Object} accumulator The initial inverted object.
     * @returns {Function} Returns `accumulator`.
     */
    function baseInverter(object, setter, iteratee, accumulator) {
      baseForOwn(object, function(value, key, object) {
        setter(accumulator, iteratee(value), key, object);
      });
      return accumulator;
    }

    /**
     * The base implementation of `_.invoke` without support for individual
     * method arguments.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the method to invoke.
     * @param {Array} args The arguments to invoke the method with.
     * @returns {*} Returns the result of the invoked method.
     */
    function baseInvoke(object, path, args) {
      path = castPath(path, object);
      object = parent(object, path);
      var func = object == null ? object : object[toKey(last(path))];
      return func == null ? undefined : apply(func, object, args);
    }

    /**
     * The base implementation of `_.isArguments`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     */
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }

    /**
     * The base implementation of `_.isArrayBuffer` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
     */
    function baseIsArrayBuffer(value) {
      return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
    }

    /**
     * The base implementation of `_.isDate` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
     */
    function baseIsDate(value) {
      return isObjectLike(value) && baseGetTag(value) == dateTag;
    }

    /**
     * The base implementation of `_.isEqual` which supports partial comparisons
     * and tracks traversed objects.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {boolean} bitmask The bitmask flags.
     *  1 - Unordered comparison
     *  2 - Partial comparison
     * @param {Function} [customizer] The function to customize comparisons.
     * @param {Object} [stack] Tracks traversed `value` and `other` objects.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     */
    function baseIsEqual(value, other, bitmask, customizer, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }

    /**
     * A specialized version of `baseIsEqual` for arrays and objects which performs
     * deep comparisons and tracks traversed objects enabling objects with circular
     * references to be compared.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} [stack] Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray(object),
          othIsArr = isArray(other),
          objTag = objIsArr ? arrayTag : getTag(object),
          othTag = othIsArr ? arrayTag : getTag(other);

      objTag = objTag == argsTag ? objectTag : objTag;
      othTag = othTag == argsTag ? objectTag : othTag;

      var objIsObj = objTag == objectTag,
          othIsObj = othTag == objectTag,
          isSameTag = objTag == othTag;

      if (isSameTag && isBuffer(object)) {
        if (!isBuffer(other)) {
          return false;
        }
        objIsArr = true;
        objIsObj = false;
      }
      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack);
        return (objIsArr || isTypedArray(object))
          ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
          : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
            othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object,
              othUnwrapped = othIsWrapped ? other.value() : other;

          stack || (stack = new Stack);
          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack);
      return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    }

    /**
     * The base implementation of `_.isMap` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
     */
    function baseIsMap(value) {
      return isObjectLike(value) && getTag(value) == mapTag;
    }

    /**
     * The base implementation of `_.isMatch` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Array} matchData The property names, values, and compare flags to match.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     */
    function baseIsMatch(object, source, matchData, customizer) {
      var index = matchData.length,
          length = index,
          noCustomizer = !customizer;

      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (index--) {
        var data = matchData[index];
        if ((noCustomizer && data[2])
              ? data[1] !== object[data[0]]
              : !(data[0] in object)
            ) {
          return false;
        }
      }
      while (++index < length) {
        data = matchData[index];
        var key = data[0],
            objValue = object[key],
            srcValue = data[1];

        if (noCustomizer && data[2]) {
          if (objValue === undefined && !(key in object)) {
            return false;
          }
        } else {
          var stack = new Stack;
          if (customizer) {
            var result = customizer(objValue, srcValue, key, object, source, stack);
          }
          if (!(result === undefined
                ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
                : result
              )) {
            return false;
          }
        }
      }
      return true;
    }

    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }

    /**
     * The base implementation of `_.isRegExp` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
     */
    function baseIsRegExp(value) {
      return isObjectLike(value) && baseGetTag(value) == regexpTag;
    }

    /**
     * The base implementation of `_.isSet` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
     */
    function baseIsSet(value) {
      return isObjectLike(value) && getTag(value) == setTag;
    }

    /**
     * The base implementation of `_.isTypedArray` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     */
    function baseIsTypedArray(value) {
      return isObjectLike(value) &&
        isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }

    /**
     * The base implementation of `_.iteratee`.
     *
     * @private
     * @param {*} [value=_.identity] The value to convert to an iteratee.
     * @returns {Function} Returns the iteratee.
     */
    function baseIteratee(value) {
      // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
      // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
      if (typeof value == 'function') {
        return value;
      }
      if (value == null) {
        return identity;
      }
      if (typeof value == 'object') {
        return isArray(value)
          ? baseMatchesProperty(value[0], value[1])
          : baseMatches(value);
      }
      return property(value);
    }

    /**
     * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != 'constructor') {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeysIn(object) {
      if (!isObject(object)) {
        return nativeKeysIn(object);
      }
      var isProto = isPrototype(object),
          result = [];

      for (var key in object) {
        if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.lt` which doesn't coerce arguments.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than `other`,
     *  else `false`.
     */
    function baseLt(value, other) {
      return value < other;
    }

    /**
     * The base implementation of `_.map` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function baseMap(collection, iteratee) {
      var index = -1,
          result = isArrayLike(collection) ? Array(collection.length) : [];

      baseEach(collection, function(value, key, collection) {
        result[++index] = iteratee(value, key, collection);
      });
      return result;
    }

    /**
     * The base implementation of `_.matches` which doesn't clone `source`.
     *
     * @private
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new spec function.
     */
    function baseMatches(source) {
      var matchData = getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
      }
      return function(object) {
        return object === source || baseIsMatch(object, source, matchData);
      };
    }

    /**
     * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
     *
     * @private
     * @param {string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */
    function baseMatchesProperty(path, srcValue) {
      if (isKey(path) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path), srcValue);
      }
      return function(object) {
        var objValue = get(object, path);
        return (objValue === undefined && objValue === srcValue)
          ? hasIn(object, path)
          : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
      };
    }

    /**
     * The base implementation of `_.merge` without support for multiple sources.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} [customizer] The function to customize merged values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */
    function baseMerge(object, source, srcIndex, customizer, stack) {
      if (object === source) {
        return;
      }
      baseFor(source, function(srcValue, key) {
        stack || (stack = new Stack);
        if (isObject(srcValue)) {
          baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
        }
        else {
          var newValue = customizer
            ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
            : undefined;

          if (newValue === undefined) {
            newValue = srcValue;
          }
          assignMergeValue(object, key, newValue);
        }
      }, keysIn);
    }

    /**
     * A specialized version of `baseMerge` for arrays and objects which performs
     * deep merges and tracks traversed objects enabling objects with circular
     * references to be merged.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {string} key The key of the value to merge.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} mergeFunc The function to merge values.
     * @param {Function} [customizer] The function to customize assigned values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */
    function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
      var objValue = safeGet(object, key),
          srcValue = safeGet(source, key),
          stacked = stack.get(srcValue);

      if (stacked) {
        assignMergeValue(object, key, stacked);
        return;
      }
      var newValue = customizer
        ? customizer(objValue, srcValue, (key + ''), object, source, stack)
        : undefined;

      var isCommon = newValue === undefined;

      if (isCommon) {
        var isArr = isArray(srcValue),
            isBuff = !isArr && isBuffer(srcValue),
            isTyped = !isArr && !isBuff && isTypedArray(srcValue);

        newValue = srcValue;
        if (isArr || isBuff || isTyped) {
          if (isArray(objValue)) {
            newValue = objValue;
          }
          else if (isArrayLikeObject(objValue)) {
            newValue = copyArray(objValue);
          }
          else if (isBuff) {
            isCommon = false;
            newValue = cloneBuffer(srcValue, true);
          }
          else if (isTyped) {
            isCommon = false;
            newValue = cloneTypedArray(srcValue, true);
          }
          else {
            newValue = [];
          }
        }
        else if (isPlainObject(srcValue) || isArguments(srcValue)) {
          newValue = objValue;
          if (isArguments(objValue)) {
            newValue = toPlainObject(objValue);
          }
          else if (!isObject(objValue) || isFunction(objValue)) {
            newValue = initCloneObject(srcValue);
          }
        }
        else {
          isCommon = false;
        }
      }
      if (isCommon) {
        // Recursively merge objects and arrays (susceptible to call stack limits).
        stack.set(srcValue, newValue);
        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
        stack['delete'](srcValue);
      }
      assignMergeValue(object, key, newValue);
    }

    /**
     * The base implementation of `_.nth` which doesn't coerce arguments.
     *
     * @private
     * @param {Array} array The array to query.
     * @param {number} n The index of the element to return.
     * @returns {*} Returns the nth element of `array`.
     */
    function baseNth(array, n) {
      var length = array.length;
      if (!length) {
        return;
      }
      n += n < 0 ? length : 0;
      return isIndex(n, length) ? array[n] : undefined;
    }

    /**
     * The base implementation of `_.orderBy` without param guards.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
     * @param {string[]} orders The sort orders of `iteratees`.
     * @returns {Array} Returns the new sorted array.
     */
    function baseOrderBy(collection, iteratees, orders) {
      var index = -1;
      iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(getIteratee()));

      var result = baseMap(collection, function(value, key, collection) {
        var criteria = arrayMap(iteratees, function(iteratee) {
          return iteratee(value);
        });
        return { 'criteria': criteria, 'index': ++index, 'value': value };
      });

      return baseSortBy(result, function(object, other) {
        return compareMultiple(object, other, orders);
      });
    }

    /**
     * The base implementation of `_.pick` without support for individual
     * property identifiers.
     *
     * @private
     * @param {Object} object The source object.
     * @param {string[]} paths The property paths to pick.
     * @returns {Object} Returns the new object.
     */
    function basePick(object, paths) {
      return basePickBy(object, paths, function(value, path) {
        return hasIn(object, path);
      });
    }

    /**
     * The base implementation of  `_.pickBy` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The source object.
     * @param {string[]} paths The property paths to pick.
     * @param {Function} predicate The function invoked per property.
     * @returns {Object} Returns the new object.
     */
    function basePickBy(object, paths, predicate) {
      var index = -1,
          length = paths.length,
          result = {};

      while (++index < length) {
        var path = paths[index],
            value = baseGet(object, path);

        if (predicate(value, path)) {
          baseSet(result, castPath(path, object), value);
        }
      }
      return result;
    }

    /**
     * A specialized version of `baseProperty` which supports deep paths.
     *
     * @private
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     */
    function basePropertyDeep(path) {
      return function(object) {
        return baseGet(object, path);
      };
    }

    /**
     * The base implementation of `_.pullAllBy` without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns `array`.
     */
    function basePullAll(array, values, iteratee, comparator) {
      var indexOf = comparator ? baseIndexOfWith : baseIndexOf,
          index = -1,
          length = values.length,
          seen = array;

      if (array === values) {
        values = copyArray(values);
      }
      if (iteratee) {
        seen = arrayMap(array, baseUnary(iteratee));
      }
      while (++index < length) {
        var fromIndex = 0,
            value = values[index],
            computed = iteratee ? iteratee(value) : value;

        while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
          if (seen !== array) {
            splice.call(seen, fromIndex, 1);
          }
          splice.call(array, fromIndex, 1);
        }
      }
      return array;
    }

    /**
     * The base implementation of `_.pullAt` without support for individual
     * indexes or capturing the removed elements.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {number[]} indexes The indexes of elements to remove.
     * @returns {Array} Returns `array`.
     */
    function basePullAt(array, indexes) {
      var length = array ? indexes.length : 0,
          lastIndex = length - 1;

      while (length--) {
        var index = indexes[length];
        if (length == lastIndex || index !== previous) {
          var previous = index;
          if (isIndex(index)) {
            splice.call(array, index, 1);
          } else {
            baseUnset(array, index);
          }
        }
      }
      return array;
    }

    /**
     * The base implementation of `_.random` without support for returning
     * floating-point numbers.
     *
     * @private
     * @param {number} lower The lower bound.
     * @param {number} upper The upper bound.
     * @returns {number} Returns the random number.
     */
    function baseRandom(lower, upper) {
      return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
    }

    /**
     * The base implementation of `_.range` and `_.rangeRight` which doesn't
     * coerce arguments.
     *
     * @private
     * @param {number} start The start of the range.
     * @param {number} end The end of the range.
     * @param {number} step The value to increment or decrement by.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Array} Returns the range of numbers.
     */
    function baseRange(start, end, step, fromRight) {
      var index = -1,
          length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
          result = Array(length);

      while (length--) {
        result[fromRight ? length : ++index] = start;
        start += step;
      }
      return result;
    }

    /**
     * The base implementation of `_.repeat` which doesn't coerce arguments.
     *
     * @private
     * @param {string} string The string to repeat.
     * @param {number} n The number of times to repeat the string.
     * @returns {string} Returns the repeated string.
     */
    function baseRepeat(string, n) {
      var result = '';
      if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
        return result;
      }
      // Leverage the exponentiation by squaring algorithm for a faster repeat.
      // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
      do {
        if (n % 2) {
          result += string;
        }
        n = nativeFloor(n / 2);
        if (n) {
          string += string;
        }
      } while (n);

      return result;
    }

    /**
     * The base implementation of `_.rest` which doesn't validate or coerce arguments.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     */
    function baseRest(func, start) {
      return setToString(overRest(func, start, identity), func + '');
    }

    /**
     * The base implementation of `_.sample`.
     *
     * @private
     * @param {Array|Object} collection The collection to sample.
     * @returns {*} Returns the random element.
     */
    function baseSample(collection) {
      return arraySample(values(collection));
    }

    /**
     * The base implementation of `_.sampleSize` without param guards.
     *
     * @private
     * @param {Array|Object} collection The collection to sample.
     * @param {number} n The number of elements to sample.
     * @returns {Array} Returns the random elements.
     */
    function baseSampleSize(collection, n) {
      var array = values(collection);
      return shuffleSelf(array, baseClamp(n, 0, array.length));
    }

    /**
     * The base implementation of `_.set`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @param {Function} [customizer] The function to customize path creation.
     * @returns {Object} Returns `object`.
     */
    function baseSet(object, path, value, customizer) {
      if (!isObject(object)) {
        return object;
      }
      path = castPath(path, object);

      var index = -1,
          length = path.length,
          lastIndex = length - 1,
          nested = object;

      while (nested != null && ++index < length) {
        var key = toKey(path[index]),
            newValue = value;

        if (index != lastIndex) {
          var objValue = nested[key];
          newValue = customizer ? customizer(objValue, key, nested) : undefined;
          if (newValue === undefined) {
            newValue = isObject(objValue)
              ? objValue
              : (isIndex(path[index + 1]) ? [] : {});
          }
        }
        assignValue(nested, key, newValue);
        nested = nested[key];
      }
      return object;
    }

    /**
     * The base implementation of `setData` without support for hot loop shorting.
     *
     * @private
     * @param {Function} func The function to associate metadata with.
     * @param {*} data The metadata.
     * @returns {Function} Returns `func`.
     */
    var baseSetData = !metaMap ? identity : function(func, data) {
      metaMap.set(func, data);
      return func;
    };

    /**
     * The base implementation of `setToString` without support for hot loop shorting.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */
    var baseSetToString = !defineProperty ? identity : function(func, string) {
      return defineProperty(func, 'toString', {
        'configurable': true,
        'enumerable': false,
        'value': constant(string),
        'writable': true
      });
    };

    /**
     * The base implementation of `_.shuffle`.
     *
     * @private
     * @param {Array|Object} collection The collection to shuffle.
     * @returns {Array} Returns the new shuffled array.
     */
    function baseShuffle(collection) {
      return shuffleSelf(values(collection));
    }

    /**
     * The base implementation of `_.slice` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseSlice(array, start, end) {
      var index = -1,
          length = array.length;

      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : ((end - start) >>> 0);
      start >>>= 0;

      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }

    /**
     * The base implementation of `_.some` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */
    function baseSome(collection, predicate) {
      var result;

      baseEach(collection, function(value, index, collection) {
        result = predicate(value, index, collection);
        return !result;
      });
      return !!result;
    }

    /**
     * The base implementation of `_.sortedIndex` and `_.sortedLastIndex` which
     * performs a binary search of `array` to determine the index at which `value`
     * should be inserted into `array` in order to maintain its sort order.
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */
    function baseSortedIndex(array, value, retHighest) {
      var low = 0,
          high = array == null ? low : array.length;

      if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
        while (low < high) {
          var mid = (low + high) >>> 1,
              computed = array[mid];

          if (computed !== null && !isSymbol(computed) &&
              (retHighest ? (computed <= value) : (computed < value))) {
            low = mid + 1;
          } else {
            high = mid;
          }
        }
        return high;
      }
      return baseSortedIndexBy(array, value, identity, retHighest);
    }

    /**
     * The base implementation of `_.sortedIndexBy` and `_.sortedLastIndexBy`
     * which invokes `iteratee` for `value` and each element of `array` to compute
     * their sort ranking. The iteratee is invoked with one argument; (value).
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} iteratee The iteratee invoked per element.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */
    function baseSortedIndexBy(array, value, iteratee, retHighest) {
      value = iteratee(value);

      var low = 0,
          high = array == null ? 0 : array.length,
          valIsNaN = value !== value,
          valIsNull = value === null,
          valIsSymbol = isSymbol(value),
          valIsUndefined = value === undefined;

      while (low < high) {
        var mid = nativeFloor((low + high) / 2),
            computed = iteratee(array[mid]),
            othIsDefined = computed !== undefined,
            othIsNull = computed === null,
            othIsReflexive = computed === computed,
            othIsSymbol = isSymbol(computed);

        if (valIsNaN) {
          var setLow = retHighest || othIsReflexive;
        } else if (valIsUndefined) {
          setLow = othIsReflexive && (retHighest || othIsDefined);
        } else if (valIsNull) {
          setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
        } else if (valIsSymbol) {
          setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
        } else if (othIsNull || othIsSymbol) {
          setLow = false;
        } else {
          setLow = retHighest ? (computed <= value) : (computed < value);
        }
        if (setLow) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }
      return nativeMin(high, MAX_ARRAY_INDEX);
    }

    /**
     * The base implementation of `_.sortedUniq` and `_.sortedUniqBy` without
     * support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     */
    function baseSortedUniq(array, iteratee) {
      var index = -1,
          length = array.length,
          resIndex = 0,
          result = [];

      while (++index < length) {
        var value = array[index],
            computed = iteratee ? iteratee(value) : value;

        if (!index || !eq(computed, seen)) {
          var seen = computed;
          result[resIndex++] = value === 0 ? 0 : value;
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.toNumber` which doesn't ensure correct
     * conversions of binary, hexadecimal, or octal string values.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     */
    function baseToNumber(value) {
      if (typeof value == 'number') {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      return +value;
    }

    /**
     * The base implementation of `_.toString` which doesn't convert nullish
     * values to empty strings.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */
    function baseToString(value) {
      // Exit early for strings to avoid a performance hit in some environments.
      if (typeof value == 'string') {
        return value;
      }
      if (isArray(value)) {
        // Recursively convert values (susceptible to call stack limits).
        return arrayMap(value, baseToString) + '';
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : '';
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }

    /**
     * The base implementation of `_.uniqBy` without support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     */
    function baseUniq(array, iteratee, comparator) {
      var index = -1,
          includes = arrayIncludes,
          length = array.length,
          isCommon = true,
          result = [],
          seen = result;

      if (comparator) {
        isCommon = false;
        includes = arrayIncludesWith;
      }
      else if (length >= LARGE_ARRAY_SIZE) {
        var set = iteratee ? null : createSet(array);
        if (set) {
          return setToArray(set);
        }
        isCommon = false;
        includes = cacheHas;
        seen = new SetCache;
      }
      else {
        seen = iteratee ? [] : result;
      }
      outer:
      while (++index < length) {
        var value = array[index],
            computed = iteratee ? iteratee(value) : value;

        value = (comparator || value !== 0) ? value : 0;
        if (isCommon && computed === computed) {
          var seenIndex = seen.length;
          while (seenIndex--) {
            if (seen[seenIndex] === computed) {
              continue outer;
            }
          }
          if (iteratee) {
            seen.push(computed);
          }
          result.push(value);
        }
        else if (!includes(seen, computed, comparator)) {
          if (seen !== result) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.unset`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The property path to unset.
     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
     */
    function baseUnset(object, path) {
      path = castPath(path, object);
      object = parent(object, path);
      return object == null || delete object[toKey(last(path))];
    }

    /**
     * The base implementation of `_.update`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to update.
     * @param {Function} updater The function to produce the updated value.
     * @param {Function} [customizer] The function to customize path creation.
     * @returns {Object} Returns `object`.
     */
    function baseUpdate(object, path, updater, customizer) {
      return baseSet(object, path, updater(baseGet(object, path)), customizer);
    }

    /**
     * The base implementation of methods like `_.dropWhile` and `_.takeWhile`
     * without support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to query.
     * @param {Function} predicate The function invoked per iteration.
     * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseWhile(array, predicate, isDrop, fromRight) {
      var length = array.length,
          index = fromRight ? length : -1;

      while ((fromRight ? index-- : ++index < length) &&
        predicate(array[index], index, array)) {}

      return isDrop
        ? baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length))
        : baseSlice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
    }

    /**
     * The base implementation of `wrapperValue` which returns the result of
     * performing a sequence of actions on the unwrapped `value`, where each
     * successive action is supplied the return value of the previous.
     *
     * @private
     * @param {*} value The unwrapped value.
     * @param {Array} actions Actions to perform to resolve the unwrapped value.
     * @returns {*} Returns the resolved value.
     */
    function baseWrapperValue(value, actions) {
      var result = value;
      if (result instanceof LazyWrapper) {
        result = result.value();
      }
      return arrayReduce(actions, function(result, action) {
        return action.func.apply(action.thisArg, arrayPush([result], action.args));
      }, result);
    }

    /**
     * The base implementation of methods like `_.xor`, without support for
     * iteratee shorthands, that accepts an array of arrays to inspect.
     *
     * @private
     * @param {Array} arrays The arrays to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of values.
     */
    function baseXor(arrays, iteratee, comparator) {
      var length = arrays.length;
      if (length < 2) {
        return length ? baseUniq(arrays[0]) : [];
      }
      var index = -1,
          result = Array(length);

      while (++index < length) {
        var array = arrays[index],
            othIndex = -1;

        while (++othIndex < length) {
          if (othIndex != index) {
            result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);
          }
        }
      }
      return baseUniq(baseFlatten(result, 1), iteratee, comparator);
    }

    /**
     * This base implementation of `_.zipObject` which assigns values using `assignFunc`.
     *
     * @private
     * @param {Array} props The property identifiers.
     * @param {Array} values The property values.
     * @param {Function} assignFunc The function to assign values.
     * @returns {Object} Returns the new object.
     */
    function baseZipObject(props, values, assignFunc) {
      var index = -1,
          length = props.length,
          valsLength = values.length,
          result = {};

      while (++index < length) {
        var value = index < valsLength ? values[index] : undefined;
        assignFunc(result, props[index], value);
      }
      return result;
    }

    /**
     * Casts `value` to an empty array if it's not an array like object.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {Array|Object} Returns the cast array-like object.
     */
    function castArrayLikeObject(value) {
      return isArrayLikeObject(value) ? value : [];
    }

    /**
     * Casts `value` to `identity` if it's not a function.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {Function} Returns cast function.
     */
    function castFunction(value) {
      return typeof value == 'function' ? value : identity;
    }

    /**
     * Casts `value` to a path array if it's not one.
     *
     * @private
     * @param {*} value The value to inspect.
     * @param {Object} [object] The object to query keys on.
     * @returns {Array} Returns the cast property path array.
     */
    function castPath(value, object) {
      if (isArray(value)) {
        return value;
      }
      return isKey(value, object) ? [value] : stringToPath(toString(value));
    }

    /**
     * A `baseRest` alias which can be replaced with `identity` by module
     * replacement plugins.
     *
     * @private
     * @type {Function}
     * @param {Function} func The function to apply a rest parameter to.
     * @returns {Function} Returns the new function.
     */
    var castRest = baseRest;

    /**
     * Casts `array` to a slice if it's needed.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {number} start The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the cast slice.
     */
    function castSlice(array, start, end) {
      var length = array.length;
      end = end === undefined ? length : end;
      return (!start && end >= length) ? array : baseSlice(array, start, end);
    }

    /**
     * A simple wrapper around the global [`clearTimeout`](https://mdn.io/clearTimeout).
     *
     * @private
     * @param {number|Object} id The timer id or timeout object of the timer to clear.
     */
    var clearTimeout = ctxClearTimeout || function(id) {
      return root.clearTimeout(id);
    };

    /**
     * Creates a clone of  `buffer`.
     *
     * @private
     * @param {Buffer} buffer The buffer to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Buffer} Returns the cloned buffer.
     */
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var length = buffer.length,
          result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

      buffer.copy(result);
      return result;
    }

    /**
     * Creates a clone of `arrayBuffer`.
     *
     * @private
     * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
     * @returns {ArrayBuffer} Returns the cloned array buffer.
     */
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array(result).set(new Uint8Array(arrayBuffer));
      return result;
    }

    /**
     * Creates a clone of `dataView`.
     *
     * @private
     * @param {Object} dataView The data view to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned data view.
     */
    function cloneDataView(dataView, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }

    /**
     * Creates a clone of `regexp`.
     *
     * @private
     * @param {Object} regexp The regexp to clone.
     * @returns {Object} Returns the cloned regexp.
     */
    function cloneRegExp(regexp) {
      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
      result.lastIndex = regexp.lastIndex;
      return result;
    }

    /**
     * Creates a clone of the `symbol` object.
     *
     * @private
     * @param {Object} symbol The symbol object to clone.
     * @returns {Object} Returns the cloned symbol object.
     */
    function cloneSymbol(symbol) {
      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
    }

    /**
     * Creates a clone of `typedArray`.
     *
     * @private
     * @param {Object} typedArray The typed array to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned typed array.
     */
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }

    /**
     * Compares values to sort them in ascending order.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {number} Returns the sort order indicator for `value`.
     */
    function compareAscending(value, other) {
      if (value !== other) {
        var valIsDefined = value !== undefined,
            valIsNull = value === null,
            valIsReflexive = value === value,
            valIsSymbol = isSymbol(value);

        var othIsDefined = other !== undefined,
            othIsNull = other === null,
            othIsReflexive = other === other,
            othIsSymbol = isSymbol(other);

        if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
            (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
            (valIsNull && othIsDefined && othIsReflexive) ||
            (!valIsDefined && othIsReflexive) ||
            !valIsReflexive) {
          return 1;
        }
        if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
            (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
            (othIsNull && valIsDefined && valIsReflexive) ||
            (!othIsDefined && valIsReflexive) ||
            !othIsReflexive) {
          return -1;
        }
      }
      return 0;
    }

    /**
     * Used by `_.orderBy` to compare multiple properties of a value to another
     * and stable sort them.
     *
     * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
     * specify an order of "desc" for descending or "asc" for ascending sort order
     * of corresponding values.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {boolean[]|string[]} orders The order to sort by for each property.
     * @returns {number} Returns the sort order indicator for `object`.
     */
    function compareMultiple(object, other, orders) {
      var index = -1,
          objCriteria = object.criteria,
          othCriteria = other.criteria,
          length = objCriteria.length,
          ordersLength = orders.length;

      while (++index < length) {
        var result = compareAscending(objCriteria[index], othCriteria[index]);
        if (result) {
          if (index >= ordersLength) {
            return result;
          }
          var order = orders[index];
          return result * (order == 'desc' ? -1 : 1);
        }
      }
      // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
      // that causes it, under certain circumstances, to provide the same value for
      // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
      // for more details.
      //
      // This also ensures a stable sort in V8 and other engines.
      // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
      return object.index - other.index;
    }

    /**
     * Creates an array that is the composition of partially applied arguments,
     * placeholders, and provided arguments into a single array of arguments.
     *
     * @private
     * @param {Array} args The provided arguments.
     * @param {Array} partials The arguments to prepend to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @params {boolean} [isCurried] Specify composing for a curried function.
     * @returns {Array} Returns the new array of composed arguments.
     */
    function composeArgs(args, partials, holders, isCurried) {
      var argsIndex = -1,
          argsLength = args.length,
          holdersLength = holders.length,
          leftIndex = -1,
          leftLength = partials.length,
          rangeLength = nativeMax(argsLength - holdersLength, 0),
          result = Array(leftLength + rangeLength),
          isUncurried = !isCurried;

      while (++leftIndex < leftLength) {
        result[leftIndex] = partials[leftIndex];
      }
      while (++argsIndex < holdersLength) {
        if (isUncurried || argsIndex < argsLength) {
          result[holders[argsIndex]] = args[argsIndex];
        }
      }
      while (rangeLength--) {
        result[leftIndex++] = args[argsIndex++];
      }
      return result;
    }

    /**
     * This function is like `composeArgs` except that the arguments composition
     * is tailored for `_.partialRight`.
     *
     * @private
     * @param {Array} args The provided arguments.
     * @param {Array} partials The arguments to append to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @params {boolean} [isCurried] Specify composing for a curried function.
     * @returns {Array} Returns the new array of composed arguments.
     */
    function composeArgsRight(args, partials, holders, isCurried) {
      var argsIndex = -1,
          argsLength = args.length,
          holdersIndex = -1,
          holdersLength = holders.length,
          rightIndex = -1,
          rightLength = partials.length,
          rangeLength = nativeMax(argsLength - holdersLength, 0),
          result = Array(rangeLength + rightLength),
          isUncurried = !isCurried;

      while (++argsIndex < rangeLength) {
        result[argsIndex] = args[argsIndex];
      }
      var offset = argsIndex;
      while (++rightIndex < rightLength) {
        result[offset + rightIndex] = partials[rightIndex];
      }
      while (++holdersIndex < holdersLength) {
        if (isUncurried || argsIndex < argsLength) {
          result[offset + holders[holdersIndex]] = args[argsIndex++];
        }
      }
      return result;
    }

    /**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */
    function copyArray(source, array) {
      var index = -1,
          length = source.length;

      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }

    /**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property identifiers to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @param {Function} [customizer] The function to customize copied values.
     * @returns {Object} Returns `object`.
     */
    function copyObject(source, props, object, customizer) {
      var isNew = !object;
      object || (object = {});

      var index = -1,
          length = props.length;

      while (++index < length) {
        var key = props[index];

        var newValue = customizer
          ? customizer(object[key], source[key], key, object, source)
          : undefined;

        if (newValue === undefined) {
          newValue = source[key];
        }
        if (isNew) {
          baseAssignValue(object, key, newValue);
        } else {
          assignValue(object, key, newValue);
        }
      }
      return object;
    }

    /**
     * Copies own symbols of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */
    function copySymbols(source, object) {
      return copyObject(source, getSymbols(source), object);
    }

    /**
     * Copies own and inherited symbols of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */
    function copySymbolsIn(source, object) {
      return copyObject(source, getSymbolsIn(source), object);
    }

    /**
     * Creates a function like `_.groupBy`.
     *
     * @private
     * @param {Function} setter The function to set accumulator values.
     * @param {Function} [initializer] The accumulator object initializer.
     * @returns {Function} Returns the new aggregator function.
     */
    function createAggregator(setter, initializer) {
      return function(collection, iteratee) {
        var func = isArray(collection) ? arrayAggregator : baseAggregator,
            accumulator = initializer ? initializer() : {};

        return func(collection, setter, getIteratee(iteratee, 2), accumulator);
      };
    }

    /**
     * Creates a function like `_.assign`.
     *
     * @private
     * @param {Function} assigner The function to assign values.
     * @returns {Function} Returns the new assigner function.
     */
    function createAssigner(assigner) {
      return baseRest(function(object, sources) {
        var index = -1,
            length = sources.length,
            customizer = length > 1 ? sources[length - 1] : undefined,
            guard = length > 2 ? sources[2] : undefined;

        customizer = (assigner.length > 3 && typeof customizer == 'function')
          ? (length--, customizer)
          : undefined;

        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? undefined : customizer;
          length = 1;
        }
        object = Object(object);
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, index, customizer);
          }
        }
        return object;
      });
    }

    /**
     * Creates a `baseEach` or `baseEachRight` function.
     *
     * @private
     * @param {Function} eachFunc The function to iterate over a collection.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseEach(eachFunc, fromRight) {
      return function(collection, iteratee) {
        if (collection == null) {
          return collection;
        }
        if (!isArrayLike(collection)) {
          return eachFunc(collection, iteratee);
        }
        var length = collection.length,
            index = fromRight ? length : -1,
            iterable = Object(collection);

        while ((fromRight ? index-- : ++index < length)) {
          if (iteratee(iterable[index], index, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    }

    /**
     * Creates a base function for methods like `_.forIn` and `_.forOwn`.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index = -1,
            iterable = Object(object),
            props = keysFunc(object),
            length = props.length;

        while (length--) {
          var key = props[fromRight ? length : ++index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }

    /**
     * Creates a function that wraps `func` to invoke it with the optional `this`
     * binding of `thisArg`.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createBind(func, bitmask, thisArg) {
      var isBind = bitmask & WRAP_BIND_FLAG,
          Ctor = createCtor(func);

      function wrapper() {
        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        return fn.apply(isBind ? thisArg : this, arguments);
      }
      return wrapper;
    }

    /**
     * Creates a function like `_.lowerFirst`.
     *
     * @private
     * @param {string} methodName The name of the `String` case method to use.
     * @returns {Function} Returns the new case function.
     */
    function createCaseFirst(methodName) {
      return function(string) {
        string = toString(string);

        var strSymbols = hasUnicode(string)
          ? stringToArray(string)
          : undefined;

        var chr = strSymbols
          ? strSymbols[0]
          : string.charAt(0);

        var trailing = strSymbols
          ? castSlice(strSymbols, 1).join('')
          : string.slice(1);

        return chr[methodName]() + trailing;
      };
    }

    /**
     * Creates a function like `_.camelCase`.
     *
     * @private
     * @param {Function} callback The function to combine each word.
     * @returns {Function} Returns the new compounder function.
     */
    function createCompounder(callback) {
      return function(string) {
        return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
      };
    }

    /**
     * Creates a function that produces an instance of `Ctor` regardless of
     * whether it was invoked as part of a `new` expression or by `call` or `apply`.
     *
     * @private
     * @param {Function} Ctor The constructor to wrap.
     * @returns {Function} Returns the new wrapped function.
     */
    function createCtor(Ctor) {
      return function() {
        // Use a `switch` statement to work with class constructors. See
        // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
        // for more details.
        var args = arguments;
        switch (args.length) {
          case 0: return new Ctor;
          case 1: return new Ctor(args[0]);
          case 2: return new Ctor(args[0], args[1]);
          case 3: return new Ctor(args[0], args[1], args[2]);
          case 4: return new Ctor(args[0], args[1], args[2], args[3]);
          case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
          case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
          case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
        }
        var thisBinding = baseCreate(Ctor.prototype),
            result = Ctor.apply(thisBinding, args);

        // Mimic the constructor's `return` behavior.
        // See https://es5.github.io/#x13.2.2 for more details.
        return isObject(result) ? result : thisBinding;
      };
    }

    /**
     * Creates a function that wraps `func` to enable currying.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {number} arity The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createCurry(func, bitmask, arity) {
      var Ctor = createCtor(func);

      function wrapper() {
        var length = arguments.length,
            args = Array(length),
            index = length,
            placeholder = getHolder(wrapper);

        while (index--) {
          args[index] = arguments[index];
        }
        var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
          ? []
          : replaceHolders(args, placeholder);

        length -= holders.length;
        if (length < arity) {
          return createRecurry(
            func, bitmask, createHybrid, wrapper.placeholder, undefined,
            args, holders, undefined, undefined, arity - length);
        }
        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        return apply(fn, this, args);
      }
      return wrapper;
    }

    /**
     * Creates a `_.find` or `_.findLast` function.
     *
     * @private
     * @param {Function} findIndexFunc The function to find the collection index.
     * @returns {Function} Returns the new find function.
     */
    function createFind(findIndexFunc) {
      return function(collection, predicate, fromIndex) {
        var iterable = Object(collection);
        if (!isArrayLike(collection)) {
          var iteratee = getIteratee(predicate, 3);
          collection = keys(collection);
          predicate = function(key) { return iteratee(iterable[key], key, iterable); };
        }
        var index = findIndexFunc(collection, predicate, fromIndex);
        return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
      };
    }

    /**
     * Creates a `_.flow` or `_.flowRight` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new flow function.
     */
    function createFlow(fromRight) {
      return flatRest(function(funcs) {
        var length = funcs.length,
            index = length,
            prereq = LodashWrapper.prototype.thru;

        if (fromRight) {
          funcs.reverse();
        }
        while (index--) {
          var func = funcs[index];
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          if (prereq && !wrapper && getFuncName(func) == 'wrapper') {
            var wrapper = new LodashWrapper([], true);
          }
        }
        index = wrapper ? index : length;
        while (++index < length) {
          func = funcs[index];

          var funcName = getFuncName(func),
              data = funcName == 'wrapper' ? getData(func) : undefined;

          if (data && isLaziable(data[0]) &&
                data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) &&
                !data[4].length && data[9] == 1
              ) {
            wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
          } else {
            wrapper = (func.length == 1 && isLaziable(func))
              ? wrapper[funcName]()
              : wrapper.thru(func);
          }
        }
        return function() {
          var args = arguments,
              value = args[0];

          if (wrapper && args.length == 1 && isArray(value)) {
            return wrapper.plant(value).value();
          }
          var index = 0,
              result = length ? funcs[index].apply(this, args) : value;

          while (++index < length) {
            result = funcs[index].call(this, result);
          }
          return result;
        };
      });
    }

    /**
     * Creates a function that wraps `func` to invoke it with optional `this`
     * binding of `thisArg`, partial application, and currying.
     *
     * @private
     * @param {Function|string} func The function or method name to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to prepend to those provided to
     *  the new function.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [partialsRight] The arguments to append to those provided
     *  to the new function.
     * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
      var isAry = bitmask & WRAP_ARY_FLAG,
          isBind = bitmask & WRAP_BIND_FLAG,
          isBindKey = bitmask & WRAP_BIND_KEY_FLAG,
          isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
          isFlip = bitmask & WRAP_FLIP_FLAG,
          Ctor = isBindKey ? undefined : createCtor(func);

      function wrapper() {
        var length = arguments.length,
            args = Array(length),
            index = length;

        while (index--) {
          args[index] = arguments[index];
        }
        if (isCurried) {
          var placeholder = getHolder(wrapper),
              holdersCount = countHolders(args, placeholder);
        }
        if (partials) {
          args = composeArgs(args, partials, holders, isCurried);
        }
        if (partialsRight) {
          args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
        }
        length -= holdersCount;
        if (isCurried && length < arity) {
          var newHolders = replaceHolders(args, placeholder);
          return createRecurry(
            func, bitmask, createHybrid, wrapper.placeholder, thisArg,
            args, newHolders, argPos, ary, arity - length
          );
        }
        var thisBinding = isBind ? thisArg : this,
            fn = isBindKey ? thisBinding[func] : func;

        length = args.length;
        if (argPos) {
          args = reorder(args, argPos);
        } else if (isFlip && length > 1) {
          args.reverse();
        }
        if (isAry && ary < length) {
          args.length = ary;
        }
        if (this && this !== root && this instanceof wrapper) {
          fn = Ctor || createCtor(fn);
        }
        return fn.apply(thisBinding, args);
      }
      return wrapper;
    }

    /**
     * Creates a function like `_.invertBy`.
     *
     * @private
     * @param {Function} setter The function to set accumulator values.
     * @param {Function} toIteratee The function to resolve iteratees.
     * @returns {Function} Returns the new inverter function.
     */
    function createInverter(setter, toIteratee) {
      return function(object, iteratee) {
        return baseInverter(object, setter, toIteratee(iteratee), {});
      };
    }

    /**
     * Creates a function that performs a mathematical operation on two values.
     *
     * @private
     * @param {Function} operator The function to perform the operation.
     * @param {number} [defaultValue] The value used for `undefined` arguments.
     * @returns {Function} Returns the new mathematical operation function.
     */
    function createMathOperation(operator, defaultValue) {
      return function(value, other) {
        var result;
        if (value === undefined && other === undefined) {
          return defaultValue;
        }
        if (value !== undefined) {
          result = value;
        }
        if (other !== undefined) {
          if (result === undefined) {
            return other;
          }
          if (typeof value == 'string' || typeof other == 'string') {
            value = baseToString(value);
            other = baseToString(other);
          } else {
            value = baseToNumber(value);
            other = baseToNumber(other);
          }
          result = operator(value, other);
        }
        return result;
      };
    }

    /**
     * Creates a function like `_.over`.
     *
     * @private
     * @param {Function} arrayFunc The function to iterate over iteratees.
     * @returns {Function} Returns the new over function.
     */
    function createOver(arrayFunc) {
      return flatRest(function(iteratees) {
        iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
        return baseRest(function(args) {
          var thisArg = this;
          return arrayFunc(iteratees, function(iteratee) {
            return apply(iteratee, thisArg, args);
          });
        });
      });
    }

    /**
     * Creates the padding for `string` based on `length`. The `chars` string
     * is truncated if the number of characters exceeds `length`.
     *
     * @private
     * @param {number} length The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padding for `string`.
     */
    function createPadding(length, chars) {
      chars = chars === undefined ? ' ' : baseToString(chars);

      var charsLength = chars.length;
      if (charsLength < 2) {
        return charsLength ? baseRepeat(chars, length) : chars;
      }
      var result = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
      return hasUnicode(chars)
        ? castSlice(stringToArray(result), 0, length).join('')
        : result.slice(0, length);
    }

    /**
     * Creates a function that wraps `func` to invoke it with the `this` binding
     * of `thisArg` and `partials` prepended to the arguments it receives.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} partials The arguments to prepend to those provided to
     *  the new function.
     * @returns {Function} Returns the new wrapped function.
     */
    function createPartial(func, bitmask, thisArg, partials) {
      var isBind = bitmask & WRAP_BIND_FLAG,
          Ctor = createCtor(func);

      function wrapper() {
        var argsIndex = -1,
            argsLength = arguments.length,
            leftIndex = -1,
            leftLength = partials.length,
            args = Array(leftLength + argsLength),
            fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

        while (++leftIndex < leftLength) {
          args[leftIndex] = partials[leftIndex];
        }
        while (argsLength--) {
          args[leftIndex++] = arguments[++argsIndex];
        }
        return apply(fn, isBind ? thisArg : this, args);
      }
      return wrapper;
    }

    /**
     * Creates a `_.range` or `_.rangeRight` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new range function.
     */
    function createRange(fromRight) {
      return function(start, end, step) {
        if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
          end = step = undefined;
        }
        // Ensure the sign of `-0` is preserved.
        start = toFinite(start);
        if (end === undefined) {
          end = start;
          start = 0;
        } else {
          end = toFinite(end);
        }
        step = step === undefined ? (start < end ? 1 : -1) : toFinite(step);
        return baseRange(start, end, step, fromRight);
      };
    }

    /**
     * Creates a function that performs a relational operation on two values.
     *
     * @private
     * @param {Function} operator The function to perform the operation.
     * @returns {Function} Returns the new relational operation function.
     */
    function createRelationalOperation(operator) {
      return function(value, other) {
        if (!(typeof value == 'string' && typeof other == 'string')) {
          value = toNumber(value);
          other = toNumber(other);
        }
        return operator(value, other);
      };
    }

    /**
     * Creates a function that wraps `func` to continue currying.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {Function} wrapFunc The function to create the `func` wrapper.
     * @param {*} placeholder The placeholder value.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to prepend to those provided to
     *  the new function.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
      var isCurry = bitmask & WRAP_CURRY_FLAG,
          newHolders = isCurry ? holders : undefined,
          newHoldersRight = isCurry ? undefined : holders,
          newPartials = isCurry ? partials : undefined,
          newPartialsRight = isCurry ? undefined : partials;

      bitmask |= (isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG);
      bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);

      if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
        bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
      }
      var newData = [
        func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
        newHoldersRight, argPos, ary, arity
      ];

      var result = wrapFunc.apply(undefined, newData);
      if (isLaziable(func)) {
        setData(result, newData);
      }
      result.placeholder = placeholder;
      return setWrapToString(result, func, bitmask);
    }

    /**
     * Creates a function like `_.round`.
     *
     * @private
     * @param {string} methodName The name of the `Math` method to use when rounding.
     * @returns {Function} Returns the new round function.
     */
    function createRound(methodName) {
      var func = Math[methodName];
      return function(number, precision) {
        number = toNumber(number);
        precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
        if (precision && nativeIsFinite(number)) {
          // Shift with exponential notation to avoid floating-point issues.
          // See [MDN](https://mdn.io/round#Examples) for more details.
          var pair = (toString(number) + 'e').split('e'),
              value = func(pair[0] + 'e' + (+pair[1] + precision));

          pair = (toString(value) + 'e').split('e');
          return +(pair[0] + 'e' + (+pair[1] - precision));
        }
        return func(number);
      };
    }

    /**
     * Creates a set object of `values`.
     *
     * @private
     * @param {Array} values The values to add to the set.
     * @returns {Object} Returns the new set.
     */
    var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
      return new Set(values);
    };

    /**
     * Creates a `_.toPairs` or `_.toPairsIn` function.
     *
     * @private
     * @param {Function} keysFunc The function to get the keys of a given object.
     * @returns {Function} Returns the new pairs function.
     */
    function createToPairs(keysFunc) {
      return function(object) {
        var tag = getTag(object);
        if (tag == mapTag) {
          return mapToArray(object);
        }
        if (tag == setTag) {
          return setToPairs(object);
        }
        return baseToPairs(object, keysFunc(object));
      };
    }

    /**
     * Creates a function that either curries or invokes `func` with optional
     * `this` binding and partially applied arguments.
     *
     * @private
     * @param {Function|string} func The function or method name to wrap.
     * @param {number} bitmask The bitmask flags.
     *    1 - `_.bind`
     *    2 - `_.bindKey`
     *    4 - `_.curry` or `_.curryRight` of a bound function
     *    8 - `_.curry`
     *   16 - `_.curryRight`
     *   32 - `_.partial`
     *   64 - `_.partialRight`
     *  128 - `_.rearg`
     *  256 - `_.ary`
     *  512 - `_.flip`
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to be partially applied.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
      var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
      if (!isBindKey && typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var length = partials ? partials.length : 0;
      if (!length) {
        bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
        partials = holders = undefined;
      }
      ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
      arity = arity === undefined ? arity : toInteger(arity);
      length -= holders ? holders.length : 0;

      if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
        var partialsRight = partials,
            holdersRight = holders;

        partials = holders = undefined;
      }
      var data = isBindKey ? undefined : getData(func);

      var newData = [
        func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
        argPos, ary, arity
      ];

      if (data) {
        mergeData(newData, data);
      }
      func = newData[0];
      bitmask = newData[1];
      thisArg = newData[2];
      partials = newData[3];
      holders = newData[4];
      arity = newData[9] = newData[9] === undefined
        ? (isBindKey ? 0 : func.length)
        : nativeMax(newData[9] - length, 0);

      if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
        bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
      }
      if (!bitmask || bitmask == WRAP_BIND_FLAG) {
        var result = createBind(func, bitmask, thisArg);
      } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
        result = createCurry(func, bitmask, arity);
      } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
        result = createPartial(func, bitmask, thisArg, partials);
      } else {
        result = createHybrid.apply(undefined, newData);
      }
      var setter = data ? baseSetData : setData;
      return setWrapToString(setter(result, newData), func, bitmask);
    }

    /**
     * Used by `_.defaults` to customize its `_.assignIn` use to assign properties
     * of source objects to the destination object for all destination properties
     * that resolve to `undefined`.
     *
     * @private
     * @param {*} objValue The destination value.
     * @param {*} srcValue The source value.
     * @param {string} key The key of the property to assign.
     * @param {Object} object The parent object of `objValue`.
     * @returns {*} Returns the value to assign.
     */
    function customDefaultsAssignIn(objValue, srcValue, key, object) {
      if (objValue === undefined ||
          (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
        return srcValue;
      }
      return objValue;
    }

    /**
     * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
     * objects into destination objects that are passed thru.
     *
     * @private
     * @param {*} objValue The destination value.
     * @param {*} srcValue The source value.
     * @param {string} key The key of the property to merge.
     * @param {Object} object The parent object of `objValue`.
     * @param {Object} source The parent object of `srcValue`.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     * @returns {*} Returns the value to assign.
     */
    function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
      if (isObject(objValue) && isObject(srcValue)) {
        // Recursively merge objects and arrays (susceptible to call stack limits).
        stack.set(srcValue, objValue);
        baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
        stack['delete'](srcValue);
      }
      return objValue;
    }

    /**
     * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
     * objects.
     *
     * @private
     * @param {*} value The value to inspect.
     * @param {string} key The key of the property to inspect.
     * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
     */
    function customOmitClone(value) {
      return isPlainObject(value) ? undefined : value;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for arrays with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Array} array The array to compare.
     * @param {Array} other The other array to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `array` and `other` objects.
     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
     */
    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
          arrLength = array.length,
          othLength = other.length;

      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(array);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var index = -1,
          result = true,
          seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

      stack.set(array, other);
      stack.set(other, array);

      // Ignore non-index properties.
      while (++index < arrLength) {
        var arrValue = array[index],
            othValue = other[index];

        if (customizer) {
          var compared = isPartial
            ? customizer(othValue, arrValue, index, other, array, stack)
            : customizer(arrValue, othValue, index, array, other, stack);
        }
        if (compared !== undefined) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        // Recursively compare arrays (susceptible to call stack limits).
        if (seen) {
          if (!arraySome(other, function(othValue, othIndex) {
                if (!cacheHas(seen, othIndex) &&
                    (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                  return seen.push(othIndex);
                }
              })) {
            result = false;
            break;
          }
        } else if (!(
              arrValue === othValue ||
                equalFunc(arrValue, othValue, bitmask, customizer, stack)
            )) {
          result = false;
          break;
        }
      }
      stack['delete'](array);
      stack['delete'](other);
      return result;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for comparing objects of
     * the same `toStringTag`.
     *
     * **Note:** This function only supports comparing values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {string} tag The `toStringTag` of the objects to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
      switch (tag) {
        case dataViewTag:
          if ((object.byteLength != other.byteLength) ||
              (object.byteOffset != other.byteOffset)) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;

        case arrayBufferTag:
          if ((object.byteLength != other.byteLength) ||
              !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
            return false;
          }
          return true;

        case boolTag:
        case dateTag:
        case numberTag:
          // Coerce booleans to `1` or `0` and dates to milliseconds.
          // Invalid dates are coerced to `NaN`.
          return eq(+object, +other);

        case errorTag:
          return object.name == other.name && object.message == other.message;

        case regexpTag:
        case stringTag:
          // Coerce regexes to strings and treat strings, primitives and objects,
          // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
          // for more details.
          return object == (other + '');

        case mapTag:
          var convert = mapToArray;

        case setTag:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
          convert || (convert = setToArray);

          if (object.size != other.size && !isPartial) {
            return false;
          }
          // Assume cyclic values are equal.
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= COMPARE_UNORDERED_FLAG;

          // Recursively compare objects (susceptible to call stack limits).
          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
          stack['delete'](object);
          return result;

        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for objects with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
          objProps = getAllKeys(object),
          objLength = objProps.length,
          othProps = getAllKeys(other),
          othLength = othProps.length;

      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var result = true;
      stack.set(object, other);
      stack.set(other, object);

      var skipCtor = isPartial;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key],
            othValue = other[key];

        if (customizer) {
          var compared = isPartial
            ? customizer(othValue, objValue, key, other, object, stack)
            : customizer(objValue, othValue, key, object, other, stack);
        }
        // Recursively compare objects (susceptible to call stack limits).
        if (!(compared === undefined
              ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
              : compared
            )) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == 'constructor');
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor,
            othCtor = other.constructor;

        // Non `Object` object instances with different constructors are not equal.
        if (objCtor != othCtor &&
            ('constructor' in object && 'constructor' in other) &&
            !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
              typeof othCtor == 'function' && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack['delete'](object);
      stack['delete'](other);
      return result;
    }

    /**
     * A specialized version of `baseRest` which flattens the rest array.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @returns {Function} Returns the new function.
     */
    function flatRest(func) {
      return setToString(overRest(func, undefined, flatten), func + '');
    }

    /**
     * Creates an array of own enumerable property names and symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }

    /**
     * Creates an array of own and inherited enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeysIn(object) {
      return baseGetAllKeys(object, keysIn, getSymbolsIn);
    }

    /**
     * Gets metadata for `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {*} Returns the metadata for `func`.
     */
    var getData = !metaMap ? noop : function(func) {
      return metaMap.get(func);
    };

    /**
     * Gets the name of `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {string} Returns the function name.
     */
    function getFuncName(func) {
      var result = (func.name + ''),
          array = realNames[result],
          length = hasOwnProperty.call(realNames, result) ? array.length : 0;

      while (length--) {
        var data = array[length],
            otherFunc = data.func;
        if (otherFunc == null || otherFunc == func) {
          return data.name;
        }
      }
      return result;
    }

    /**
     * Gets the argument placeholder value for `func`.
     *
     * @private
     * @param {Function} func The function to inspect.
     * @returns {*} Returns the placeholder value.
     */
    function getHolder(func) {
      var object = hasOwnProperty.call(lodash, 'placeholder') ? lodash : func;
      return object.placeholder;
    }

    /**
     * Gets the appropriate "iteratee" function. If `_.iteratee` is customized,
     * this function returns the custom method, otherwise it returns `baseIteratee`.
     * If arguments are provided, the chosen function is invoked with them and
     * its result is returned.
     *
     * @private
     * @param {*} [value] The value to convert to an iteratee.
     * @param {number} [arity] The arity of the created iteratee.
     * @returns {Function} Returns the chosen function or its result.
     */
    function getIteratee() {
      var result = lodash.iteratee || iteratee;
      result = result === iteratee ? baseIteratee : result;
      return arguments.length ? result(arguments[0], arguments[1]) : result;
    }

    /**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key)
        ? data[typeof key == 'string' ? 'string' : 'hash']
        : data.map;
    }

    /**
     * Gets the property names, values, and compare flags of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the match data of `object`.
     */
    function getMatchData(object) {
      var result = keys(object),
          length = result.length;

      while (length--) {
        var key = result[length],
            value = object[key];

        result[length] = [key, value, isStrictComparable(value)];
      }
      return result;
    }

    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : undefined;
    }

    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag),
          tag = value[symToStringTag];

      try {
        value[symToStringTag] = undefined;
        var unmasked = true;
      } catch (e) {}

      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }

    /**
     * Creates an array of the own enumerable symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */
    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
      });
    };

    /**
     * Creates an array of the own and inherited enumerable symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */
    var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
      var result = [];
      while (object) {
        arrayPush(result, getSymbols(object));
        object = getPrototype(object);
      }
      return result;
    };

    /**
     * Gets the `toStringTag` of `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    var getTag = baseGetTag;

    // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
    if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
        (Map && getTag(new Map) != mapTag) ||
        (Promise && getTag(Promise.resolve()) != promiseTag) ||
        (Set && getTag(new Set) != setTag) ||
        (WeakMap && getTag(new WeakMap) != weakMapTag)) {
      getTag = function(value) {
        var result = baseGetTag(value),
            Ctor = result == objectTag ? value.constructor : undefined,
            ctorString = Ctor ? toSource(Ctor) : '';

        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString: return dataViewTag;
            case mapCtorString: return mapTag;
            case promiseCtorString: return promiseTag;
            case setCtorString: return setTag;
            case weakMapCtorString: return weakMapTag;
          }
        }
        return result;
      };
    }

    /**
     * Gets the view, applying any `transforms` to the `start` and `end` positions.
     *
     * @private
     * @param {number} start The start of the view.
     * @param {number} end The end of the view.
     * @param {Array} transforms The transformations to apply to the view.
     * @returns {Object} Returns an object containing the `start` and `end`
     *  positions of the view.
     */
    function getView(start, end, transforms) {
      var index = -1,
          length = transforms.length;

      while (++index < length) {
        var data = transforms[index],
            size = data.size;

        switch (data.type) {
          case 'drop':      start += size; break;
          case 'dropRight': end -= size; break;
          case 'take':      end = nativeMin(end, start + size); break;
          case 'takeRight': start = nativeMax(start, end - size); break;
        }
      }
      return { 'start': start, 'end': end };
    }

    /**
     * Extracts wrapper details from the `source` body comment.
     *
     * @private
     * @param {string} source The source to inspect.
     * @returns {Array} Returns the wrapper details.
     */
    function getWrapDetails(source) {
      var match = source.match(reWrapDetails);
      return match ? match[1].split(reSplitDetails) : [];
    }

    /**
     * Checks if `path` exists on `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @param {Function} hasFunc The function to check properties.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     */
    function hasPath(object, path, hasFunc) {
      path = castPath(path, object);

      var index = -1,
          length = path.length,
          result = false;

      while (++index < length) {
        var key = toKey(path[index]);
        if (!(result = object != null && hasFunc(object, key))) {
          break;
        }
        object = object[key];
      }
      if (result || ++index != length) {
        return result;
      }
      length = object == null ? 0 : object.length;
      return !!length && isLength(length) && isIndex(key, length) &&
        (isArray(object) || isArguments(object));
    }

    /**
     * Initializes an array clone.
     *
     * @private
     * @param {Array} array The array to clone.
     * @returns {Array} Returns the initialized clone.
     */
    function initCloneArray(array) {
      var length = array.length,
          result = new array.constructor(length);

      // Add properties assigned by `RegExp#exec`.
      if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
        result.index = array.index;
        result.input = array.input;
      }
      return result;
    }

    /**
     * Initializes an object clone.
     *
     * @private
     * @param {Object} object The object to clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneObject(object) {
      return (typeof object.constructor == 'function' && !isPrototype(object))
        ? baseCreate(getPrototype(object))
        : {};
    }

    /**
     * Initializes an object clone based on its `toStringTag`.
     *
     * **Note:** This function only supports cloning values with tags of
     * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
     *
     * @private
     * @param {Object} object The object to clone.
     * @param {string} tag The `toStringTag` of the object to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneByTag(object, tag, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag:
          return cloneArrayBuffer(object);

        case boolTag:
        case dateTag:
          return new Ctor(+object);

        case dataViewTag:
          return cloneDataView(object, isDeep);

        case float32Tag: case float64Tag:
        case int8Tag: case int16Tag: case int32Tag:
        case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
          return cloneTypedArray(object, isDeep);

        case mapTag:
          return new Ctor;

        case numberTag:
        case stringTag:
          return new Ctor(object);

        case regexpTag:
          return cloneRegExp(object);

        case setTag:
          return new Ctor;

        case symbolTag:
          return cloneSymbol(object);
      }
    }

    /**
     * Inserts wrapper `details` in a comment at the top of the `source` body.
     *
     * @private
     * @param {string} source The source to modify.
     * @returns {Array} details The details to insert.
     * @returns {string} Returns the modified source.
     */
    function insertWrapDetails(source, details) {
      var length = details.length;
      if (!length) {
        return source;
      }
      var lastIndex = length - 1;
      details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
      details = details.join(length > 2 ? ', ' : ' ');
      return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
    }

    /**
     * Checks if `value` is a flattenable `arguments` object or array.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
     */
    function isFlattenable(value) {
      return isArray(value) || isArguments(value) ||
        !!(spreadableSymbol && value && value[spreadableSymbol]);
    }

    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;

      return !!length &&
        (type == 'number' ||
          (type != 'symbol' && reIsUint.test(value))) &&
            (value > -1 && value % 1 == 0 && value < length);
    }

    /**
     * Checks if the given arguments are from an iteratee call.
     *
     * @private
     * @param {*} value The potential iteratee value argument.
     * @param {*} index The potential iteratee index or key argument.
     * @param {*} object The potential iteratee object argument.
     * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
     *  else `false`.
     */
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index;
      if (type == 'number'
            ? (isArrayLike(object) && isIndex(index, object.length))
            : (type == 'string' && index in object)
          ) {
        return eq(object[index], value);
      }
      return false;
    }

    /**
     * Checks if `value` is a property name and not a property path.
     *
     * @private
     * @param {*} value The value to check.
     * @param {Object} [object] The object to query keys on.
     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
     */
    function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }
      var type = typeof value;
      if (type == 'number' || type == 'symbol' || type == 'boolean' ||
          value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
        (object != null && value in Object(object));
    }

    /**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */
    function isKeyable(value) {
      var type = typeof value;
      return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
        ? (value !== '__proto__')
        : (value === null);
    }

    /**
     * Checks if `func` has a lazy counterpart.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
     *  else `false`.
     */
    function isLaziable(func) {
      var funcName = getFuncName(func),
          other = lodash[funcName];

      if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
        return false;
      }
      if (func === other) {
        return true;
      }
      var data = getData(other);
      return !!data && func === data[0];
    }

    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */
    function isMasked(func) {
      return !!maskSrcKey && (maskSrcKey in func);
    }

    /**
     * Checks if `func` is capable of being masked.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `func` is maskable, else `false`.
     */
    var isMaskable = coreJsData ? isFunction : stubFalse;

    /**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */
    function isPrototype(value) {
      var Ctor = value && value.constructor,
          proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

      return value === proto;
    }

    /**
     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` if suitable for strict
     *  equality comparisons, else `false`.
     */
    function isStrictComparable(value) {
      return value === value && !isObject(value);
    }

    /**
     * A specialized version of `matchesProperty` for source values suitable
     * for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */
    function matchesStrictComparable(key, srcValue) {
      return function(object) {
        if (object == null) {
          return false;
        }
        return object[key] === srcValue &&
          (srcValue !== undefined || (key in Object(object)));
      };
    }

    /**
     * A specialized version of `_.memoize` which clears the memoized function's
     * cache when it exceeds `MAX_MEMOIZE_SIZE`.
     *
     * @private
     * @param {Function} func The function to have its output memoized.
     * @returns {Function} Returns the new memoized function.
     */
    function memoizeCapped(func) {
      var result = memoize(func, function(key) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
          cache.clear();
        }
        return key;
      });

      var cache = result.cache;
      return result;
    }

    /**
     * Merges the function metadata of `source` into `data`.
     *
     * Merging metadata reduces the number of wrappers used to invoke a function.
     * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
     * may be applied regardless of execution order. Methods like `_.ary` and
     * `_.rearg` modify function arguments, making the order in which they are
     * executed important, preventing the merging of metadata. However, we make
     * an exception for a safe combined case where curried functions have `_.ary`
     * and or `_.rearg` applied.
     *
     * @private
     * @param {Array} data The destination metadata.
     * @param {Array} source The source metadata.
     * @returns {Array} Returns `data`.
     */
    function mergeData(data, source) {
      var bitmask = data[1],
          srcBitmask = source[1],
          newBitmask = bitmask | srcBitmask,
          isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);

      var isCombo =
        ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_CURRY_FLAG)) ||
        ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_REARG_FLAG) && (data[7].length <= source[8])) ||
        ((srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG));

      // Exit early if metadata can't be merged.
      if (!(isCommon || isCombo)) {
        return data;
      }
      // Use source `thisArg` if available.
      if (srcBitmask & WRAP_BIND_FLAG) {
        data[2] = source[2];
        // Set when currying a bound function.
        newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
      }
      // Compose partial arguments.
      var value = source[3];
      if (value) {
        var partials = data[3];
        data[3] = partials ? composeArgs(partials, value, source[4]) : value;
        data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
      }
      // Compose partial right arguments.
      value = source[5];
      if (value) {
        partials = data[5];
        data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
        data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
      }
      // Use source `argPos` if available.
      value = source[7];
      if (value) {
        data[7] = value;
      }
      // Use source `ary` if it's smaller.
      if (srcBitmask & WRAP_ARY_FLAG) {
        data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
      }
      // Use source `arity` if one is not provided.
      if (data[9] == null) {
        data[9] = source[9];
      }
      // Use source `func` and merge bitmasks.
      data[0] = source[0];
      data[1] = newBitmask;

      return data;
    }

    /**
     * This function is like
     * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * except that it includes inherited enumerable properties.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function nativeKeysIn(object) {
      var result = [];
      if (object != null) {
        for (var key in Object(object)) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }

    /**
     * A specialized version of `baseRest` which transforms the rest array.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @param {Function} transform The rest array transform.
     * @returns {Function} Returns the new function.
     */
    function overRest(func, start, transform) {
      start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
      return function() {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            array = Array(length);

        while (++index < length) {
          array[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = transform(array);
        return apply(func, this, otherArgs);
      };
    }

    /**
     * Gets the parent value at `path` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} path The path to get the parent value of.
     * @returns {*} Returns the parent value.
     */
    function parent(object, path) {
      return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
    }

    /**
     * Reorder `array` according to the specified indexes where the element at
     * the first index is assigned as the first element, the element at
     * the second index is assigned as the second element, and so on.
     *
     * @private
     * @param {Array} array The array to reorder.
     * @param {Array} indexes The arranged array indexes.
     * @returns {Array} Returns `array`.
     */
    function reorder(array, indexes) {
      var arrLength = array.length,
          length = nativeMin(indexes.length, arrLength),
          oldArray = copyArray(array);

      while (length--) {
        var index = indexes[length];
        array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
      }
      return array;
    }

    /**
     * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */
    function safeGet(object, key) {
      if (key === 'constructor' && typeof object[key] === 'function') {
        return;
      }

      if (key == '__proto__') {
        return;
      }

      return object[key];
    }

    /**
     * Sets metadata for `func`.
     *
     * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
     * period of time, it will trip its breaker and transition to an identity
     * function to avoid garbage collection pauses in V8. See
     * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
     * for more details.
     *
     * @private
     * @param {Function} func The function to associate metadata with.
     * @param {*} data The metadata.
     * @returns {Function} Returns `func`.
     */
    var setData = shortOut(baseSetData);

    /**
     * A simple wrapper around the global [`setTimeout`](https://mdn.io/setTimeout).
     *
     * @private
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @returns {number|Object} Returns the timer id or timeout object.
     */
    var setTimeout = ctxSetTimeout || function(func, wait) {
      return root.setTimeout(func, wait);
    };

    /**
     * Sets the `toString` method of `func` to return `string`.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */
    var setToString = shortOut(baseSetToString);

    /**
     * Sets the `toString` method of `wrapper` to mimic the source of `reference`
     * with wrapper details in a comment at the top of the source body.
     *
     * @private
     * @param {Function} wrapper The function to modify.
     * @param {Function} reference The reference function.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @returns {Function} Returns `wrapper`.
     */
    function setWrapToString(wrapper, reference, bitmask) {
      var source = (reference + '');
      return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
    }

    /**
     * Creates a function that'll short out and invoke `identity` instead
     * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
     * milliseconds.
     *
     * @private
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new shortable function.
     */
    function shortOut(func) {
      var count = 0,
          lastCalled = 0;

      return function() {
        var stamp = nativeNow(),
            remaining = HOT_SPAN - (stamp - lastCalled);

        lastCalled = stamp;
        if (remaining > 0) {
          if (++count >= HOT_COUNT) {
            return arguments[0];
          }
        } else {
          count = 0;
        }
        return func.apply(undefined, arguments);
      };
    }

    /**
     * A specialized version of `_.shuffle` which mutates and sets the size of `array`.
     *
     * @private
     * @param {Array} array The array to shuffle.
     * @param {number} [size=array.length] The size of `array`.
     * @returns {Array} Returns `array`.
     */
    function shuffleSelf(array, size) {
      var index = -1,
          length = array.length,
          lastIndex = length - 1;

      size = size === undefined ? length : size;
      while (++index < size) {
        var rand = baseRandom(index, lastIndex),
            value = array[rand];

        array[rand] = array[index];
        array[index] = value;
      }
      array.length = size;
      return array;
    }

    /**
     * Converts `string` to a property path array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the property path array.
     */
    var stringToPath = memoizeCapped(function(string) {
      var result = [];
      if (string.charCodeAt(0) === 46 /* . */) {
        result.push('');
      }
      string.replace(rePropName, function(match, number, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
      });
      return result;
    });

    /**
     * Converts `value` to a string key if it's not a string or symbol.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {string|symbol} Returns the key.
     */
    function toKey(value) {
      if (typeof value == 'string' || isSymbol(value)) {
        return value;
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }

    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to convert.
     * @returns {string} Returns the source code.
     */
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {}
        try {
          return (func + '');
        } catch (e) {}
      }
      return '';
    }

    /**
     * Updates wrapper `details` based on `bitmask` flags.
     *
     * @private
     * @returns {Array} details The details to modify.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @returns {Array} Returns `details`.
     */
    function updateWrapDetails(details, bitmask) {
      arrayEach(wrapFlags, function(pair) {
        var value = '_.' + pair[0];
        if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
          details.push(value);
        }
      });
      return details.sort();
    }

    /**
     * Creates a clone of `wrapper`.
     *
     * @private
     * @param {Object} wrapper The wrapper to clone.
     * @returns {Object} Returns the cloned wrapper.
     */
    function wrapperClone(wrapper) {
      if (wrapper instanceof LazyWrapper) {
        return wrapper.clone();
      }
      var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
      result.__actions__ = copyArray(wrapper.__actions__);
      result.__index__  = wrapper.__index__;
      result.__values__ = wrapper.__values__;
      return result;
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates an array of elements split into groups the length of `size`.
     * If `array` can't be split evenly, the final chunk will be the remaining
     * elements.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to process.
     * @param {number} [size=1] The length of each chunk
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the new array of chunks.
     * @example
     *
     * _.chunk(['a', 'b', 'c', 'd'], 2);
     * // => [['a', 'b'], ['c', 'd']]
     *
     * _.chunk(['a', 'b', 'c', 'd'], 3);
     * // => [['a', 'b', 'c'], ['d']]
     */
    function chunk(array, size, guard) {
      if ((guard ? isIterateeCall(array, size, guard) : size === undefined)) {
        size = 1;
      } else {
        size = nativeMax(toInteger(size), 0);
      }
      var length = array == null ? 0 : array.length;
      if (!length || size < 1) {
        return [];
      }
      var index = 0,
          resIndex = 0,
          result = Array(nativeCeil(length / size));

      while (index < length) {
        result[resIndex++] = baseSlice(array, index, (index += size));
      }
      return result;
    }

    /**
     * Creates an array with all falsey values removed. The values `false`, `null`,
     * `0`, `""`, `undefined`, and `NaN` are falsey.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to compact.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.compact([0, 1, false, 2, '', 3]);
     * // => [1, 2, 3]
     */
    function compact(array) {
      var index = -1,
          length = array == null ? 0 : array.length,
          resIndex = 0,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (value) {
          result[resIndex++] = value;
        }
      }
      return result;
    }

    /**
     * Creates a new array concatenating `array` with any additional arrays
     * and/or values.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to concatenate.
     * @param {...*} [values] The values to concatenate.
     * @returns {Array} Returns the new concatenated array.
     * @example
     *
     * var array = [1];
     * var other = _.concat(array, 2, [3], [[4]]);
     *
     * console.log(other);
     * // => [1, 2, 3, [4]]
     *
     * console.log(array);
     * // => [1]
     */
    function concat() {
      var length = arguments.length;
      if (!length) {
        return [];
      }
      var args = Array(length - 1),
          array = arguments[0],
          index = length;

      while (index--) {
        args[index - 1] = arguments[index];
      }
      return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
    }

    /**
     * Creates an array of `array` values not included in the other given arrays
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons. The order and references of result values are
     * determined by the first array.
     *
     * **Note:** Unlike `_.pullAll`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @see _.without, _.xor
     * @example
     *
     * _.difference([2, 1], [2, 3]);
     * // => [1]
     */
    var difference = baseRest(function(array, values) {
      return isArrayLikeObject(array)
        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
        : [];
    });

    /**
     * This method is like `_.difference` except that it accepts `iteratee` which
     * is invoked for each element of `array` and `values` to generate the criterion
     * by which they're compared. The order and references of result values are
     * determined by the first array. The iteratee is invoked with one argument:
     * (value).
     *
     * **Note:** Unlike `_.pullAllBy`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
     * // => [1.2]
     *
     * // The `_.property` iteratee shorthand.
     * _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
     * // => [{ 'x': 2 }]
     */
    var differenceBy = baseRest(function(array, values) {
      var iteratee = last(values);
      if (isArrayLikeObject(iteratee)) {
        iteratee = undefined;
      }
      return isArrayLikeObject(array)
        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), getIteratee(iteratee, 2))
        : [];
    });

    /**
     * This method is like `_.difference` except that it accepts `comparator`
     * which is invoked to compare elements of `array` to `values`. The order and
     * references of result values are determined by the first array. The comparator
     * is invoked with two arguments: (arrVal, othVal).
     *
     * **Note:** Unlike `_.pullAllWith`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     *
     * _.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
     * // => [{ 'x': 2, 'y': 1 }]
     */
    var differenceWith = baseRest(function(array, values) {
      var comparator = last(values);
      if (isArrayLikeObject(comparator)) {
        comparator = undefined;
      }
      return isArrayLikeObject(array)
        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), undefined, comparator)
        : [];
    });

    /**
     * Creates a slice of `array` with `n` elements dropped from the beginning.
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.drop([1, 2, 3]);
     * // => [2, 3]
     *
     * _.drop([1, 2, 3], 2);
     * // => [3]
     *
     * _.drop([1, 2, 3], 5);
     * // => []
     *
     * _.drop([1, 2, 3], 0);
     * // => [1, 2, 3]
     */
    function drop(array, n, guard) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      n = (guard || n === undefined) ? 1 : toInteger(n);
      return baseSlice(array, n < 0 ? 0 : n, length);
    }

    /**
     * Creates a slice of `array` with `n` elements dropped from the end.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.dropRight([1, 2, 3]);
     * // => [1, 2]
     *
     * _.dropRight([1, 2, 3], 2);
     * // => [1]
     *
     * _.dropRight([1, 2, 3], 5);
     * // => []
     *
     * _.dropRight([1, 2, 3], 0);
     * // => [1, 2, 3]
     */
    function dropRight(array, n, guard) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      n = (guard || n === undefined) ? 1 : toInteger(n);
      n = length - n;
      return baseSlice(array, 0, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` excluding elements dropped from the end.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * invoked with three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.dropRightWhile(users, function(o) { return !o.active; });
     * // => objects for ['barney']
     *
     * // The `_.matches` iteratee shorthand.
     * _.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
     * // => objects for ['barney', 'fred']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.dropRightWhile(users, ['active', false]);
     * // => objects for ['barney']
     *
     * // The `_.property` iteratee shorthand.
     * _.dropRightWhile(users, 'active');
     * // => objects for ['barney', 'fred', 'pebbles']
     */
    function dropRightWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3), true, true)
        : [];
    }

    /**
     * Creates a slice of `array` excluding elements dropped from the beginning.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * invoked with three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.dropWhile(users, function(o) { return !o.active; });
     * // => objects for ['pebbles']
     *
     * // The `_.matches` iteratee shorthand.
     * _.dropWhile(users, { 'user': 'barney', 'active': false });
     * // => objects for ['fred', 'pebbles']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.dropWhile(users, ['active', false]);
     * // => objects for ['pebbles']
     *
     * // The `_.property` iteratee shorthand.
     * _.dropWhile(users, 'active');
     * // => objects for ['barney', 'fred', 'pebbles']
     */
    function dropWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3), true)
        : [];
    }

    /**
     * Fills elements of `array` with `value` from `start` up to, but not
     * including, `end`.
     *
     * **Note:** This method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 3.2.0
     * @category Array
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _.fill(array, 'a');
     * console.log(array);
     * // => ['a', 'a', 'a']
     *
     * _.fill(Array(3), 2);
     * // => [2, 2, 2]
     *
     * _.fill([4, 6, 8, 10], '*', 1, 3);
     * // => [4, '*', '*', 10]
     */
    function fill(array, value, start, end) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
        start = 0;
        end = length;
      }
      return baseFill(array, value, start, end);
    }

    /**
     * This method is like `_.find` except that it returns the index of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.findIndex(users, function(o) { return o.user == 'barney'; });
     * // => 0
     *
     * // The `_.matches` iteratee shorthand.
     * _.findIndex(users, { 'user': 'fred', 'active': false });
     * // => 1
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findIndex(users, ['active', false]);
     * // => 0
     *
     * // The `_.property` iteratee shorthand.
     * _.findIndex(users, 'active');
     * // => 2
     */
    function findIndex(array, predicate, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = fromIndex == null ? 0 : toInteger(fromIndex);
      if (index < 0) {
        index = nativeMax(length + index, 0);
      }
      return baseFindIndex(array, getIteratee(predicate, 3), index);
    }

    /**
     * This method is like `_.findIndex` except that it iterates over elements
     * of `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=array.length-1] The index to search from.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
     * // => 2
     *
     * // The `_.matches` iteratee shorthand.
     * _.findLastIndex(users, { 'user': 'barney', 'active': true });
     * // => 0
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findLastIndex(users, ['active', false]);
     * // => 2
     *
     * // The `_.property` iteratee shorthand.
     * _.findLastIndex(users, 'active');
     * // => 0
     */
    function findLastIndex(array, predicate, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = length - 1;
      if (fromIndex !== undefined) {
        index = toInteger(fromIndex);
        index = fromIndex < 0
          ? nativeMax(length + index, 0)
          : nativeMin(index, length - 1);
      }
      return baseFindIndex(array, getIteratee(predicate, 3), index, true);
    }

    /**
     * Flattens `array` a single level deep.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flatten([1, [2, [3, [4]], 5]]);
     * // => [1, 2, [3, [4]], 5]
     */
    function flatten(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseFlatten(array, 1) : [];
    }

    /**
     * Recursively flattens `array`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flattenDeep([1, [2, [3, [4]], 5]]);
     * // => [1, 2, 3, 4, 5]
     */
    function flattenDeep(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseFlatten(array, INFINITY) : [];
    }

    /**
     * Recursively flatten `array` up to `depth` times.
     *
     * @static
     * @memberOf _
     * @since 4.4.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @param {number} [depth=1] The maximum recursion depth.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * var array = [1, [2, [3, [4]], 5]];
     *
     * _.flattenDepth(array, 1);
     * // => [1, 2, [3, [4]], 5]
     *
     * _.flattenDepth(array, 2);
     * // => [1, 2, 3, [4], 5]
     */
    function flattenDepth(array, depth) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      depth = depth === undefined ? 1 : toInteger(depth);
      return baseFlatten(array, depth);
    }

    /**
     * The inverse of `_.toPairs`; this method returns an object composed
     * from key-value `pairs`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} pairs The key-value pairs.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.fromPairs([['a', 1], ['b', 2]]);
     * // => { 'a': 1, 'b': 2 }
     */
    function fromPairs(pairs) {
      var index = -1,
          length = pairs == null ? 0 : pairs.length,
          result = {};

      while (++index < length) {
        var pair = pairs[index];
        result[pair[0]] = pair[1];
      }
      return result;
    }

    /**
     * Gets the first element of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @alias first
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the first element of `array`.
     * @example
     *
     * _.head([1, 2, 3]);
     * // => 1
     *
     * _.head([]);
     * // => undefined
     */
    function head(array) {
      return (array && array.length) ? array[0] : undefined;
    }

    /**
     * Gets the index at which the first occurrence of `value` is found in `array`
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons. If `fromIndex` is negative, it's used as the
     * offset from the end of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.indexOf([1, 2, 1, 2], 2);
     * // => 1
     *
     * // Search from the `fromIndex`.
     * _.indexOf([1, 2, 1, 2], 2, 2);
     * // => 3
     */
    function indexOf(array, value, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = fromIndex == null ? 0 : toInteger(fromIndex);
      if (index < 0) {
        index = nativeMax(length + index, 0);
      }
      return baseIndexOf(array, value, index);
    }

    /**
     * Gets all but the last element of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.initial([1, 2, 3]);
     * // => [1, 2]
     */
    function initial(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseSlice(array, 0, -1) : [];
    }

    /**
     * Creates an array of unique values that are included in all given arrays
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons. The order and references of result values are
     * determined by the first array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of intersecting values.
     * @example
     *
     * _.intersection([2, 1], [2, 3]);
     * // => [2]
     */
    var intersection = baseRest(function(arrays) {
      var mapped = arrayMap(arrays, castArrayLikeObject);
      return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapped)
        : [];
    });

    /**
     * This method is like `_.intersection` except that it accepts `iteratee`
     * which is invoked for each element of each `arrays` to generate the criterion
     * by which they're compared. The order and references of result values are
     * determined by the first array. The iteratee is invoked with one argument:
     * (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of intersecting values.
     * @example
     *
     * _.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
     * // => [2.1]
     *
     * // The `_.property` iteratee shorthand.
     * _.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }]
     */
    var intersectionBy = baseRest(function(arrays) {
      var iteratee = last(arrays),
          mapped = arrayMap(arrays, castArrayLikeObject);

      if (iteratee === last(mapped)) {
        iteratee = undefined;
      } else {
        mapped.pop();
      }
      return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapped, getIteratee(iteratee, 2))
        : [];
    });

    /**
     * This method is like `_.intersection` except that it accepts `comparator`
     * which is invoked to compare elements of `arrays`. The order and references
     * of result values are determined by the first array. The comparator is
     * invoked with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of intersecting values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.intersectionWith(objects, others, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }]
     */
    var intersectionWith = baseRest(function(arrays) {
      var comparator = last(arrays),
          mapped = arrayMap(arrays, castArrayLikeObject);

      comparator = typeof comparator == 'function' ? comparator : undefined;
      if (comparator) {
        mapped.pop();
      }
      return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapped, undefined, comparator)
        : [];
    });

    /**
     * Converts all elements in `array` into a string separated by `separator`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to convert.
     * @param {string} [separator=','] The element separator.
     * @returns {string} Returns the joined string.
     * @example
     *
     * _.join(['a', 'b', 'c'], '~');
     * // => 'a~b~c'
     */
    function join(array, separator) {
      return array == null ? '' : nativeJoin.call(array, separator);
    }

    /**
     * Gets the last element of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the last element of `array`.
     * @example
     *
     * _.last([1, 2, 3]);
     * // => 3
     */
    function last(array) {
      var length = array == null ? 0 : array.length;
      return length ? array[length - 1] : undefined;
    }

    /**
     * This method is like `_.indexOf` except that it iterates over elements of
     * `array` from right to left.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=array.length-1] The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.lastIndexOf([1, 2, 1, 2], 2);
     * // => 3
     *
     * // Search from the `fromIndex`.
     * _.lastIndexOf([1, 2, 1, 2], 2, 2);
     * // => 1
     */
    function lastIndexOf(array, value, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = length;
      if (fromIndex !== undefined) {
        index = toInteger(fromIndex);
        index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
      }
      return value === value
        ? strictLastIndexOf(array, value, index)
        : baseFindIndex(array, baseIsNaN, index, true);
    }

    /**
     * Gets the element at index `n` of `array`. If `n` is negative, the nth
     * element from the end is returned.
     *
     * @static
     * @memberOf _
     * @since 4.11.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=0] The index of the element to return.
     * @returns {*} Returns the nth element of `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'd'];
     *
     * _.nth(array, 1);
     * // => 'b'
     *
     * _.nth(array, -2);
     * // => 'c';
     */
    function nth(array, n) {
      return (array && array.length) ? baseNth(array, toInteger(n)) : undefined;
    }

    /**
     * Removes all given values from `array` using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * **Note:** Unlike `_.without`, this method mutates `array`. Use `_.remove`
     * to remove elements from an array by predicate.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...*} [values] The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
     *
     * _.pull(array, 'a', 'c');
     * console.log(array);
     * // => ['b', 'b']
     */
    var pull = baseRest(pullAll);

    /**
     * This method is like `_.pull` except that it accepts an array of values to remove.
     *
     * **Note:** Unlike `_.difference`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
     *
     * _.pullAll(array, ['a', 'c']);
     * console.log(array);
     * // => ['b', 'b']
     */
    function pullAll(array, values) {
      return (array && array.length && values && values.length)
        ? basePullAll(array, values)
        : array;
    }

    /**
     * This method is like `_.pullAll` except that it accepts `iteratee` which is
     * invoked for each element of `array` and `values` to generate the criterion
     * by which they're compared. The iteratee is invoked with one argument: (value).
     *
     * **Note:** Unlike `_.differenceBy`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
     *
     * _.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
     * console.log(array);
     * // => [{ 'x': 2 }]
     */
    function pullAllBy(array, values, iteratee) {
      return (array && array.length && values && values.length)
        ? basePullAll(array, values, getIteratee(iteratee, 2))
        : array;
    }

    /**
     * This method is like `_.pullAll` except that it accepts `comparator` which
     * is invoked to compare elements of `array` to `values`. The comparator is
     * invoked with two arguments: (arrVal, othVal).
     *
     * **Note:** Unlike `_.differenceWith`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 4.6.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
     *
     * _.pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
     * console.log(array);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
     */
    function pullAllWith(array, values, comparator) {
      return (array && array.length && values && values.length)
        ? basePullAll(array, values, undefined, comparator)
        : array;
    }

    /**
     * Removes elements from `array` corresponding to `indexes` and returns an
     * array of removed elements.
     *
     * **Note:** Unlike `_.at`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...(number|number[])} [indexes] The indexes of elements to remove.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = ['a', 'b', 'c', 'd'];
     * var pulled = _.pullAt(array, [1, 3]);
     *
     * console.log(array);
     * // => ['a', 'c']
     *
     * console.log(pulled);
     * // => ['b', 'd']
     */
    var pullAt = flatRest(function(array, indexes) {
      var length = array == null ? 0 : array.length,
          result = baseAt(array, indexes);

      basePullAt(array, arrayMap(indexes, function(index) {
        return isIndex(index, length) ? +index : index;
      }).sort(compareAscending));

      return result;
    });

    /**
     * Removes all elements from `array` that `predicate` returns truthy for
     * and returns an array of the removed elements. The predicate is invoked
     * with three arguments: (value, index, array).
     *
     * **Note:** Unlike `_.filter`, this method mutates `array`. Use `_.pull`
     * to pull elements from an array by value.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = [1, 2, 3, 4];
     * var evens = _.remove(array, function(n) {
     *   return n % 2 == 0;
     * });
     *
     * console.log(array);
     * // => [1, 3]
     *
     * console.log(evens);
     * // => [2, 4]
     */
    function remove(array, predicate) {
      var result = [];
      if (!(array && array.length)) {
        return result;
      }
      var index = -1,
          indexes = [],
          length = array.length;

      predicate = getIteratee(predicate, 3);
      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result.push(value);
          indexes.push(index);
        }
      }
      basePullAt(array, indexes);
      return result;
    }

    /**
     * Reverses `array` so that the first element becomes the last, the second
     * element becomes the second to last, and so on.
     *
     * **Note:** This method mutates `array` and is based on
     * [`Array#reverse`](https://mdn.io/Array/reverse).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _.reverse(array);
     * // => [3, 2, 1]
     *
     * console.log(array);
     * // => [3, 2, 1]
     */
    function reverse(array) {
      return array == null ? array : nativeReverse.call(array);
    }

    /**
     * Creates a slice of `array` from `start` up to, but not including, `end`.
     *
     * **Note:** This method is used instead of
     * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
     * returned.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function slice(array, start, end) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
        start = 0;
        end = length;
      }
      else {
        start = start == null ? 0 : toInteger(start);
        end = end === undefined ? length : toInteger(end);
      }
      return baseSlice(array, start, end);
    }

    /**
     * Uses a binary search to determine the lowest index at which `value`
     * should be inserted into `array` in order to maintain its sort order.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedIndex([30, 50], 40);
     * // => 1
     */
    function sortedIndex(array, value) {
      return baseSortedIndex(array, value);
    }

    /**
     * This method is like `_.sortedIndex` except that it accepts `iteratee`
     * which is invoked for `value` and each element of `array` to compute their
     * sort ranking. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * var objects = [{ 'x': 4 }, { 'x': 5 }];
     *
     * _.sortedIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
     * // => 0
     *
     * // The `_.property` iteratee shorthand.
     * _.sortedIndexBy(objects, { 'x': 4 }, 'x');
     * // => 0
     */
    function sortedIndexBy(array, value, iteratee) {
      return baseSortedIndexBy(array, value, getIteratee(iteratee, 2));
    }

    /**
     * This method is like `_.indexOf` except that it performs a binary
     * search on a sorted `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.sortedIndexOf([4, 5, 5, 5, 6], 5);
     * // => 1
     */
    function sortedIndexOf(array, value) {
      var length = array == null ? 0 : array.length;
      if (length) {
        var index = baseSortedIndex(array, value);
        if (index < length && eq(array[index], value)) {
          return index;
        }
      }
      return -1;
    }

    /**
     * This method is like `_.sortedIndex` except that it returns the highest
     * index at which `value` should be inserted into `array` in order to
     * maintain its sort order.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedLastIndex([4, 5, 5, 5, 6], 5);
     * // => 4
     */
    function sortedLastIndex(array, value) {
      return baseSortedIndex(array, value, true);
    }

    /**
     * This method is like `_.sortedLastIndex` except that it accepts `iteratee`
     * which is invoked for `value` and each element of `array` to compute their
     * sort ranking. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * var objects = [{ 'x': 4 }, { 'x': 5 }];
     *
     * _.sortedLastIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
     * // => 1
     *
     * // The `_.property` iteratee shorthand.
     * _.sortedLastIndexBy(objects, { 'x': 4 }, 'x');
     * // => 1
     */
    function sortedLastIndexBy(array, value, iteratee) {
      return baseSortedIndexBy(array, value, getIteratee(iteratee, 2), true);
    }

    /**
     * This method is like `_.lastIndexOf` except that it performs a binary
     * search on a sorted `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.sortedLastIndexOf([4, 5, 5, 5, 6], 5);
     * // => 3
     */
    function sortedLastIndexOf(array, value) {
      var length = array == null ? 0 : array.length;
      if (length) {
        var index = baseSortedIndex(array, value, true) - 1;
        if (eq(array[index], value)) {
          return index;
        }
      }
      return -1;
    }

    /**
     * This method is like `_.uniq` except that it's designed and optimized
     * for sorted arrays.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.sortedUniq([1, 1, 2]);
     * // => [1, 2]
     */
    function sortedUniq(array) {
      return (array && array.length)
        ? baseSortedUniq(array)
        : [];
    }

    /**
     * This method is like `_.uniqBy` except that it's designed and optimized
     * for sorted arrays.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
     * // => [1.1, 2.3]
     */
    function sortedUniqBy(array, iteratee) {
      return (array && array.length)
        ? baseSortedUniq(array, getIteratee(iteratee, 2))
        : [];
    }

    /**
     * Gets all but the first element of `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.tail([1, 2, 3]);
     * // => [2, 3]
     */
    function tail(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseSlice(array, 1, length) : [];
    }

    /**
     * Creates a slice of `array` with `n` elements taken from the beginning.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.take([1, 2, 3]);
     * // => [1]
     *
     * _.take([1, 2, 3], 2);
     * // => [1, 2]
     *
     * _.take([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.take([1, 2, 3], 0);
     * // => []
     */
    function take(array, n, guard) {
      if (!(array && array.length)) {
        return [];
      }
      n = (guard || n === undefined) ? 1 : toInteger(n);
      return baseSlice(array, 0, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` with `n` elements taken from the end.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.takeRight([1, 2, 3]);
     * // => [3]
     *
     * _.takeRight([1, 2, 3], 2);
     * // => [2, 3]
     *
     * _.takeRight([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.takeRight([1, 2, 3], 0);
     * // => []
     */
    function takeRight(array, n, guard) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      n = (guard || n === undefined) ? 1 : toInteger(n);
      n = length - n;
      return baseSlice(array, n < 0 ? 0 : n, length);
    }

    /**
     * Creates a slice of `array` with elements taken from the end. Elements are
     * taken until `predicate` returns falsey. The predicate is invoked with
     * three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.takeRightWhile(users, function(o) { return !o.active; });
     * // => objects for ['fred', 'pebbles']
     *
     * // The `_.matches` iteratee shorthand.
     * _.takeRightWhile(users, { 'user': 'pebbles', 'active': false });
     * // => objects for ['pebbles']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.takeRightWhile(users, ['active', false]);
     * // => objects for ['fred', 'pebbles']
     *
     * // The `_.property` iteratee shorthand.
     * _.takeRightWhile(users, 'active');
     * // => []
     */
    function takeRightWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3), false, true)
        : [];
    }

    /**
     * Creates a slice of `array` with elements taken from the beginning. Elements
     * are taken until `predicate` returns falsey. The predicate is invoked with
     * three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.takeWhile(users, function(o) { return !o.active; });
     * // => objects for ['barney', 'fred']
     *
     * // The `_.matches` iteratee shorthand.
     * _.takeWhile(users, { 'user': 'barney', 'active': false });
     * // => objects for ['barney']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.takeWhile(users, ['active', false]);
     * // => objects for ['barney', 'fred']
     *
     * // The `_.property` iteratee shorthand.
     * _.takeWhile(users, 'active');
     * // => []
     */
    function takeWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3))
        : [];
    }

    /**
     * Creates an array of unique values, in order, from all given arrays using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * _.union([2], [1, 2]);
     * // => [2, 1]
     */
    var union = baseRest(function(arrays) {
      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
    });

    /**
     * This method is like `_.union` except that it accepts `iteratee` which is
     * invoked for each element of each `arrays` to generate the criterion by
     * which uniqueness is computed. Result values are chosen from the first
     * array in which the value occurs. The iteratee is invoked with one argument:
     * (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * _.unionBy([2.1], [1.2, 2.3], Math.floor);
     * // => [2.1, 1.2]
     *
     * // The `_.property` iteratee shorthand.
     * _.unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */
    var unionBy = baseRest(function(arrays) {
      var iteratee = last(arrays);
      if (isArrayLikeObject(iteratee)) {
        iteratee = undefined;
      }
      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee, 2));
    });

    /**
     * This method is like `_.union` except that it accepts `comparator` which
     * is invoked to compare elements of `arrays`. Result values are chosen from
     * the first array in which the value occurs. The comparator is invoked
     * with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.unionWith(objects, others, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
     */
    var unionWith = baseRest(function(arrays) {
      var comparator = last(arrays);
      comparator = typeof comparator == 'function' ? comparator : undefined;
      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined, comparator);
    });

    /**
     * Creates a duplicate-free version of an array, using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons, in which only the first occurrence of each element
     * is kept. The order of result values is determined by the order they occur
     * in the array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.uniq([2, 1, 2]);
     * // => [2, 1]
     */
    function uniq(array) {
      return (array && array.length) ? baseUniq(array) : [];
    }

    /**
     * This method is like `_.uniq` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * uniqueness is computed. The order of result values is determined by the
     * order they occur in the array. The iteratee is invoked with one argument:
     * (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
     * // => [2.1, 1.2]
     *
     * // The `_.property` iteratee shorthand.
     * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */
    function uniqBy(array, iteratee) {
      return (array && array.length) ? baseUniq(array, getIteratee(iteratee, 2)) : [];
    }

    /**
     * This method is like `_.uniq` except that it accepts `comparator` which
     * is invoked to compare elements of `array`. The order of result values is
     * determined by the order they occur in the array.The comparator is invoked
     * with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.uniqWith(objects, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
     */
    function uniqWith(array, comparator) {
      comparator = typeof comparator == 'function' ? comparator : undefined;
      return (array && array.length) ? baseUniq(array, undefined, comparator) : [];
    }

    /**
     * This method is like `_.zip` except that it accepts an array of grouped
     * elements and creates an array regrouping the elements to their pre-zip
     * configuration.
     *
     * @static
     * @memberOf _
     * @since 1.2.0
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip(['a', 'b'], [1, 2], [true, false]);
     * // => [['a', 1, true], ['b', 2, false]]
     *
     * _.unzip(zipped);
     * // => [['a', 'b'], [1, 2], [true, false]]
     */
    function unzip(array) {
      if (!(array && array.length)) {
        return [];
      }
      var length = 0;
      array = arrayFilter(array, function(group) {
        if (isArrayLikeObject(group)) {
          length = nativeMax(group.length, length);
          return true;
        }
      });
      return baseTimes(length, function(index) {
        return arrayMap(array, baseProperty(index));
      });
    }

    /**
     * This method is like `_.unzip` except that it accepts `iteratee` to specify
     * how regrouped values should be combined. The iteratee is invoked with the
     * elements of each group: (...group).
     *
     * @static
     * @memberOf _
     * @since 3.8.0
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @param {Function} [iteratee=_.identity] The function to combine
     *  regrouped values.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
     * // => [[1, 10, 100], [2, 20, 200]]
     *
     * _.unzipWith(zipped, _.add);
     * // => [3, 30, 300]
     */
    function unzipWith(array, iteratee) {
      if (!(array && array.length)) {
        return [];
      }
      var result = unzip(array);
      if (iteratee == null) {
        return result;
      }
      return arrayMap(result, function(group) {
        return apply(iteratee, undefined, group);
      });
    }

    /**
     * Creates an array excluding all given values using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * **Note:** Unlike `_.pull`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...*} [values] The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @see _.difference, _.xor
     * @example
     *
     * _.without([2, 1, 2, 3], 1, 2);
     * // => [3]
     */
    var without = baseRest(function(array, values) {
      return isArrayLikeObject(array)
        ? baseDifference(array, values)
        : [];
    });

    /**
     * Creates an array of unique values that is the
     * [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
     * of the given arrays. The order of result values is determined by the order
     * they occur in the arrays.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of filtered values.
     * @see _.difference, _.without
     * @example
     *
     * _.xor([2, 1], [2, 3]);
     * // => [1, 3]
     */
    var xor = baseRest(function(arrays) {
      return baseXor(arrayFilter(arrays, isArrayLikeObject));
    });

    /**
     * This method is like `_.xor` except that it accepts `iteratee` which is
     * invoked for each element of each `arrays` to generate the criterion by
     * which by which they're compared. The order of result values is determined
     * by the order they occur in the arrays. The iteratee is invoked with one
     * argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
     * // => [1.2, 3.4]
     *
     * // The `_.property` iteratee shorthand.
     * _.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 2 }]
     */
    var xorBy = baseRest(function(arrays) {
      var iteratee = last(arrays);
      if (isArrayLikeObject(iteratee)) {
        iteratee = undefined;
      }
      return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee, 2));
    });

    /**
     * This method is like `_.xor` except that it accepts `comparator` which is
     * invoked to compare elements of `arrays`. The order of result values is
     * determined by the order they occur in the arrays. The comparator is invoked
     * with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.xorWith(objects, others, _.isEqual);
     * // => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
     */
    var xorWith = baseRest(function(arrays) {
      var comparator = last(arrays);
      comparator = typeof comparator == 'function' ? comparator : undefined;
      return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined, comparator);
    });

    /**
     * Creates an array of grouped elements, the first of which contains the
     * first elements of the given arrays, the second of which contains the
     * second elements of the given arrays, and so on.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {...Array} [arrays] The arrays to process.
     * @returns {Array} Returns the new array of grouped elements.
     * @example
     *
     * _.zip(['a', 'b'], [1, 2], [true, false]);
     * // => [['a', 1, true], ['b', 2, false]]
     */
    var zip = baseRest(unzip);

    /**
     * This method is like `_.fromPairs` except that it accepts two arrays,
     * one of property identifiers and one of corresponding values.
     *
     * @static
     * @memberOf _
     * @since 0.4.0
     * @category Array
     * @param {Array} [props=[]] The property identifiers.
     * @param {Array} [values=[]] The property values.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.zipObject(['a', 'b'], [1, 2]);
     * // => { 'a': 1, 'b': 2 }
     */
    function zipObject(props, values) {
      return baseZipObject(props || [], values || [], assignValue);
    }

    /**
     * This method is like `_.zipObject` except that it supports property paths.
     *
     * @static
     * @memberOf _
     * @since 4.1.0
     * @category Array
     * @param {Array} [props=[]] The property identifiers.
     * @param {Array} [values=[]] The property values.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
     * // => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
     */
    function zipObjectDeep(props, values) {
      return baseZipObject(props || [], values || [], baseSet);
    }

    /**
     * This method is like `_.zip` except that it accepts `iteratee` to specify
     * how grouped values should be combined. The iteratee is invoked with the
     * elements of each group: (...group).
     *
     * @static
     * @memberOf _
     * @since 3.8.0
     * @category Array
     * @param {...Array} [arrays] The arrays to process.
     * @param {Function} [iteratee=_.identity] The function to combine
     *  grouped values.
     * @returns {Array} Returns the new array of grouped elements.
     * @example
     *
     * _.zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) {
     *   return a + b + c;
     * });
     * // => [111, 222]
     */
    var zipWith = baseRest(function(arrays) {
      var length = arrays.length,
          iteratee = length > 1 ? arrays[length - 1] : undefined;

      iteratee = typeof iteratee == 'function' ? (arrays.pop(), iteratee) : undefined;
      return unzipWith(arrays, iteratee);
    });

    /*------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` wrapper instance that wraps `value` with explicit method
     * chain sequences enabled. The result of such sequences must be unwrapped
     * with `_#value`.
     *
     * @static
     * @memberOf _
     * @since 1.3.0
     * @category Seq
     * @param {*} value The value to wrap.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36 },
     *   { 'user': 'fred',    'age': 40 },
     *   { 'user': 'pebbles', 'age': 1 }
     * ];
     *
     * var youngest = _
     *   .chain(users)
     *   .sortBy('age')
     *   .map(function(o) {
     *     return o.user + ' is ' + o.age;
     *   })
     *   .head()
     *   .value();
     * // => 'pebbles is 1'
     */
    function chain(value) {
      var result = lodash(value);
      result.__chain__ = true;
      return result;
    }

    /**
     * This method invokes `interceptor` and returns `value`. The interceptor
     * is invoked with one argument; (value). The purpose of this method is to
     * "tap into" a method chain sequence in order to modify intermediate results.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Seq
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @returns {*} Returns `value`.
     * @example
     *
     * _([1, 2, 3])
     *  .tap(function(array) {
     *    // Mutate input array.
     *    array.pop();
     *  })
     *  .reverse()
     *  .value();
     * // => [2, 1]
     */
    function tap(value, interceptor) {
      interceptor(value);
      return value;
    }

    /**
     * This method is like `_.tap` except that it returns the result of `interceptor`.
     * The purpose of this method is to "pass thru" values replacing intermediate
     * results in a method chain sequence.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Seq
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @returns {*} Returns the result of `interceptor`.
     * @example
     *
     * _('  abc  ')
     *  .chain()
     *  .trim()
     *  .thru(function(value) {
     *    return [value];
     *  })
     *  .value();
     * // => ['abc']
     */
    function thru(value, interceptor) {
      return interceptor(value);
    }

    /**
     * This method is the wrapper version of `_.at`.
     *
     * @name at
     * @memberOf _
     * @since 1.0.0
     * @category Seq
     * @param {...(string|string[])} [paths] The property paths to pick.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
     *
     * _(object).at(['a[0].b.c', 'a[1]']).value();
     * // => [3, 4]
     */
    var wrapperAt = flatRest(function(paths) {
      var length = paths.length,
          start = length ? paths[0] : 0,
          value = this.__wrapped__,
          interceptor = function(object) { return baseAt(object, paths); };

      if (length > 1 || this.__actions__.length ||
          !(value instanceof LazyWrapper) || !isIndex(start)) {
        return this.thru(interceptor);
      }
      value = value.slice(start, +start + (length ? 1 : 0));
      value.__actions__.push({
        'func': thru,
        'args': [interceptor],
        'thisArg': undefined
      });
      return new LodashWrapper(value, this.__chain__).thru(function(array) {
        if (length && !array.length) {
          array.push(undefined);
        }
        return array;
      });
    });

    /**
     * Creates a `lodash` wrapper instance with explicit method chain sequences enabled.
     *
     * @name chain
     * @memberOf _
     * @since 0.1.0
     * @category Seq
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * // A sequence without explicit chaining.
     * _(users).head();
     * // => { 'user': 'barney', 'age': 36 }
     *
     * // A sequence with explicit chaining.
     * _(users)
     *   .chain()
     *   .head()
     *   .pick('user')
     *   .value();
     * // => { 'user': 'barney' }
     */
    function wrapperChain() {
      return chain(this);
    }

    /**
     * Executes the chain sequence and returns the wrapped result.
     *
     * @name commit
     * @memberOf _
     * @since 3.2.0
     * @category Seq
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2];
     * var wrapped = _(array).push(3);
     *
     * console.log(array);
     * // => [1, 2]
     *
     * wrapped = wrapped.commit();
     * console.log(array);
     * // => [1, 2, 3]
     *
     * wrapped.last();
     * // => 3
     *
     * console.log(array);
     * // => [1, 2, 3]
     */
    function wrapperCommit() {
      return new LodashWrapper(this.value(), this.__chain__);
    }

    /**
     * Gets the next value on a wrapped object following the
     * [iterator protocol](https://mdn.io/iteration_protocols#iterator).
     *
     * @name next
     * @memberOf _
     * @since 4.0.0
     * @category Seq
     * @returns {Object} Returns the next iterator value.
     * @example
     *
     * var wrapped = _([1, 2]);
     *
     * wrapped.next();
     * // => { 'done': false, 'value': 1 }
     *
     * wrapped.next();
     * // => { 'done': false, 'value': 2 }
     *
     * wrapped.next();
     * // => { 'done': true, 'value': undefined }
     */
    function wrapperNext() {
      if (this.__values__ === undefined) {
        this.__values__ = toArray(this.value());
      }
      var done = this.__index__ >= this.__values__.length,
          value = done ? undefined : this.__values__[this.__index__++];

      return { 'done': done, 'value': value };
    }

    /**
     * Enables the wrapper to be iterable.
     *
     * @name Symbol.iterator
     * @memberOf _
     * @since 4.0.0
     * @category Seq
     * @returns {Object} Returns the wrapper object.
     * @example
     *
     * var wrapped = _([1, 2]);
     *
     * wrapped[Symbol.iterator]() === wrapped;
     * // => true
     *
     * Array.from(wrapped);
     * // => [1, 2]
     */
    function wrapperToIterator() {
      return this;
    }

    /**
     * Creates a clone of the chain sequence planting `value` as the wrapped value.
     *
     * @name plant
     * @memberOf _
     * @since 3.2.0
     * @category Seq
     * @param {*} value The value to plant.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var wrapped = _([1, 2]).map(square);
     * var other = wrapped.plant([3, 4]);
     *
     * other.value();
     * // => [9, 16]
     *
     * wrapped.value();
     * // => [1, 4]
     */
    function wrapperPlant(value) {
      var result,
          parent = this;

      while (parent instanceof baseLodash) {
        var clone = wrapperClone(parent);
        clone.__index__ = 0;
        clone.__values__ = undefined;
        if (result) {
          previous.__wrapped__ = clone;
        } else {
          result = clone;
        }
        var previous = clone;
        parent = parent.__wrapped__;
      }
      previous.__wrapped__ = value;
      return result;
    }

    /**
     * This method is the wrapper version of `_.reverse`.
     *
     * **Note:** This method mutates the wrapped array.
     *
     * @name reverse
     * @memberOf _
     * @since 0.1.0
     * @category Seq
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _(array).reverse().value()
     * // => [3, 2, 1]
     *
     * console.log(array);
     * // => [3, 2, 1]
     */
    function wrapperReverse() {
      var value = this.__wrapped__;
      if (value instanceof LazyWrapper) {
        var wrapped = value;
        if (this.__actions__.length) {
          wrapped = new LazyWrapper(this);
        }
        wrapped = wrapped.reverse();
        wrapped.__actions__.push({
          'func': thru,
          'args': [reverse],
          'thisArg': undefined
        });
        return new LodashWrapper(wrapped, this.__chain__);
      }
      return this.thru(reverse);
    }

    /**
     * Executes the chain sequence to resolve the unwrapped value.
     *
     * @name value
     * @memberOf _
     * @since 0.1.0
     * @alias toJSON, valueOf
     * @category Seq
     * @returns {*} Returns the resolved unwrapped value.
     * @example
     *
     * _([1, 2, 3]).value();
     * // => [1, 2, 3]
     */
    function wrapperValue() {
      return baseWrapperValue(this.__wrapped__, this.__actions__);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` thru `iteratee`. The corresponding value of
     * each key is the number of times the key was returned by `iteratee`. The
     * iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.countBy([6.1, 4.2, 6.3], Math.floor);
     * // => { '4': 1, '6': 2 }
     *
     * // The `_.property` iteratee shorthand.
     * _.countBy(['one', 'two', 'three'], 'length');
     * // => { '3': 2, '5': 1 }
     */
    var countBy = createAggregator(function(result, value, key) {
      if (hasOwnProperty.call(result, key)) {
        ++result[key];
      } else {
        baseAssignValue(result, key, 1);
      }
    });

    /**
     * Checks if `predicate` returns truthy for **all** elements of `collection`.
     * Iteration is stopped once `predicate` returns falsey. The predicate is
     * invoked with three arguments: (value, index|key, collection).
     *
     * **Note:** This method returns `true` for
     * [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
     * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
     * elements of empty collections.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`.
     * @example
     *
     * _.every([true, 1, null, 'yes'], Boolean);
     * // => false
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * // The `_.matches` iteratee shorthand.
     * _.every(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.every(users, ['active', false]);
     * // => true
     *
     * // The `_.property` iteratee shorthand.
     * _.every(users, 'active');
     * // => false
     */
    function every(collection, predicate, guard) {
      var func = isArray(collection) ? arrayEvery : baseEvery;
      if (guard && isIterateeCall(collection, predicate, guard)) {
        predicate = undefined;
      }
      return func(collection, getIteratee(predicate, 3));
    }

    /**
     * Iterates over elements of `collection`, returning an array of all elements
     * `predicate` returns truthy for. The predicate is invoked with three
     * arguments: (value, index|key, collection).
     *
     * **Note:** Unlike `_.remove`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     * @see _.reject
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * _.filter(users, function(o) { return !o.active; });
     * // => objects for ['fred']
     *
     * // The `_.matches` iteratee shorthand.
     * _.filter(users, { 'age': 36, 'active': true });
     * // => objects for ['barney']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.filter(users, ['active', false]);
     * // => objects for ['fred']
     *
     * // The `_.property` iteratee shorthand.
     * _.filter(users, 'active');
     * // => objects for ['barney']
     */
    function filter(collection, predicate) {
      var func = isArray(collection) ? arrayFilter : baseFilter;
      return func(collection, getIteratee(predicate, 3));
    }

    /**
     * Iterates over elements of `collection`, returning the first element
     * `predicate` returns truthy for. The predicate is invoked with three
     * arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': true },
     *   { 'user': 'fred',    'age': 40, 'active': false },
     *   { 'user': 'pebbles', 'age': 1,  'active': true }
     * ];
     *
     * _.find(users, function(o) { return o.age < 40; });
     * // => object for 'barney'
     *
     * // The `_.matches` iteratee shorthand.
     * _.find(users, { 'age': 1, 'active': true });
     * // => object for 'pebbles'
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.find(users, ['active', false]);
     * // => object for 'fred'
     *
     * // The `_.property` iteratee shorthand.
     * _.find(users, 'active');
     * // => object for 'barney'
     */
    var find = createFind(findIndex);

    /**
     * This method is like `_.find` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=collection.length-1] The index to search from.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * _.findLast([1, 2, 3, 4], function(n) {
     *   return n % 2 == 1;
     * });
     * // => 3
     */
    var findLast = createFind(findLastIndex);

    /**
     * Creates a flattened array of values by running each element in `collection`
     * thru `iteratee` and flattening the mapped results. The iteratee is invoked
     * with three arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * function duplicate(n) {
     *   return [n, n];
     * }
     *
     * _.flatMap([1, 2], duplicate);
     * // => [1, 1, 2, 2]
     */
    function flatMap(collection, iteratee) {
      return baseFlatten(map(collection, iteratee), 1);
    }

    /**
     * This method is like `_.flatMap` except that it recursively flattens the
     * mapped results.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * function duplicate(n) {
     *   return [[[n, n]]];
     * }
     *
     * _.flatMapDeep([1, 2], duplicate);
     * // => [1, 1, 2, 2]
     */
    function flatMapDeep(collection, iteratee) {
      return baseFlatten(map(collection, iteratee), INFINITY);
    }

    /**
     * This method is like `_.flatMap` except that it recursively flattens the
     * mapped results up to `depth` times.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {number} [depth=1] The maximum recursion depth.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * function duplicate(n) {
     *   return [[[n, n]]];
     * }
     *
     * _.flatMapDepth([1, 2], duplicate, 2);
     * // => [[1, 1], [2, 2]]
     */
    function flatMapDepth(collection, iteratee, depth) {
      depth = depth === undefined ? 1 : toInteger(depth);
      return baseFlatten(map(collection, iteratee), depth);
    }

    /**
     * Iterates over elements of `collection` and invokes `iteratee` for each element.
     * The iteratee is invoked with three arguments: (value, index|key, collection).
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * **Note:** As with other "Collections" methods, objects with a "length"
     * property are iterated like arrays. To avoid this behavior use `_.forIn`
     * or `_.forOwn` for object iteration.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @alias each
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     * @see _.forEachRight
     * @example
     *
     * _.forEach([1, 2], function(value) {
     *   console.log(value);
     * });
     * // => Logs `1` then `2`.
     *
     * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
     */
    function forEach(collection, iteratee) {
      var func = isArray(collection) ? arrayEach : baseEach;
      return func(collection, getIteratee(iteratee, 3));
    }

    /**
     * This method is like `_.forEach` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @alias eachRight
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     * @see _.forEach
     * @example
     *
     * _.forEachRight([1, 2], function(value) {
     *   console.log(value);
     * });
     * // => Logs `2` then `1`.
     */
    function forEachRight(collection, iteratee) {
      var func = isArray(collection) ? arrayEachRight : baseEachRight;
      return func(collection, getIteratee(iteratee, 3));
    }

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` thru `iteratee`. The order of grouped values
     * is determined by the order they occur in `collection`. The corresponding
     * value of each key is an array of elements responsible for generating the
     * key. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.groupBy([6.1, 4.2, 6.3], Math.floor);
     * // => { '4': [4.2], '6': [6.1, 6.3] }
     *
     * // The `_.property` iteratee shorthand.
     * _.groupBy(['one', 'two', 'three'], 'length');
     * // => { '3': ['one', 'two'], '5': ['three'] }
     */
    var groupBy = createAggregator(function(result, value, key) {
      if (hasOwnProperty.call(result, key)) {
        result[key].push(value);
      } else {
        baseAssignValue(result, key, [value]);
      }
    });

    /**
     * Checks if `value` is in `collection`. If `collection` is a string, it's
     * checked for a substring of `value`, otherwise
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * is used for equality comparisons. If `fromIndex` is negative, it's used as
     * the offset from the end of `collection`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object|string} collection The collection to inspect.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
     * @returns {boolean} Returns `true` if `value` is found, else `false`.
     * @example
     *
     * _.includes([1, 2, 3], 1);
     * // => true
     *
     * _.includes([1, 2, 3], 1, 2);
     * // => false
     *
     * _.includes({ 'a': 1, 'b': 2 }, 1);
     * // => true
     *
     * _.includes('abcd', 'bc');
     * // => true
     */
    function includes(collection, value, fromIndex, guard) {
      collection = isArrayLike(collection) ? collection : values(collection);
      fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

      var length = collection.length;
      if (fromIndex < 0) {
        fromIndex = nativeMax(length + fromIndex, 0);
      }
      return isString(collection)
        ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
        : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
    }

    /**
     * Invokes the method at `path` of each element in `collection`, returning
     * an array of the results of each invoked method. Any additional arguments
     * are provided to each invoked method. If `path` is a function, it's invoked
     * for, and `this` bound to, each element in `collection`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Array|Function|string} path The path of the method to invoke or
     *  the function invoked per iteration.
     * @param {...*} [args] The arguments to invoke each method with.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * _.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
     * // => [[1, 5, 7], [1, 2, 3]]
     *
     * _.invokeMap([123, 456], String.prototype.split, '');
     * // => [['1', '2', '3'], ['4', '5', '6']]
     */
    var invokeMap = baseRest(function(collection, path, args) {
      var index = -1,
          isFunc = typeof path == 'function',
          result = isArrayLike(collection) ? Array(collection.length) : [];

      baseEach(collection, function(value) {
        result[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
      });
      return result;
    });

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` thru `iteratee`. The corresponding value of
     * each key is the last element responsible for generating the key. The
     * iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * var array = [
     *   { 'dir': 'left', 'code': 97 },
     *   { 'dir': 'right', 'code': 100 }
     * ];
     *
     * _.keyBy(array, function(o) {
     *   return String.fromCharCode(o.code);
     * });
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     *
     * _.keyBy(array, 'dir');
     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
     */
    var keyBy = createAggregator(function(result, value, key) {
      baseAssignValue(result, key, value);
    });

    /**
     * Creates an array of values by running each element in `collection` thru
     * `iteratee`. The iteratee is invoked with three arguments:
     * (value, index|key, collection).
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
     *
     * The guarded methods are:
     * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
     * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
     * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
     * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * _.map([4, 8], square);
     * // => [16, 64]
     *
     * _.map({ 'a': 4, 'b': 8 }, square);
     * // => [16, 64] (iteration order is not guaranteed)
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * // The `_.property` iteratee shorthand.
     * _.map(users, 'user');
     * // => ['barney', 'fred']
     */
    function map(collection, iteratee) {
      var func = isArray(collection) ? arrayMap : baseMap;
      return func(collection, getIteratee(iteratee, 3));
    }

    /**
     * This method is like `_.sortBy` except that it allows specifying the sort
     * orders of the iteratees to sort by. If `orders` is unspecified, all values
     * are sorted in ascending order. Otherwise, specify an order of "desc" for
     * descending or "asc" for ascending sort order of corresponding values.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[_.identity]]
     *  The iteratees to sort by.
     * @param {string[]} [orders] The sort orders of `iteratees`.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 34 },
     *   { 'user': 'fred',   'age': 40 },
     *   { 'user': 'barney', 'age': 36 }
     * ];
     *
     * // Sort by `user` in ascending order and by `age` in descending order.
     * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
     */
    function orderBy(collection, iteratees, orders, guard) {
      if (collection == null) {
        return [];
      }
      if (!isArray(iteratees)) {
        iteratees = iteratees == null ? [] : [iteratees];
      }
      orders = guard ? undefined : orders;
      if (!isArray(orders)) {
        orders = orders == null ? [] : [orders];
      }
      return baseOrderBy(collection, iteratees, orders);
    }

    /**
     * Creates an array of elements split into two groups, the first of which
     * contains elements `predicate` returns truthy for, the second of which
     * contains elements `predicate` returns falsey for. The predicate is
     * invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the array of grouped elements.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': false },
     *   { 'user': 'fred',    'age': 40, 'active': true },
     *   { 'user': 'pebbles', 'age': 1,  'active': false }
     * ];
     *
     * _.partition(users, function(o) { return o.active; });
     * // => objects for [['fred'], ['barney', 'pebbles']]
     *
     * // The `_.matches` iteratee shorthand.
     * _.partition(users, { 'age': 1, 'active': false });
     * // => objects for [['pebbles'], ['barney', 'fred']]
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.partition(users, ['active', false]);
     * // => objects for [['barney', 'pebbles'], ['fred']]
     *
     * // The `_.property` iteratee shorthand.
     * _.partition(users, 'active');
     * // => objects for [['fred'], ['barney', 'pebbles']]
     */
    var partition = createAggregator(function(result, value, key) {
      result[key ? 0 : 1].push(value);
    }, function() { return [[], []]; });

    /**
     * Reduces `collection` to a value which is the accumulated result of running
     * each element in `collection` thru `iteratee`, where each successive
     * invocation is supplied the return value of the previous. If `accumulator`
     * is not given, the first element of `collection` is used as the initial
     * value. The iteratee is invoked with four arguments:
     * (accumulator, value, index|key, collection).
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.reduce`, `_.reduceRight`, and `_.transform`.
     *
     * The guarded methods are:
     * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
     * and `sortBy`
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @returns {*} Returns the accumulated value.
     * @see _.reduceRight
     * @example
     *
     * _.reduce([1, 2], function(sum, n) {
     *   return sum + n;
     * }, 0);
     * // => 3
     *
     * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
     *   (result[value] || (result[value] = [])).push(key);
     *   return result;
     * }, {});
     * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
     */
    function reduce(collection, iteratee, accumulator) {
      var func = isArray(collection) ? arrayReduce : baseReduce,
          initAccum = arguments.length < 3;

      return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEach);
    }

    /**
     * This method is like `_.reduce` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @returns {*} Returns the accumulated value.
     * @see _.reduce
     * @example
     *
     * var array = [[0, 1], [2, 3], [4, 5]];
     *
     * _.reduceRight(array, function(flattened, other) {
     *   return flattened.concat(other);
     * }, []);
     * // => [4, 5, 2, 3, 0, 1]
     */
    function reduceRight(collection, iteratee, accumulator) {
      var func = isArray(collection) ? arrayReduceRight : baseReduce,
          initAccum = arguments.length < 3;

      return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEachRight);
    }

    /**
     * The opposite of `_.filter`; this method returns the elements of `collection`
     * that `predicate` does **not** return truthy for.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     * @see _.filter
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false },
     *   { 'user': 'fred',   'age': 40, 'active': true }
     * ];
     *
     * _.reject(users, function(o) { return !o.active; });
     * // => objects for ['fred']
     *
     * // The `_.matches` iteratee shorthand.
     * _.reject(users, { 'age': 40, 'active': true });
     * // => objects for ['barney']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.reject(users, ['active', false]);
     * // => objects for ['fred']
     *
     * // The `_.property` iteratee shorthand.
     * _.reject(users, 'active');
     * // => objects for ['barney']
     */
    function reject(collection, predicate) {
      var func = isArray(collection) ? arrayFilter : baseFilter;
      return func(collection, negate(getIteratee(predicate, 3)));
    }

    /**
     * Gets a random element from `collection`.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to sample.
     * @returns {*} Returns the random element.
     * @example
     *
     * _.sample([1, 2, 3, 4]);
     * // => 2
     */
    function sample(collection) {
      var func = isArray(collection) ? arraySample : baseSample;
      return func(collection);
    }

    /**
     * Gets `n` random elements at unique keys from `collection` up to the
     * size of `collection`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to sample.
     * @param {number} [n=1] The number of elements to sample.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the random elements.
     * @example
     *
     * _.sampleSize([1, 2, 3], 2);
     * // => [3, 1]
     *
     * _.sampleSize([1, 2, 3], 4);
     * // => [2, 3, 1]
     */
    function sampleSize(collection, n, guard) {
      if ((guard ? isIterateeCall(collection, n, guard) : n === undefined)) {
        n = 1;
      } else {
        n = toInteger(n);
      }
      var func = isArray(collection) ? arraySampleSize : baseSampleSize;
      return func(collection, n);
    }

    /**
     * Creates an array of shuffled values, using a version of the
     * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to shuffle.
     * @returns {Array} Returns the new shuffled array.
     * @example
     *
     * _.shuffle([1, 2, 3, 4]);
     * // => [4, 1, 3, 2]
     */
    function shuffle(collection) {
      var func = isArray(collection) ? arrayShuffle : baseShuffle;
      return func(collection);
    }

    /**
     * Gets the size of `collection` by returning its length for array-like
     * values or the number of own enumerable string keyed properties for objects.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object|string} collection The collection to inspect.
     * @returns {number} Returns the collection size.
     * @example
     *
     * _.size([1, 2, 3]);
     * // => 3
     *
     * _.size({ 'a': 1, 'b': 2 });
     * // => 2
     *
     * _.size('pebbles');
     * // => 7
     */
    function size(collection) {
      if (collection == null) {
        return 0;
      }
      if (isArrayLike(collection)) {
        return isString(collection) ? stringSize(collection) : collection.length;
      }
      var tag = getTag(collection);
      if (tag == mapTag || tag == setTag) {
        return collection.size;
      }
      return baseKeys(collection).length;
    }

    /**
     * Checks if `predicate` returns truthy for **any** element of `collection`.
     * Iteration is stopped once `predicate` returns truthy. The predicate is
     * invoked with three arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     * @example
     *
     * _.some([null, 0, 'yes', false], Boolean);
     * // => true
     *
     * var users = [
     *   { 'user': 'barney', 'active': true },
     *   { 'user': 'fred',   'active': false }
     * ];
     *
     * // The `_.matches` iteratee shorthand.
     * _.some(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.some(users, ['active', false]);
     * // => true
     *
     * // The `_.property` iteratee shorthand.
     * _.some(users, 'active');
     * // => true
     */
    function some(collection, predicate, guard) {
      var func = isArray(collection) ? arraySome : baseSome;
      if (guard && isIterateeCall(collection, predicate, guard)) {
        predicate = undefined;
      }
      return func(collection, getIteratee(predicate, 3));
    }

    /**
     * Creates an array of elements, sorted in ascending order by the results of
     * running each element in a collection thru each iteratee. This method
     * performs a stable sort, that is, it preserves the original sort order of
     * equal elements. The iteratees are invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {...(Function|Function[])} [iteratees=[_.identity]]
     *  The iteratees to sort by.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 },
     *   { 'user': 'barney', 'age': 34 }
     * ];
     *
     * _.sortBy(users, [function(o) { return o.user; }]);
     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
     *
     * _.sortBy(users, ['user', 'age']);
     * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
     */
    var sortBy = baseRest(function(collection, iteratees) {
      if (collection == null) {
        return [];
      }
      var length = iteratees.length;
      if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
        iteratees = [];
      } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
        iteratees = [iteratees[0]];
      }
      return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
    });

    /*------------------------------------------------------------------------*/

    /**
     * Gets the timestamp of the number of milliseconds that have elapsed since
     * the Unix epoch (1 January 1970 00:00:00 UTC).
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Date
     * @returns {number} Returns the timestamp.
     * @example
     *
     * _.defer(function(stamp) {
     *   console.log(_.now() - stamp);
     * }, _.now());
     * // => Logs the number of milliseconds it took for the deferred invocation.
     */
    var now = ctxNow || function() {
      return root.Date.now();
    };

    /*------------------------------------------------------------------------*/

    /**
     * The opposite of `_.before`; this method creates a function that invokes
     * `func` once it's called `n` or more times.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {number} n The number of calls before `func` is invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var saves = ['profile', 'settings'];
     *
     * var done = _.after(saves.length, function() {
     *   console.log('done saving!');
     * });
     *
     * _.forEach(saves, function(type) {
     *   asyncSave({ 'type': type, 'complete': done });
     * });
     * // => Logs 'done saving!' after the two async saves have completed.
     */
    function after(n, func) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      n = toInteger(n);
      return function() {
        if (--n < 1) {
          return func.apply(this, arguments);
        }
      };
    }

    /**
     * Creates a function that invokes `func`, with up to `n` arguments,
     * ignoring any additional arguments.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} func The function to cap arguments for.
     * @param {number} [n=func.length] The arity cap.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the new capped function.
     * @example
     *
     * _.map(['6', '8', '10'], _.ary(parseInt, 1));
     * // => [6, 8, 10]
     */
    function ary(func, n, guard) {
      n = guard ? undefined : n;
      n = (func && n == null) ? func.length : n;
      return createWrap(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n);
    }

    /**
     * Creates a function that invokes `func`, with the `this` binding and arguments
     * of the created function, while it's called less than `n` times. Subsequent
     * calls to the created function return the result of the last `func` invocation.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {number} n The number of calls at which `func` is no longer invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * jQuery(element).on('click', _.before(5, addContactToList));
     * // => Allows adding up to 4 contacts to the list.
     */
    function before(n, func) {
      var result;
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      n = toInteger(n);
      return function() {
        if (--n > 0) {
          result = func.apply(this, arguments);
        }
        if (n <= 1) {
          func = undefined;
        }
        return result;
      };
    }

    /**
     * Creates a function that invokes `func` with the `this` binding of `thisArg`
     * and `partials` prepended to the arguments it receives.
     *
     * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
     * may be used as a placeholder for partially applied arguments.
     *
     * **Note:** Unlike native `Function#bind`, this method doesn't set the "length"
     * property of bound functions.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to bind.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * function greet(greeting, punctuation) {
     *   return greeting + ' ' + this.user + punctuation;
     * }
     *
     * var object = { 'user': 'fred' };
     *
     * var bound = _.bind(greet, object, 'hi');
     * bound('!');
     * // => 'hi fred!'
     *
     * // Bound with placeholders.
     * var bound = _.bind(greet, object, _, '!');
     * bound('hi');
     * // => 'hi fred!'
     */
    var bind = baseRest(function(func, thisArg, partials) {
      var bitmask = WRAP_BIND_FLAG;
      if (partials.length) {
        var holders = replaceHolders(partials, getHolder(bind));
        bitmask |= WRAP_PARTIAL_FLAG;
      }
      return createWrap(func, bitmask, thisArg, partials, holders);
    });

    /**
     * Creates a function that invokes the method at `object[key]` with `partials`
     * prepended to the arguments it receives.
     *
     * This method differs from `_.bind` by allowing bound functions to reference
     * methods that may be redefined or don't yet exist. See
     * [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
     * for more details.
     *
     * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * @static
     * @memberOf _
     * @since 0.10.0
     * @category Function
     * @param {Object} object The object to invoke the method on.
     * @param {string} key The key of the method.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var object = {
     *   'user': 'fred',
     *   'greet': function(greeting, punctuation) {
     *     return greeting + ' ' + this.user + punctuation;
     *   }
     * };
     *
     * var bound = _.bindKey(object, 'greet', 'hi');
     * bound('!');
     * // => 'hi fred!'
     *
     * object.greet = function(greeting, punctuation) {
     *   return greeting + 'ya ' + this.user + punctuation;
     * };
     *
     * bound('!');
     * // => 'hiya fred!'
     *
     * // Bound with placeholders.
     * var bound = _.bindKey(object, 'greet', _, '!');
     * bound('hi');
     * // => 'hiya fred!'
     */
    var bindKey = baseRest(function(object, key, partials) {
      var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
      if (partials.length) {
        var holders = replaceHolders(partials, getHolder(bindKey));
        bitmask |= WRAP_PARTIAL_FLAG;
      }
      return createWrap(key, bitmask, object, partials, holders);
    });

    /**
     * Creates a function that accepts arguments of `func` and either invokes
     * `func` returning its result, if at least `arity` number of arguments have
     * been provided, or returns a function that accepts the remaining `func`
     * arguments, and so on. The arity of `func` may be specified if `func.length`
     * is not sufficient.
     *
     * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
     * may be used as a placeholder for provided arguments.
     *
     * **Note:** This method doesn't set the "length" property of curried functions.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Function
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var abc = function(a, b, c) {
     *   return [a, b, c];
     * };
     *
     * var curried = _.curry(abc);
     *
     * curried(1)(2)(3);
     * // => [1, 2, 3]
     *
     * curried(1, 2)(3);
     * // => [1, 2, 3]
     *
     * curried(1, 2, 3);
     * // => [1, 2, 3]
     *
     * // Curried with placeholders.
     * curried(1)(_, 3)(2);
     * // => [1, 2, 3]
     */
    function curry(func, arity, guard) {
      arity = guard ? undefined : arity;
      var result = createWrap(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
      result.placeholder = curry.placeholder;
      return result;
    }

    /**
     * This method is like `_.curry` except that arguments are applied to `func`
     * in the manner of `_.partialRight` instead of `_.partial`.
     *
     * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for provided arguments.
     *
     * **Note:** This method doesn't set the "length" property of curried functions.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var abc = function(a, b, c) {
     *   return [a, b, c];
     * };
     *
     * var curried = _.curryRight(abc);
     *
     * curried(3)(2)(1);
     * // => [1, 2, 3]
     *
     * curried(2, 3)(1);
     * // => [1, 2, 3]
     *
     * curried(1, 2, 3);
     * // => [1, 2, 3]
     *
     * // Curried with placeholders.
     * curried(3)(1, _)(2);
     * // => [1, 2, 3]
     */
    function curryRight(func, arity, guard) {
      arity = guard ? undefined : arity;
      var result = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
      result.placeholder = curryRight.placeholder;
      return result;
    }

    /**
     * Creates a debounced function that delays invoking `func` until after `wait`
     * milliseconds have elapsed since the last time the debounced function was
     * invoked. The debounced function comes with a `cancel` method to cancel
     * delayed `func` invocations and a `flush` method to immediately invoke them.
     * Provide `options` to indicate whether `func` should be invoked on the
     * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
     * with the last arguments provided to the debounced function. Subsequent
     * calls to the debounced function return the result of the last `func`
     * invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the debounced function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `_.debounce` and `_.throttle`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to debounce.
     * @param {number} [wait=0] The number of milliseconds to delay.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=false]
     *  Specify invoking on the leading edge of the timeout.
     * @param {number} [options.maxWait]
     *  The maximum time `func` is allowed to be delayed before it's invoked.
     * @param {boolean} [options.trailing=true]
     *  Specify invoking on the trailing edge of the timeout.
     * @returns {Function} Returns the new debounced function.
     * @example
     *
     * // Avoid costly calculations while the window size is in flux.
     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
     *
     * // Invoke `sendMail` when clicked, debouncing subsequent calls.
     * jQuery(element).on('click', _.debounce(sendMail, 300, {
     *   'leading': true,
     *   'trailing': false
     * }));
     *
     * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
     * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
     * var source = new EventSource('/stream');
     * jQuery(source).on('message', debounced);
     *
     * // Cancel the trailing debounced invocation.
     * jQuery(window).on('popstate', debounced.cancel);
     */
    function debounce(func, wait, options) {
      var lastArgs,
          lastThis,
          maxWait,
          result,
          timerId,
          lastCallTime,
          lastInvokeTime = 0,
          leading = false,
          maxing = false,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }

      function invokeFunc(time) {
        var args = lastArgs,
            thisArg = lastThis;

        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }

      function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time;
        // Start the timer for the trailing edge.
        timerId = setTimeout(timerExpired, wait);
        // Invoke the leading edge.
        return leading ? invokeFunc(time) : result;
      }

      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime,
            timeWaiting = wait - timeSinceLastCall;

        return maxing
          ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
          : timeWaiting;
      }

      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime;

        // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
          (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
      }

      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        // Restart the timer.
        timerId = setTimeout(timerExpired, remainingWait(time));
      }

      function trailingEdge(time) {
        timerId = undefined;

        // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = undefined;
        return result;
      }

      function cancel() {
        if (timerId !== undefined) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
      }

      function flush() {
        return timerId === undefined ? result : trailingEdge(now());
      }

      function debounced() {
        var time = now(),
            isInvoking = shouldInvoke(time);

        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;

        if (isInvoking) {
          if (timerId === undefined) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            // Handle invocations in a tight loop.
            clearTimeout(timerId);
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === undefined) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }

    /**
     * Defers invoking the `func` until the current call stack has cleared. Any
     * additional arguments are provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to defer.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.defer(function(text) {
     *   console.log(text);
     * }, 'deferred');
     * // => Logs 'deferred' after one millisecond.
     */
    var defer = baseRest(function(func, args) {
      return baseDelay(func, 1, args);
    });

    /**
     * Invokes `func` after `wait` milliseconds. Any additional arguments are
     * provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.delay(function(text) {
     *   console.log(text);
     * }, 1000, 'later');
     * // => Logs 'later' after one second.
     */
    var delay = baseRest(function(func, wait, args) {
      return baseDelay(func, toNumber(wait) || 0, args);
    });

    /**
     * Creates a function that invokes `func` with arguments reversed.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Function
     * @param {Function} func The function to flip arguments for.
     * @returns {Function} Returns the new flipped function.
     * @example
     *
     * var flipped = _.flip(function() {
     *   return _.toArray(arguments);
     * });
     *
     * flipped('a', 'b', 'c', 'd');
     * // => ['d', 'c', 'b', 'a']
     */
    function flip(func) {
      return createWrap(func, WRAP_FLIP_FLAG);
    }

    /**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided, it determines the cache key for storing the result based on the
     * arguments provided to the memoized function. By default, the first argument
     * provided to the memoized function is used as the map cache key. The `func`
     * is invoked with the `this` binding of the memoized function.
     *
     * **Note:** The cache is exposed as the `cache` property on the memoized
     * function. Its creation may be customized by replacing the `_.memoize.Cache`
     * constructor with one whose instances implement the
     * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
     * method interface of `clear`, `delete`, `get`, `has`, and `set`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] The function to resolve the cache key.
     * @returns {Function} Returns the new memoized function.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     * var other = { 'c': 3, 'd': 4 };
     *
     * var values = _.memoize(_.values);
     * values(object);
     * // => [1, 2]
     *
     * values(other);
     * // => [3, 4]
     *
     * object.a = 2;
     * values(object);
     * // => [1, 2]
     *
     * // Modify the result cache.
     * values.cache.set(object, ['a', 'b']);
     * values(object);
     * // => ['a', 'b']
     *
     * // Replace `_.memoize.Cache`.
     * _.memoize.Cache = WeakMap;
     */
    function memoize(func, resolver) {
      if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0],
            cache = memoized.cache;

        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result) || cache;
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache);
      return memoized;
    }

    // Expose `MapCache`.
    memoize.Cache = MapCache;

    /**
     * Creates a function that negates the result of the predicate `func`. The
     * `func` predicate is invoked with the `this` binding and arguments of the
     * created function.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} predicate The predicate to negate.
     * @returns {Function} Returns the new negated function.
     * @example
     *
     * function isEven(n) {
     *   return n % 2 == 0;
     * }
     *
     * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
     * // => [1, 3, 5]
     */
    function negate(predicate) {
      if (typeof predicate != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return function() {
        var args = arguments;
        switch (args.length) {
          case 0: return !predicate.call(this);
          case 1: return !predicate.call(this, args[0]);
          case 2: return !predicate.call(this, args[0], args[1]);
          case 3: return !predicate.call(this, args[0], args[1], args[2]);
        }
        return !predicate.apply(this, args);
      };
    }

    /**
     * Creates a function that is restricted to invoking `func` once. Repeat calls
     * to the function return the value of the first invocation. The `func` is
     * invoked with the `this` binding and arguments of the created function.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var initialize = _.once(createApplication);
     * initialize();
     * initialize();
     * // => `createApplication` is invoked once
     */
    function once(func) {
      return before(2, func);
    }

    /**
     * Creates a function that invokes `func` with its arguments transformed.
     *
     * @static
     * @since 4.0.0
     * @memberOf _
     * @category Function
     * @param {Function} func The function to wrap.
     * @param {...(Function|Function[])} [transforms=[_.identity]]
     *  The argument transforms.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function doubled(n) {
     *   return n * 2;
     * }
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var func = _.overArgs(function(x, y) {
     *   return [x, y];
     * }, [square, doubled]);
     *
     * func(9, 3);
     * // => [81, 6]
     *
     * func(10, 5);
     * // => [100, 10]
     */
    var overArgs = castRest(function(func, transforms) {
      transforms = (transforms.length == 1 && isArray(transforms[0]))
        ? arrayMap(transforms[0], baseUnary(getIteratee()))
        : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));

      var funcsLength = transforms.length;
      return baseRest(function(args) {
        var index = -1,
            length = nativeMin(args.length, funcsLength);

        while (++index < length) {
          args[index] = transforms[index].call(this, args[index]);
        }
        return apply(func, this, args);
      });
    });

    /**
     * Creates a function that invokes `func` with `partials` prepended to the
     * arguments it receives. This method is like `_.bind` except it does **not**
     * alter the `this` binding.
     *
     * The `_.partial.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * **Note:** This method doesn't set the "length" property of partially
     * applied functions.
     *
     * @static
     * @memberOf _
     * @since 0.2.0
     * @category Function
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * function greet(greeting, name) {
     *   return greeting + ' ' + name;
     * }
     *
     * var sayHelloTo = _.partial(greet, 'hello');
     * sayHelloTo('fred');
     * // => 'hello fred'
     *
     * // Partially applied with placeholders.
     * var greetFred = _.partial(greet, _, 'fred');
     * greetFred('hi');
     * // => 'hi fred'
     */
    var partial = baseRest(function(func, partials) {
      var holders = replaceHolders(partials, getHolder(partial));
      return createWrap(func, WRAP_PARTIAL_FLAG, undefined, partials, holders);
    });

    /**
     * This method is like `_.partial` except that partially applied arguments
     * are appended to the arguments it receives.
     *
     * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * **Note:** This method doesn't set the "length" property of partially
     * applied functions.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Function
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * function greet(greeting, name) {
     *   return greeting + ' ' + name;
     * }
     *
     * var greetFred = _.partialRight(greet, 'fred');
     * greetFred('hi');
     * // => 'hi fred'
     *
     * // Partially applied with placeholders.
     * var sayHelloTo = _.partialRight(greet, 'hello', _);
     * sayHelloTo('fred');
     * // => 'hello fred'
     */
    var partialRight = baseRest(function(func, partials) {
      var holders = replaceHolders(partials, getHolder(partialRight));
      return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined, partials, holders);
    });

    /**
     * Creates a function that invokes `func` with arguments arranged according
     * to the specified `indexes` where the argument value at the first index is
     * provided as the first argument, the argument value at the second index is
     * provided as the second argument, and so on.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} func The function to rearrange arguments for.
     * @param {...(number|number[])} indexes The arranged argument indexes.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var rearged = _.rearg(function(a, b, c) {
     *   return [a, b, c];
     * }, [2, 0, 1]);
     *
     * rearged('b', 'c', 'a')
     * // => ['a', 'b', 'c']
     */
    var rearg = flatRest(function(func, indexes) {
      return createWrap(func, WRAP_REARG_FLAG, undefined, undefined, undefined, indexes);
    });

    /**
     * Creates a function that invokes `func` with the `this` binding of the
     * created function and arguments from `start` and beyond provided as
     * an array.
     *
     * **Note:** This method is based on the
     * [rest parameter](https://mdn.io/rest_parameters).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Function
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.rest(function(what, names) {
     *   return what + ' ' + _.initial(names).join(', ') +
     *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
     * });
     *
     * say('hello', 'fred', 'barney', 'pebbles');
     * // => 'hello fred, barney, & pebbles'
     */
    function rest(func, start) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      start = start === undefined ? start : toInteger(start);
      return baseRest(func, start);
    }

    /**
     * Creates a function that invokes `func` with the `this` binding of the
     * create function and an array of arguments much like
     * [`Function#apply`](http://www.ecma-international.org/ecma-262/7.0/#sec-function.prototype.apply).
     *
     * **Note:** This method is based on the
     * [spread operator](https://mdn.io/spread_operator).
     *
     * @static
     * @memberOf _
     * @since 3.2.0
     * @category Function
     * @param {Function} func The function to spread arguments over.
     * @param {number} [start=0] The start position of the spread.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.spread(function(who, what) {
     *   return who + ' says ' + what;
     * });
     *
     * say(['fred', 'hello']);
     * // => 'fred says hello'
     *
     * var numbers = Promise.all([
     *   Promise.resolve(40),
     *   Promise.resolve(36)
     * ]);
     *
     * numbers.then(_.spread(function(x, y) {
     *   return x + y;
     * }));
     * // => a Promise of 76
     */
    function spread(func, start) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      start = start == null ? 0 : nativeMax(toInteger(start), 0);
      return baseRest(function(args) {
        var array = args[start],
            otherArgs = castSlice(args, 0, start);

        if (array) {
          arrayPush(otherArgs, array);
        }
        return apply(func, this, otherArgs);
      });
    }

    /**
     * Creates a throttled function that only invokes `func` at most once per
     * every `wait` milliseconds. The throttled function comes with a `cancel`
     * method to cancel delayed `func` invocations and a `flush` method to
     * immediately invoke them. Provide `options` to indicate whether `func`
     * should be invoked on the leading and/or trailing edge of the `wait`
     * timeout. The `func` is invoked with the last arguments provided to the
     * throttled function. Subsequent calls to the throttled function return the
     * result of the last `func` invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the throttled function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `_.throttle` and `_.debounce`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to throttle.
     * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=true]
     *  Specify invoking on the leading edge of the timeout.
     * @param {boolean} [options.trailing=true]
     *  Specify invoking on the trailing edge of the timeout.
     * @returns {Function} Returns the new throttled function.
     * @example
     *
     * // Avoid excessively updating the position while scrolling.
     * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
     *
     * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
     * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
     * jQuery(element).on('click', throttled);
     *
     * // Cancel the trailing throttled invocation.
     * jQuery(window).on('popstate', throttled.cancel);
     */
    function throttle(func, wait, options) {
      var leading = true,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      if (isObject(options)) {
        leading = 'leading' in options ? !!options.leading : leading;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }
      return debounce(func, wait, {
        'leading': leading,
        'maxWait': wait,
        'trailing': trailing
      });
    }

    /**
     * Creates a function that accepts up to one argument, ignoring any
     * additional arguments.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Function
     * @param {Function} func The function to cap arguments for.
     * @returns {Function} Returns the new capped function.
     * @example
     *
     * _.map(['6', '8', '10'], _.unary(parseInt));
     * // => [6, 8, 10]
     */
    function unary(func) {
      return ary(func, 1);
    }

    /**
     * Creates a function that provides `value` to `wrapper` as its first
     * argument. Any additional arguments provided to the function are appended
     * to those provided to the `wrapper`. The wrapper is invoked with the `this`
     * binding of the created function.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {*} value The value to wrap.
     * @param {Function} [wrapper=identity] The wrapper function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var p = _.wrap(_.escape, function(func, text) {
     *   return '<p>' + func(text) + '</p>';
     * });
     *
     * p('fred, barney, & pebbles');
     * // => '<p>fred, barney, &amp; pebbles</p>'
     */
    function wrap(value, wrapper) {
      return partial(castFunction(wrapper), value);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Casts `value` as an array if it's not one.
     *
     * @static
     * @memberOf _
     * @since 4.4.0
     * @category Lang
     * @param {*} value The value to inspect.
     * @returns {Array} Returns the cast array.
     * @example
     *
     * _.castArray(1);
     * // => [1]
     *
     * _.castArray({ 'a': 1 });
     * // => [{ 'a': 1 }]
     *
     * _.castArray('abc');
     * // => ['abc']
     *
     * _.castArray(null);
     * // => [null]
     *
     * _.castArray(undefined);
     * // => [undefined]
     *
     * _.castArray();
     * // => []
     *
     * var array = [1, 2, 3];
     * console.log(_.castArray(array) === array);
     * // => true
     */
    function castArray() {
      if (!arguments.length) {
        return [];
      }
      var value = arguments[0];
      return isArray(value) ? value : [value];
    }

    /**
     * Creates a shallow clone of `value`.
     *
     * **Note:** This method is loosely based on the
     * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
     * and supports cloning arrays, array buffers, booleans, date objects, maps,
     * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
     * arrays. The own enumerable properties of `arguments` objects are cloned
     * as plain objects. An empty object is returned for uncloneable values such
     * as error objects, functions, DOM nodes, and WeakMaps.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to clone.
     * @returns {*} Returns the cloned value.
     * @see _.cloneDeep
     * @example
     *
     * var objects = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var shallow = _.clone(objects);
     * console.log(shallow[0] === objects[0]);
     * // => true
     */
    function clone(value) {
      return baseClone(value, CLONE_SYMBOLS_FLAG);
    }

    /**
     * This method is like `_.clone` except that it accepts `customizer` which
     * is invoked to produce the cloned value. If `customizer` returns `undefined`,
     * cloning is handled by the method instead. The `customizer` is invoked with
     * up to four arguments; (value [, index|key, object, stack]).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to clone.
     * @param {Function} [customizer] The function to customize cloning.
     * @returns {*} Returns the cloned value.
     * @see _.cloneDeepWith
     * @example
     *
     * function customizer(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(false);
     *   }
     * }
     *
     * var el = _.cloneWith(document.body, customizer);
     *
     * console.log(el === document.body);
     * // => false
     * console.log(el.nodeName);
     * // => 'BODY'
     * console.log(el.childNodes.length);
     * // => 0
     */
    function cloneWith(value, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
    }

    /**
     * This method is like `_.clone` except that it recursively clones `value`.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Lang
     * @param {*} value The value to recursively clone.
     * @returns {*} Returns the deep cloned value.
     * @see _.clone
     * @example
     *
     * var objects = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var deep = _.cloneDeep(objects);
     * console.log(deep[0] === objects[0]);
     * // => false
     */
    function cloneDeep(value) {
      return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
    }

    /**
     * This method is like `_.cloneWith` except that it recursively clones `value`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to recursively clone.
     * @param {Function} [customizer] The function to customize cloning.
     * @returns {*} Returns the deep cloned value.
     * @see _.cloneWith
     * @example
     *
     * function customizer(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(true);
     *   }
     * }
     *
     * var el = _.cloneDeepWith(document.body, customizer);
     *
     * console.log(el === document.body);
     * // => false
     * console.log(el.nodeName);
     * // => 'BODY'
     * console.log(el.childNodes.length);
     * // => 20
     */
    function cloneDeepWith(value, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
    }

    /**
     * Checks if `object` conforms to `source` by invoking the predicate
     * properties of `source` with the corresponding property values of `object`.
     *
     * **Note:** This method is equivalent to `_.conforms` when `source` is
     * partially applied.
     *
     * @static
     * @memberOf _
     * @since 4.14.0
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property predicates to conform to.
     * @returns {boolean} Returns `true` if `object` conforms, else `false`.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     *
     * _.conformsTo(object, { 'b': function(n) { return n > 1; } });
     * // => true
     *
     * _.conformsTo(object, { 'b': function(n) { return n > 2; } });
     * // => false
     */
    function conformsTo(object, source) {
      return source == null || baseConformsTo(object, source, keys(source));
    }

    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */
    function eq(value, other) {
      return value === other || (value !== value && other !== other);
    }

    /**
     * Checks if `value` is greater than `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than `other`,
     *  else `false`.
     * @see _.lt
     * @example
     *
     * _.gt(3, 1);
     * // => true
     *
     * _.gt(3, 3);
     * // => false
     *
     * _.gt(1, 3);
     * // => false
     */
    var gt = createRelationalOperation(baseGt);

    /**
     * Checks if `value` is greater than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than or equal to
     *  `other`, else `false`.
     * @see _.lte
     * @example
     *
     * _.gte(3, 1);
     * // => true
     *
     * _.gte(3, 3);
     * // => true
     *
     * _.gte(1, 3);
     * // => false
     */
    var gte = createRelationalOperation(function(value, other) {
      return value >= other;
    });

    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
        !propertyIsEnumerable.call(value, 'callee');
    };

    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */
    var isArray = Array.isArray;

    /**
     * Checks if `value` is classified as an `ArrayBuffer` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
     * @example
     *
     * _.isArrayBuffer(new ArrayBuffer(2));
     * // => true
     *
     * _.isArrayBuffer(new Array(2));
     * // => false
     */
    var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;

    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }

    /**
     * This method is like `_.isArrayLike` except that it also checks if `value`
     * is an object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array-like object,
     *  else `false`.
     * @example
     *
     * _.isArrayLikeObject([1, 2, 3]);
     * // => true
     *
     * _.isArrayLikeObject(document.body.children);
     * // => true
     *
     * _.isArrayLikeObject('abc');
     * // => false
     *
     * _.isArrayLikeObject(_.noop);
     * // => false
     */
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }

    /**
     * Checks if `value` is classified as a boolean primitive or object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
     * @example
     *
     * _.isBoolean(false);
     * // => true
     *
     * _.isBoolean(null);
     * // => false
     */
    function isBoolean(value) {
      return value === true || value === false ||
        (isObjectLike(value) && baseGetTag(value) == boolTag);
    }

    /**
     * Checks if `value` is a buffer.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
     * @example
     *
     * _.isBuffer(new Buffer(2));
     * // => true
     *
     * _.isBuffer(new Uint8Array(2));
     * // => false
     */
    var isBuffer = nativeIsBuffer || stubFalse;

    /**
     * Checks if `value` is classified as a `Date` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
     * @example
     *
     * _.isDate(new Date);
     * // => true
     *
     * _.isDate('Mon April 23 2012');
     * // => false
     */
    var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;

    /**
     * Checks if `value` is likely a DOM element.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
     * @example
     *
     * _.isElement(document.body);
     * // => true
     *
     * _.isElement('<body>');
     * // => false
     */
    function isElement(value) {
      return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
    }

    /**
     * Checks if `value` is an empty object, collection, map, or set.
     *
     * Objects are considered empty if they have no own enumerable string keyed
     * properties.
     *
     * Array-like values such as `arguments` objects, arrays, buffers, strings, or
     * jQuery-like collections are considered empty if they have a `length` of `0`.
     * Similarly, maps and sets are considered empty if they have a `size` of `0`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is empty, else `false`.
     * @example
     *
     * _.isEmpty(null);
     * // => true
     *
     * _.isEmpty(true);
     * // => true
     *
     * _.isEmpty(1);
     * // => true
     *
     * _.isEmpty([1, 2, 3]);
     * // => false
     *
     * _.isEmpty({ 'a': 1 });
     * // => false
     */
    function isEmpty(value) {
      if (value == null) {
        return true;
      }
      if (isArrayLike(value) &&
          (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
            isBuffer(value) || isTypedArray(value) || isArguments(value))) {
        return !value.length;
      }
      var tag = getTag(value);
      if (tag == mapTag || tag == setTag) {
        return !value.size;
      }
      if (isPrototype(value)) {
        return !baseKeys(value).length;
      }
      for (var key in value) {
        if (hasOwnProperty.call(value, key)) {
          return false;
        }
      }
      return true;
    }

    /**
     * Performs a deep comparison between two values to determine if they are
     * equivalent.
     *
     * **Note:** This method supports comparing arrays, array buffers, booleans,
     * date objects, error objects, maps, numbers, `Object` objects, regexes,
     * sets, strings, symbols, and typed arrays. `Object` objects are compared
     * by their own, not inherited, enumerable properties. Functions and DOM
     * nodes are compared by strict equality, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.isEqual(object, other);
     * // => true
     *
     * object === other;
     * // => false
     */
    function isEqual(value, other) {
      return baseIsEqual(value, other);
    }

    /**
     * This method is like `_.isEqual` except that it accepts `customizer` which
     * is invoked to compare values. If `customizer` returns `undefined`, comparisons
     * are handled by the method instead. The `customizer` is invoked with up to
     * six arguments: (objValue, othValue [, index|key, object, other, stack]).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * function isGreeting(value) {
     *   return /^h(?:i|ello)$/.test(value);
     * }
     *
     * function customizer(objValue, othValue) {
     *   if (isGreeting(objValue) && isGreeting(othValue)) {
     *     return true;
     *   }
     * }
     *
     * var array = ['hello', 'goodbye'];
     * var other = ['hi', 'goodbye'];
     *
     * _.isEqualWith(array, other, customizer);
     * // => true
     */
    function isEqualWith(value, other, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      var result = customizer ? customizer(value, other) : undefined;
      return result === undefined ? baseIsEqual(value, other, undefined, customizer) : !!result;
    }

    /**
     * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
     * `SyntaxError`, `TypeError`, or `URIError` object.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
     * @example
     *
     * _.isError(new Error);
     * // => true
     *
     * _.isError(Error);
     * // => false
     */
    function isError(value) {
      if (!isObjectLike(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == errorTag || tag == domExcTag ||
        (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value));
    }

    /**
     * Checks if `value` is a finite primitive number.
     *
     * **Note:** This method is based on
     * [`Number.isFinite`](https://mdn.io/Number/isFinite).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
     * @example
     *
     * _.isFinite(3);
     * // => true
     *
     * _.isFinite(Number.MIN_VALUE);
     * // => true
     *
     * _.isFinite(Infinity);
     * // => false
     *
     * _.isFinite('3');
     * // => false
     */
    function isFinite(value) {
      return typeof value == 'number' && nativeIsFinite(value);
    }

    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 9 which returns 'object' for typed arrays and other constructors.
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }

    /**
     * Checks if `value` is an integer.
     *
     * **Note:** This method is based on
     * [`Number.isInteger`](https://mdn.io/Number/isInteger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
     * @example
     *
     * _.isInteger(3);
     * // => true
     *
     * _.isInteger(Number.MIN_VALUE);
     * // => false
     *
     * _.isInteger(Infinity);
     * // => false
     *
     * _.isInteger('3');
     * // => false
     */
    function isInteger(value) {
      return typeof value == 'number' && value == toInteger(value);
    }

    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */
    function isLength(value) {
      return typeof value == 'number' &&
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == 'object' || type == 'function');
    }

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return value != null && typeof value == 'object';
    }

    /**
     * Checks if `value` is classified as a `Map` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
     * @example
     *
     * _.isMap(new Map);
     * // => true
     *
     * _.isMap(new WeakMap);
     * // => false
     */
    var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

    /**
     * Performs a partial deep comparison between `object` and `source` to
     * determine if `object` contains equivalent property values.
     *
     * **Note:** This method is equivalent to `_.matches` when `source` is
     * partially applied.
     *
     * Partial comparisons will match empty array and empty object `source`
     * values against any array or object value, respectively. See `_.isEqual`
     * for a list of supported value comparisons.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     *
     * _.isMatch(object, { 'b': 2 });
     * // => true
     *
     * _.isMatch(object, { 'b': 1 });
     * // => false
     */
    function isMatch(object, source) {
      return object === source || baseIsMatch(object, source, getMatchData(source));
    }

    /**
     * This method is like `_.isMatch` except that it accepts `customizer` which
     * is invoked to compare values. If `customizer` returns `undefined`, comparisons
     * are handled by the method instead. The `customizer` is invoked with five
     * arguments: (objValue, srcValue, index|key, object, source).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     * @example
     *
     * function isGreeting(value) {
     *   return /^h(?:i|ello)$/.test(value);
     * }
     *
     * function customizer(objValue, srcValue) {
     *   if (isGreeting(objValue) && isGreeting(srcValue)) {
     *     return true;
     *   }
     * }
     *
     * var object = { 'greeting': 'hello' };
     * var source = { 'greeting': 'hi' };
     *
     * _.isMatchWith(object, source, customizer);
     * // => true
     */
    function isMatchWith(object, source, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return baseIsMatch(object, source, getMatchData(source), customizer);
    }

    /**
     * Checks if `value` is `NaN`.
     *
     * **Note:** This method is based on
     * [`Number.isNaN`](https://mdn.io/Number/isNaN) and is not the same as
     * global [`isNaN`](https://mdn.io/isNaN) which returns `true` for
     * `undefined` and other non-number values.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
     * @example
     *
     * _.isNaN(NaN);
     * // => true
     *
     * _.isNaN(new Number(NaN));
     * // => true
     *
     * isNaN(undefined);
     * // => true
     *
     * _.isNaN(undefined);
     * // => false
     */
    function isNaN(value) {
      // An `NaN` primitive is the only value that is not equal to itself.
      // Perform the `toStringTag` check first to avoid errors with some
      // ActiveX objects in IE.
      return isNumber(value) && value != +value;
    }

    /**
     * Checks if `value` is a pristine native function.
     *
     * **Note:** This method can't reliably detect native functions in the presence
     * of the core-js package because core-js circumvents this kind of detection.
     * Despite multiple requests, the core-js maintainer has made it clear: any
     * attempt to fix the detection will be obstructed. As a result, we're left
     * with little choice but to throw an error. Unfortunately, this also affects
     * packages, like [babel-polyfill](https://www.npmjs.com/package/babel-polyfill),
     * which rely on core-js.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     * @example
     *
     * _.isNative(Array.prototype.push);
     * // => true
     *
     * _.isNative(_);
     * // => false
     */
    function isNative(value) {
      if (isMaskable(value)) {
        throw new Error(CORE_ERROR_TEXT);
      }
      return baseIsNative(value);
    }

    /**
     * Checks if `value` is `null`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
     * @example
     *
     * _.isNull(null);
     * // => true
     *
     * _.isNull(void 0);
     * // => false
     */
    function isNull(value) {
      return value === null;
    }

    /**
     * Checks if `value` is `null` or `undefined`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
     * @example
     *
     * _.isNil(null);
     * // => true
     *
     * _.isNil(void 0);
     * // => true
     *
     * _.isNil(NaN);
     * // => false
     */
    function isNil(value) {
      return value == null;
    }

    /**
     * Checks if `value` is classified as a `Number` primitive or object.
     *
     * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
     * classified as numbers, use the `_.isFinite` method.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a number, else `false`.
     * @example
     *
     * _.isNumber(3);
     * // => true
     *
     * _.isNumber(Number.MIN_VALUE);
     * // => true
     *
     * _.isNumber(Infinity);
     * // => true
     *
     * _.isNumber('3');
     * // => false
     */
    function isNumber(value) {
      return typeof value == 'number' ||
        (isObjectLike(value) && baseGetTag(value) == numberTag);
    }

    /**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * @static
     * @memberOf _
     * @since 0.8.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */
    function isPlainObject(value) {
      if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
        return false;
      }
      var proto = getPrototype(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
      return typeof Ctor == 'function' && Ctor instanceof Ctor &&
        funcToString.call(Ctor) == objectCtorString;
    }

    /**
     * Checks if `value` is classified as a `RegExp` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
     * @example
     *
     * _.isRegExp(/abc/);
     * // => true
     *
     * _.isRegExp('/abc/');
     * // => false
     */
    var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;

    /**
     * Checks if `value` is a safe integer. An integer is safe if it's an IEEE-754
     * double precision number which isn't the result of a rounded unsafe integer.
     *
     * **Note:** This method is based on
     * [`Number.isSafeInteger`](https://mdn.io/Number/isSafeInteger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a safe integer, else `false`.
     * @example
     *
     * _.isSafeInteger(3);
     * // => true
     *
     * _.isSafeInteger(Number.MIN_VALUE);
     * // => false
     *
     * _.isSafeInteger(Infinity);
     * // => false
     *
     * _.isSafeInteger('3');
     * // => false
     */
    function isSafeInteger(value) {
      return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
    }

    /**
     * Checks if `value` is classified as a `Set` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
     * @example
     *
     * _.isSet(new Set);
     * // => true
     *
     * _.isSet(new WeakSet);
     * // => false
     */
    var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

    /**
     * Checks if `value` is classified as a `String` primitive or object.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a string, else `false`.
     * @example
     *
     * _.isString('abc');
     * // => true
     *
     * _.isString(1);
     * // => false
     */
    function isString(value) {
      return typeof value == 'string' ||
        (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
    }

    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol(value) {
      return typeof value == 'symbol' ||
        (isObjectLike(value) && baseGetTag(value) == symbolTag);
    }

    /**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

    /**
     * Checks if `value` is `undefined`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
     * @example
     *
     * _.isUndefined(void 0);
     * // => true
     *
     * _.isUndefined(null);
     * // => false
     */
    function isUndefined(value) {
      return value === undefined;
    }

    /**
     * Checks if `value` is classified as a `WeakMap` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a weak map, else `false`.
     * @example
     *
     * _.isWeakMap(new WeakMap);
     * // => true
     *
     * _.isWeakMap(new Map);
     * // => false
     */
    function isWeakMap(value) {
      return isObjectLike(value) && getTag(value) == weakMapTag;
    }

    /**
     * Checks if `value` is classified as a `WeakSet` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a weak set, else `false`.
     * @example
     *
     * _.isWeakSet(new WeakSet);
     * // => true
     *
     * _.isWeakSet(new Set);
     * // => false
     */
    function isWeakSet(value) {
      return isObjectLike(value) && baseGetTag(value) == weakSetTag;
    }

    /**
     * Checks if `value` is less than `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than `other`,
     *  else `false`.
     * @see _.gt
     * @example
     *
     * _.lt(1, 3);
     * // => true
     *
     * _.lt(3, 3);
     * // => false
     *
     * _.lt(3, 1);
     * // => false
     */
    var lt = createRelationalOperation(baseLt);

    /**
     * Checks if `value` is less than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than or equal to
     *  `other`, else `false`.
     * @see _.gte
     * @example
     *
     * _.lte(1, 3);
     * // => true
     *
     * _.lte(3, 3);
     * // => true
     *
     * _.lte(3, 1);
     * // => false
     */
    var lte = createRelationalOperation(function(value, other) {
      return value <= other;
    });

    /**
     * Converts `value` to an array.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Array} Returns the converted array.
     * @example
     *
     * _.toArray({ 'a': 1, 'b': 2 });
     * // => [1, 2]
     *
     * _.toArray('abc');
     * // => ['a', 'b', 'c']
     *
     * _.toArray(1);
     * // => []
     *
     * _.toArray(null);
     * // => []
     */
    function toArray(value) {
      if (!value) {
        return [];
      }
      if (isArrayLike(value)) {
        return isString(value) ? stringToArray(value) : copyArray(value);
      }
      if (symIterator && value[symIterator]) {
        return iteratorToArray(value[symIterator]());
      }
      var tag = getTag(value),
          func = tag == mapTag ? mapToArray : (tag == setTag ? setToArray : values);

      return func(value);
    }

    /**
     * Converts `value` to a finite number.
     *
     * @static
     * @memberOf _
     * @since 4.12.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted number.
     * @example
     *
     * _.toFinite(3.2);
     * // => 3.2
     *
     * _.toFinite(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toFinite(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toFinite('3.2');
     * // => 3.2
     */
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = (value < 0 ? -1 : 1);
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }

    /**
     * Converts `value` to an integer.
     *
     * **Note:** This method is loosely based on
     * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toInteger(3.2);
     * // => 3
     *
     * _.toInteger(Number.MIN_VALUE);
     * // => 0
     *
     * _.toInteger(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toInteger('3.2');
     * // => 3
     */
    function toInteger(value) {
      var result = toFinite(value),
          remainder = result % 1;

      return result === result ? (remainder ? result - remainder : result) : 0;
    }

    /**
     * Converts `value` to an integer suitable for use as the length of an
     * array-like object.
     *
     * **Note:** This method is based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toLength(3.2);
     * // => 3
     *
     * _.toLength(Number.MIN_VALUE);
     * // => 0
     *
     * _.toLength(Infinity);
     * // => 4294967295
     *
     * _.toLength('3.2');
     * // => 3
     */
    function toLength(value) {
      return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
    }

    /**
     * Converts `value` to a number.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     * @example
     *
     * _.toNumber(3.2);
     * // => 3.2
     *
     * _.toNumber(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toNumber(Infinity);
     * // => Infinity
     *
     * _.toNumber('3.2');
     * // => 3.2
     */
    function toNumber(value) {
      if (typeof value == 'number') {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
        value = isObject(other) ? (other + '') : other;
      }
      if (typeof value != 'string') {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, '');
      var isBinary = reIsBinary.test(value);
      return (isBinary || reIsOctal.test(value))
        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
        : (reIsBadHex.test(value) ? NAN : +value);
    }

    /**
     * Converts `value` to a plain object flattening inherited enumerable string
     * keyed properties of `value` to own properties of the plain object.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Object} Returns the converted plain object.
     * @example
     *
     * function Foo() {
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.assign({ 'a': 1 }, new Foo);
     * // => { 'a': 1, 'b': 2 }
     *
     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
     * // => { 'a': 1, 'b': 2, 'c': 3 }
     */
    function toPlainObject(value) {
      return copyObject(value, keysIn(value));
    }

    /**
     * Converts `value` to a safe integer. A safe integer can be compared and
     * represented correctly.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toSafeInteger(3.2);
     * // => 3
     *
     * _.toSafeInteger(Number.MIN_VALUE);
     * // => 0
     *
     * _.toSafeInteger(Infinity);
     * // => 9007199254740991
     *
     * _.toSafeInteger('3.2');
     * // => 3
     */
    function toSafeInteger(value) {
      return value
        ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER)
        : (value === 0 ? value : 0);
    }

    /**
     * Converts `value` to a string. An empty string is returned for `null`
     * and `undefined` values. The sign of `-0` is preserved.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */
    function toString(value) {
      return value == null ? '' : baseToString(value);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Assigns own enumerable string keyed properties of source objects to the
     * destination object. Source objects are applied from left to right.
     * Subsequent sources overwrite property assignments of previous sources.
     *
     * **Note:** This method mutates `object` and is loosely based on
     * [`Object.assign`](https://mdn.io/Object/assign).
     *
     * @static
     * @memberOf _
     * @since 0.10.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.assignIn
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * function Bar() {
     *   this.c = 3;
     * }
     *
     * Foo.prototype.b = 2;
     * Bar.prototype.d = 4;
     *
     * _.assign({ 'a': 0 }, new Foo, new Bar);
     * // => { 'a': 1, 'c': 3 }
     */
    var assign = createAssigner(function(object, source) {
      if (isPrototype(source) || isArrayLike(source)) {
        copyObject(source, keys(source), object);
        return;
      }
      for (var key in source) {
        if (hasOwnProperty.call(source, key)) {
          assignValue(object, key, source[key]);
        }
      }
    });

    /**
     * This method is like `_.assign` except that it iterates over own and
     * inherited source properties.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias extend
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.assign
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * function Bar() {
     *   this.c = 3;
     * }
     *
     * Foo.prototype.b = 2;
     * Bar.prototype.d = 4;
     *
     * _.assignIn({ 'a': 0 }, new Foo, new Bar);
     * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
     */
    var assignIn = createAssigner(function(object, source) {
      copyObject(source, keysIn(source), object);
    });

    /**
     * This method is like `_.assignIn` except that it accepts `customizer`
     * which is invoked to produce the assigned values. If `customizer` returns
     * `undefined`, assignment is handled by the method instead. The `customizer`
     * is invoked with five arguments: (objValue, srcValue, key, object, source).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias extendWith
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @see _.assignWith
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   return _.isUndefined(objValue) ? srcValue : objValue;
     * }
     *
     * var defaults = _.partialRight(_.assignInWith, customizer);
     *
     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */
    var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
      copyObject(source, keysIn(source), object, customizer);
    });

    /**
     * This method is like `_.assign` except that it accepts `customizer`
     * which is invoked to produce the assigned values. If `customizer` returns
     * `undefined`, assignment is handled by the method instead. The `customizer`
     * is invoked with five arguments: (objValue, srcValue, key, object, source).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @see _.assignInWith
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   return _.isUndefined(objValue) ? srcValue : objValue;
     * }
     *
     * var defaults = _.partialRight(_.assignWith, customizer);
     *
     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */
    var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
      copyObject(source, keys(source), object, customizer);
    });

    /**
     * Creates an array of values corresponding to `paths` of `object`.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {...(string|string[])} [paths] The property paths to pick.
     * @returns {Array} Returns the picked values.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
     *
     * _.at(object, ['a[0].b.c', 'a[1]']);
     * // => [3, 4]
     */
    var at = flatRest(baseAt);

    /**
     * Creates an object that inherits from the `prototype` object. If a
     * `properties` object is given, its own enumerable string keyed properties
     * are assigned to the created object.
     *
     * @static
     * @memberOf _
     * @since 2.3.0
     * @category Object
     * @param {Object} prototype The object to inherit from.
     * @param {Object} [properties] The properties to assign to the object.
     * @returns {Object} Returns the new object.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * function Circle() {
     *   Shape.call(this);
     * }
     *
     * Circle.prototype = _.create(Shape.prototype, {
     *   'constructor': Circle
     * });
     *
     * var circle = new Circle;
     * circle instanceof Circle;
     * // => true
     *
     * circle instanceof Shape;
     * // => true
     */
    function create(prototype, properties) {
      var result = baseCreate(prototype);
      return properties == null ? result : baseAssign(result, properties);
    }

    /**
     * Assigns own and inherited enumerable string keyed properties of source
     * objects to the destination object for all destination properties that
     * resolve to `undefined`. Source objects are applied from left to right.
     * Once a property is set, additional values of the same property are ignored.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.defaultsDeep
     * @example
     *
     * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */
    var defaults = baseRest(function(object, sources) {
      object = Object(object);

      var index = -1;
      var length = sources.length;
      var guard = length > 2 ? sources[2] : undefined;

      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        length = 1;
      }

      while (++index < length) {
        var source = sources[index];
        var props = keysIn(source);
        var propsIndex = -1;
        var propsLength = props.length;

        while (++propsIndex < propsLength) {
          var key = props[propsIndex];
          var value = object[key];

          if (value === undefined ||
              (eq(value, objectProto[key]) && !hasOwnProperty.call(object, key))) {
            object[key] = source[key];
          }
        }
      }

      return object;
    });

    /**
     * This method is like `_.defaults` except that it recursively assigns
     * default properties.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.defaults
     * @example
     *
     * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
     * // => { 'a': { 'b': 2, 'c': 3 } }
     */
    var defaultsDeep = baseRest(function(args) {
      args.push(undefined, customDefaultsMerge);
      return apply(mergeWith, undefined, args);
    });

    /**
     * This method is like `_.find` except that it returns the key of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category Object
     * @param {Object} object The object to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {string|undefined} Returns the key of the matched element,
     *  else `undefined`.
     * @example
     *
     * var users = {
     *   'barney':  { 'age': 36, 'active': true },
     *   'fred':    { 'age': 40, 'active': false },
     *   'pebbles': { 'age': 1,  'active': true }
     * };
     *
     * _.findKey(users, function(o) { return o.age < 40; });
     * // => 'barney' (iteration order is not guaranteed)
     *
     * // The `_.matches` iteratee shorthand.
     * _.findKey(users, { 'age': 1, 'active': true });
     * // => 'pebbles'
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findKey(users, ['active', false]);
     * // => 'fred'
     *
     * // The `_.property` iteratee shorthand.
     * _.findKey(users, 'active');
     * // => 'barney'
     */
    function findKey(object, predicate) {
      return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
    }

    /**
     * This method is like `_.findKey` except that it iterates over elements of
     * a collection in the opposite order.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Object
     * @param {Object} object The object to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {string|undefined} Returns the key of the matched element,
     *  else `undefined`.
     * @example
     *
     * var users = {
     *   'barney':  { 'age': 36, 'active': true },
     *   'fred':    { 'age': 40, 'active': false },
     *   'pebbles': { 'age': 1,  'active': true }
     * };
     *
     * _.findLastKey(users, function(o) { return o.age < 40; });
     * // => returns 'pebbles' assuming `_.findKey` returns 'barney'
     *
     * // The `_.matches` iteratee shorthand.
     * _.findLastKey(users, { 'age': 36, 'active': true });
     * // => 'barney'
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findLastKey(users, ['active', false]);
     * // => 'fred'
     *
     * // The `_.property` iteratee shorthand.
     * _.findLastKey(users, 'active');
     * // => 'pebbles'
     */
    function findLastKey(object, predicate) {
      return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
    }

    /**
     * Iterates over own and inherited enumerable string keyed properties of an
     * object and invokes `iteratee` for each property. The iteratee is invoked
     * with three arguments: (value, key, object). Iteratee functions may exit
     * iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @since 0.3.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forInRight
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forIn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a', 'b', then 'c' (iteration order is not guaranteed).
     */
    function forIn(object, iteratee) {
      return object == null
        ? object
        : baseFor(object, getIteratee(iteratee, 3), keysIn);
    }

    /**
     * This method is like `_.forIn` except that it iterates over properties of
     * `object` in the opposite order.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forIn
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forInRight(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'c', 'b', then 'a' assuming `_.forIn` logs 'a', 'b', then 'c'.
     */
    function forInRight(object, iteratee) {
      return object == null
        ? object
        : baseForRight(object, getIteratee(iteratee, 3), keysIn);
    }

    /**
     * Iterates over own enumerable string keyed properties of an object and
     * invokes `iteratee` for each property. The iteratee is invoked with three
     * arguments: (value, key, object). Iteratee functions may exit iteration
     * early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @since 0.3.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forOwnRight
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
     */
    function forOwn(object, iteratee) {
      return object && baseForOwn(object, getIteratee(iteratee, 3));
    }

    /**
     * This method is like `_.forOwn` except that it iterates over properties of
     * `object` in the opposite order.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forOwn
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwnRight(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'b' then 'a' assuming `_.forOwn` logs 'a' then 'b'.
     */
    function forOwnRight(object, iteratee) {
      return object && baseForOwnRight(object, getIteratee(iteratee, 3));
    }

    /**
     * Creates an array of function property names from own enumerable properties
     * of `object`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns the function names.
     * @see _.functionsIn
     * @example
     *
     * function Foo() {
     *   this.a = _.constant('a');
     *   this.b = _.constant('b');
     * }
     *
     * Foo.prototype.c = _.constant('c');
     *
     * _.functions(new Foo);
     * // => ['a', 'b']
     */
    function functions(object) {
      return object == null ? [] : baseFunctions(object, keys(object));
    }

    /**
     * Creates an array of function property names from own and inherited
     * enumerable properties of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns the function names.
     * @see _.functions
     * @example
     *
     * function Foo() {
     *   this.a = _.constant('a');
     *   this.b = _.constant('b');
     * }
     *
     * Foo.prototype.c = _.constant('c');
     *
     * _.functionsIn(new Foo);
     * // => ['a', 'b', 'c']
     */
    function functionsIn(object) {
      return object == null ? [] : baseFunctions(object, keysIn(object));
    }

    /**
     * Gets the value at `path` of `object`. If the resolved value is
     * `undefined`, the `defaultValue` is returned in its place.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(object, 'a[0].b.c');
     * // => 3
     *
     * _.get(object, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(object, 'a.b.c', 'default');
     * // => 'default'
     */
    function get(object, path, defaultValue) {
      var result = object == null ? undefined : baseGet(object, path);
      return result === undefined ? defaultValue : result;
    }

    /**
     * Checks if `path` is a direct property of `object`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     * @example
     *
     * var object = { 'a': { 'b': 2 } };
     * var other = _.create({ 'a': _.create({ 'b': 2 }) });
     *
     * _.has(object, 'a');
     * // => true
     *
     * _.has(object, 'a.b');
     * // => true
     *
     * _.has(object, ['a', 'b']);
     * // => true
     *
     * _.has(other, 'a');
     * // => false
     */
    function has(object, path) {
      return object != null && hasPath(object, path, baseHas);
    }

    /**
     * Checks if `path` is a direct or inherited property of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     * @example
     *
     * var object = _.create({ 'a': _.create({ 'b': 2 }) });
     *
     * _.hasIn(object, 'a');
     * // => true
     *
     * _.hasIn(object, 'a.b');
     * // => true
     *
     * _.hasIn(object, ['a', 'b']);
     * // => true
     *
     * _.hasIn(object, 'b');
     * // => false
     */
    function hasIn(object, path) {
      return object != null && hasPath(object, path, baseHasIn);
    }

    /**
     * Creates an object composed of the inverted keys and values of `object`.
     * If `object` contains duplicate values, subsequent values overwrite
     * property assignments of previous values.
     *
     * @static
     * @memberOf _
     * @since 0.7.0
     * @category Object
     * @param {Object} object The object to invert.
     * @returns {Object} Returns the new inverted object.
     * @example
     *
     * var object = { 'a': 1, 'b': 2, 'c': 1 };
     *
     * _.invert(object);
     * // => { '1': 'c', '2': 'b' }
     */
    var invert = createInverter(function(result, value, key) {
      if (value != null &&
          typeof value.toString != 'function') {
        value = nativeObjectToString.call(value);
      }

      result[value] = key;
    }, constant(identity));

    /**
     * This method is like `_.invert` except that the inverted object is generated
     * from the results of running each element of `object` thru `iteratee`. The
     * corresponding inverted value of each inverted key is an array of keys
     * responsible for generating the inverted value. The iteratee is invoked
     * with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.1.0
     * @category Object
     * @param {Object} object The object to invert.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Object} Returns the new inverted object.
     * @example
     *
     * var object = { 'a': 1, 'b': 2, 'c': 1 };
     *
     * _.invertBy(object);
     * // => { '1': ['a', 'c'], '2': ['b'] }
     *
     * _.invertBy(object, function(value) {
     *   return 'group' + value;
     * });
     * // => { 'group1': ['a', 'c'], 'group2': ['b'] }
     */
    var invertBy = createInverter(function(result, value, key) {
      if (value != null &&
          typeof value.toString != 'function') {
        value = nativeObjectToString.call(value);
      }

      if (hasOwnProperty.call(result, value)) {
        result[value].push(key);
      } else {
        result[value] = [key];
      }
    }, getIteratee);

    /**
     * Invokes the method at `path` of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the method to invoke.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {*} Returns the result of the invoked method.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] };
     *
     * _.invoke(object, 'a[0].b.c.slice', 1, 3);
     * // => [2, 3]
     */
    var invoke = baseRest(baseInvoke);

    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }

    /**
     * Creates an array of the own and inherited enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keysIn(new Foo);
     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
     */
    function keysIn(object) {
      return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
    }

    /**
     * The opposite of `_.mapValues`; this method creates an object with the
     * same values as `object` and keys generated by running each own enumerable
     * string keyed property of `object` thru `iteratee`. The iteratee is invoked
     * with three arguments: (value, key, object).
     *
     * @static
     * @memberOf _
     * @since 3.8.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns the new mapped object.
     * @see _.mapValues
     * @example
     *
     * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
     *   return key + value;
     * });
     * // => { 'a1': 1, 'b2': 2 }
     */
    function mapKeys(object, iteratee) {
      var result = {};
      iteratee = getIteratee(iteratee, 3);

      baseForOwn(object, function(value, key, object) {
        baseAssignValue(result, iteratee(value, key, object), value);
      });
      return result;
    }

    /**
     * Creates an object with the same keys as `object` and values generated
     * by running each own enumerable string keyed property of `object` thru
     * `iteratee`. The iteratee is invoked with three arguments:
     * (value, key, object).
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns the new mapped object.
     * @see _.mapKeys
     * @example
     *
     * var users = {
     *   'fred':    { 'user': 'fred',    'age': 40 },
     *   'pebbles': { 'user': 'pebbles', 'age': 1 }
     * };
     *
     * _.mapValues(users, function(o) { return o.age; });
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     *
     * // The `_.property` iteratee shorthand.
     * _.mapValues(users, 'age');
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     */
    function mapValues(object, iteratee) {
      var result = {};
      iteratee = getIteratee(iteratee, 3);

      baseForOwn(object, function(value, key, object) {
        baseAssignValue(result, key, iteratee(value, key, object));
      });
      return result;
    }

    /**
     * This method is like `_.assign` except that it recursively merges own and
     * inherited enumerable string keyed properties of source objects into the
     * destination object. Source properties that resolve to `undefined` are
     * skipped if a destination value exists. Array and plain object properties
     * are merged recursively. Other objects and value types are overridden by
     * assignment. Source objects are applied from left to right. Subsequent
     * sources overwrite property assignments of previous sources.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {
     *   'a': [{ 'b': 2 }, { 'd': 4 }]
     * };
     *
     * var other = {
     *   'a': [{ 'c': 3 }, { 'e': 5 }]
     * };
     *
     * _.merge(object, other);
     * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
     */
    var merge = createAssigner(function(object, source, srcIndex) {
      baseMerge(object, source, srcIndex);
    });

    /**
     * This method is like `_.merge` except that it accepts `customizer` which
     * is invoked to produce the merged values of the destination and source
     * properties. If `customizer` returns `undefined`, merging is handled by the
     * method instead. The `customizer` is invoked with six arguments:
     * (objValue, srcValue, key, object, source, stack).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} customizer The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   if (_.isArray(objValue)) {
     *     return objValue.concat(srcValue);
     *   }
     * }
     *
     * var object = { 'a': [1], 'b': [2] };
     * var other = { 'a': [3], 'b': [4] };
     *
     * _.mergeWith(object, other, customizer);
     * // => { 'a': [1, 3], 'b': [2, 4] }
     */
    var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
      baseMerge(object, source, srcIndex, customizer);
    });

    /**
     * The opposite of `_.pick`; this method creates an object composed of the
     * own and inherited enumerable property paths of `object` that are not omitted.
     *
     * **Note:** This method is considerably slower than `_.pick`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {...(string|string[])} [paths] The property paths to omit.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.omit(object, ['a', 'c']);
     * // => { 'b': '2' }
     */
    var omit = flatRest(function(object, paths) {
      var result = {};
      if (object == null) {
        return result;
      }
      var isDeep = false;
      paths = arrayMap(paths, function(path) {
        path = castPath(path, object);
        isDeep || (isDeep = path.length > 1);
        return path;
      });
      copyObject(object, getAllKeysIn(object), result);
      if (isDeep) {
        result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
      }
      var length = paths.length;
      while (length--) {
        baseUnset(result, paths[length]);
      }
      return result;
    });

    /**
     * The opposite of `_.pickBy`; this method creates an object composed of
     * the own and inherited enumerable string keyed properties of `object` that
     * `predicate` doesn't return truthy for. The predicate is invoked with two
     * arguments: (value, key).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The source object.
     * @param {Function} [predicate=_.identity] The function invoked per property.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.omitBy(object, _.isNumber);
     * // => { 'b': '2' }
     */
    function omitBy(object, predicate) {
      return pickBy(object, negate(getIteratee(predicate)));
    }

    /**
     * Creates an object composed of the picked `object` properties.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {...(string|string[])} [paths] The property paths to pick.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.pick(object, ['a', 'c']);
     * // => { 'a': 1, 'c': 3 }
     */
    var pick = flatRest(function(object, paths) {
      return object == null ? {} : basePick(object, paths);
    });

    /**
     * Creates an object composed of the `object` properties `predicate` returns
     * truthy for. The predicate is invoked with two arguments: (value, key).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The source object.
     * @param {Function} [predicate=_.identity] The function invoked per property.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.pickBy(object, _.isNumber);
     * // => { 'a': 1, 'c': 3 }
     */
    function pickBy(object, predicate) {
      if (object == null) {
        return {};
      }
      var props = arrayMap(getAllKeysIn(object), function(prop) {
        return [prop];
      });
      predicate = getIteratee(predicate);
      return basePickBy(object, props, function(value, path) {
        return predicate(value, path[0]);
      });
    }

    /**
     * This method is like `_.get` except that if the resolved value is a
     * function it's invoked with the `this` binding of its parent object and
     * its result is returned.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to resolve.
     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
     *
     * _.result(object, 'a[0].b.c1');
     * // => 3
     *
     * _.result(object, 'a[0].b.c2');
     * // => 4
     *
     * _.result(object, 'a[0].b.c3', 'default');
     * // => 'default'
     *
     * _.result(object, 'a[0].b.c3', _.constant('default'));
     * // => 'default'
     */
    function result(object, path, defaultValue) {
      path = castPath(path, object);

      var index = -1,
          length = path.length;

      // Ensure the loop is entered when path is empty.
      if (!length) {
        length = 1;
        object = undefined;
      }
      while (++index < length) {
        var value = object == null ? undefined : object[toKey(path[index])];
        if (value === undefined) {
          index = length;
          value = defaultValue;
        }
        object = isFunction(value) ? value.call(object) : value;
      }
      return object;
    }

    /**
     * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
     * it's created. Arrays are created for missing index properties while objects
     * are created for all other missing properties. Use `_.setWith` to customize
     * `path` creation.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.set(object, 'a[0].b.c', 4);
     * console.log(object.a[0].b.c);
     * // => 4
     *
     * _.set(object, ['x', '0', 'y', 'z'], 5);
     * console.log(object.x[0].y.z);
     * // => 5
     */
    function set(object, path, value) {
      return object == null ? object : baseSet(object, path, value);
    }

    /**
     * This method is like `_.set` except that it accepts `customizer` which is
     * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
     * path creation is handled by the method instead. The `customizer` is invoked
     * with three arguments: (nsValue, key, nsObject).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {};
     *
     * _.setWith(object, '[0][1]', 'a', Object);
     * // => { '0': { '1': 'a' } }
     */
    function setWith(object, path, value, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return object == null ? object : baseSet(object, path, value, customizer);
    }

    /**
     * Creates an array of own enumerable string keyed-value pairs for `object`
     * which can be consumed by `_.fromPairs`. If `object` is a map or set, its
     * entries are returned.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias entries
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the key-value pairs.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.toPairs(new Foo);
     * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
     */
    var toPairs = createToPairs(keys);

    /**
     * Creates an array of own and inherited enumerable string keyed-value pairs
     * for `object` which can be consumed by `_.fromPairs`. If `object` is a map
     * or set, its entries are returned.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias entriesIn
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the key-value pairs.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.toPairsIn(new Foo);
     * // => [['a', 1], ['b', 2], ['c', 3]] (iteration order is not guaranteed)
     */
    var toPairsIn = createToPairs(keysIn);

    /**
     * An alternative to `_.reduce`; this method transforms `object` to a new
     * `accumulator` object which is the result of running each of its own
     * enumerable string keyed properties thru `iteratee`, with each invocation
     * potentially mutating the `accumulator` object. If `accumulator` is not
     * provided, a new object with the same `[[Prototype]]` will be used. The
     * iteratee is invoked with four arguments: (accumulator, value, key, object).
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @since 1.3.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The custom accumulator value.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * _.transform([2, 3, 4], function(result, n) {
     *   result.push(n *= n);
     *   return n % 2 == 0;
     * }, []);
     * // => [4, 9]
     *
     * _.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
     *   (result[value] || (result[value] = [])).push(key);
     * }, {});
     * // => { '1': ['a', 'c'], '2': ['b'] }
     */
    function transform(object, iteratee, accumulator) {
      var isArr = isArray(object),
          isArrLike = isArr || isBuffer(object) || isTypedArray(object);

      iteratee = getIteratee(iteratee, 4);
      if (accumulator == null) {
        var Ctor = object && object.constructor;
        if (isArrLike) {
          accumulator = isArr ? new Ctor : [];
        }
        else if (isObject(object)) {
          accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
        }
        else {
          accumulator = {};
        }
      }
      (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object) {
        return iteratee(accumulator, value, index, object);
      });
      return accumulator;
    }

    /**
     * Removes the property at `path` of `object`.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to unset.
     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 7 } }] };
     * _.unset(object, 'a[0].b.c');
     * // => true
     *
     * console.log(object);
     * // => { 'a': [{ 'b': {} }] };
     *
     * _.unset(object, ['a', '0', 'b', 'c']);
     * // => true
     *
     * console.log(object);
     * // => { 'a': [{ 'b': {} }] };
     */
    function unset(object, path) {
      return object == null ? true : baseUnset(object, path);
    }

    /**
     * This method is like `_.set` except that accepts `updater` to produce the
     * value to set. Use `_.updateWith` to customize `path` creation. The `updater`
     * is invoked with one argument: (value).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.6.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {Function} updater The function to produce the updated value.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.update(object, 'a[0].b.c', function(n) { return n * n; });
     * console.log(object.a[0].b.c);
     * // => 9
     *
     * _.update(object, 'x[0].y.z', function(n) { return n ? n + 1 : 0; });
     * console.log(object.x[0].y.z);
     * // => 0
     */
    function update(object, path, updater) {
      return object == null ? object : baseUpdate(object, path, castFunction(updater));
    }

    /**
     * This method is like `_.update` except that it accepts `customizer` which is
     * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
     * path creation is handled by the method instead. The `customizer` is invoked
     * with three arguments: (nsValue, key, nsObject).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.6.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {Function} updater The function to produce the updated value.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {};
     *
     * _.updateWith(object, '[0][1]', _.constant('a'), Object);
     * // => { '0': { '1': 'a' } }
     */
    function updateWith(object, path, updater, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
    }

    /**
     * Creates an array of the own enumerable string keyed property values of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.values(new Foo);
     * // => [1, 2] (iteration order is not guaranteed)
     *
     * _.values('hi');
     * // => ['h', 'i']
     */
    function values(object) {
      return object == null ? [] : baseValues(object, keys(object));
    }

    /**
     * Creates an array of the own and inherited enumerable string keyed property
     * values of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.valuesIn(new Foo);
     * // => [1, 2, 3] (iteration order is not guaranteed)
     */
    function valuesIn(object) {
      return object == null ? [] : baseValues(object, keysIn(object));
    }

    /*------------------------------------------------------------------------*/

    /**
     * Clamps `number` within the inclusive `lower` and `upper` bounds.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Number
     * @param {number} number The number to clamp.
     * @param {number} [lower] The lower bound.
     * @param {number} upper The upper bound.
     * @returns {number} Returns the clamped number.
     * @example
     *
     * _.clamp(-10, -5, 5);
     * // => -5
     *
     * _.clamp(10, -5, 5);
     * // => 5
     */
    function clamp(number, lower, upper) {
      if (upper === undefined) {
        upper = lower;
        lower = undefined;
      }
      if (upper !== undefined) {
        upper = toNumber(upper);
        upper = upper === upper ? upper : 0;
      }
      if (lower !== undefined) {
        lower = toNumber(lower);
        lower = lower === lower ? lower : 0;
      }
      return baseClamp(toNumber(number), lower, upper);
    }

    /**
     * Checks if `n` is between `start` and up to, but not including, `end`. If
     * `end` is not specified, it's set to `start` with `start` then set to `0`.
     * If `start` is greater than `end` the params are swapped to support
     * negative ranges.
     *
     * @static
     * @memberOf _
     * @since 3.3.0
     * @category Number
     * @param {number} number The number to check.
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
     * @see _.range, _.rangeRight
     * @example
     *
     * _.inRange(3, 2, 4);
     * // => true
     *
     * _.inRange(4, 8);
     * // => true
     *
     * _.inRange(4, 2);
     * // => false
     *
     * _.inRange(2, 2);
     * // => false
     *
     * _.inRange(1.2, 2);
     * // => true
     *
     * _.inRange(5.2, 4);
     * // => false
     *
     * _.inRange(-3, -2, -6);
     * // => true
     */
    function inRange(number, start, end) {
      start = toFinite(start);
      if (end === undefined) {
        end = start;
        start = 0;
      } else {
        end = toFinite(end);
      }
      number = toNumber(number);
      return baseInRange(number, start, end);
    }

    /**
     * Produces a random number between the inclusive `lower` and `upper` bounds.
     * If only one argument is provided a number between `0` and the given number
     * is returned. If `floating` is `true`, or either `lower` or `upper` are
     * floats, a floating-point number is returned instead of an integer.
     *
     * **Note:** JavaScript follows the IEEE-754 standard for resolving
     * floating-point values which can produce unexpected results.
     *
     * @static
     * @memberOf _
     * @since 0.7.0
     * @category Number
     * @param {number} [lower=0] The lower bound.
     * @param {number} [upper=1] The upper bound.
     * @param {boolean} [floating] Specify returning a floating-point number.
     * @returns {number} Returns the random number.
     * @example
     *
     * _.random(0, 5);
     * // => an integer between 0 and 5
     *
     * _.random(5);
     * // => also an integer between 0 and 5
     *
     * _.random(5, true);
     * // => a floating-point number between 0 and 5
     *
     * _.random(1.2, 5.2);
     * // => a floating-point number between 1.2 and 5.2
     */
    function random(lower, upper, floating) {
      if (floating && typeof floating != 'boolean' && isIterateeCall(lower, upper, floating)) {
        upper = floating = undefined;
      }
      if (floating === undefined) {
        if (typeof upper == 'boolean') {
          floating = upper;
          upper = undefined;
        }
        else if (typeof lower == 'boolean') {
          floating = lower;
          lower = undefined;
        }
      }
      if (lower === undefined && upper === undefined) {
        lower = 0;
        upper = 1;
      }
      else {
        lower = toFinite(lower);
        if (upper === undefined) {
          upper = lower;
          lower = 0;
        } else {
          upper = toFinite(upper);
        }
      }
      if (lower > upper) {
        var temp = lower;
        lower = upper;
        upper = temp;
      }
      if (floating || lower % 1 || upper % 1) {
        var rand = nativeRandom();
        return nativeMin(lower + (rand * (upper - lower + freeParseFloat('1e-' + ((rand + '').length - 1)))), upper);
      }
      return baseRandom(lower, upper);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the camel cased string.
     * @example
     *
     * _.camelCase('Foo Bar');
     * // => 'fooBar'
     *
     * _.camelCase('--foo-bar--');
     * // => 'fooBar'
     *
     * _.camelCase('__FOO_BAR__');
     * // => 'fooBar'
     */
    var camelCase = createCompounder(function(result, word, index) {
      word = word.toLowerCase();
      return result + (index ? capitalize(word) : word);
    });

    /**
     * Converts the first character of `string` to upper case and the remaining
     * to lower case.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to capitalize.
     * @returns {string} Returns the capitalized string.
     * @example
     *
     * _.capitalize('FRED');
     * // => 'Fred'
     */
    function capitalize(string) {
      return upperFirst(toString(string).toLowerCase());
    }

    /**
     * Deburrs `string` by converting
     * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
     * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
     * letters to basic Latin letters and removing
     * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to deburr.
     * @returns {string} Returns the deburred string.
     * @example
     *
     * _.deburr('déjà vu');
     * // => 'deja vu'
     */
    function deburr(string) {
      string = toString(string);
      return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
    }

    /**
     * Checks if `string` ends with the given target string.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {string} [target] The string to search for.
     * @param {number} [position=string.length] The position to search up to.
     * @returns {boolean} Returns `true` if `string` ends with `target`,
     *  else `false`.
     * @example
     *
     * _.endsWith('abc', 'c');
     * // => true
     *
     * _.endsWith('abc', 'b');
     * // => false
     *
     * _.endsWith('abc', 'b', 2);
     * // => true
     */
    function endsWith(string, target, position) {
      string = toString(string);
      target = baseToString(target);

      var length = string.length;
      position = position === undefined
        ? length
        : baseClamp(toInteger(position), 0, length);

      var end = position;
      position -= target.length;
      return position >= 0 && string.slice(position, end) == target;
    }

    /**
     * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
     * corresponding HTML entities.
     *
     * **Note:** No other characters are escaped. To escape additional
     * characters use a third-party library like [_he_](https://mths.be/he).
     *
     * Though the ">" character is escaped for symmetry, characters like
     * ">" and "/" don't need escaping in HTML and have no special meaning
     * unless they're part of a tag or unquoted attribute value. See
     * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
     * (under "semi-related fun fact") for more details.
     *
     * When working with HTML you should always
     * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
     * XSS vectors.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escape('fred, barney, & pebbles');
     * // => 'fred, barney, &amp; pebbles'
     */
    function escape(string) {
      string = toString(string);
      return (string && reHasUnescapedHtml.test(string))
        ? string.replace(reUnescapedHtml, escapeHtmlChar)
        : string;
    }

    /**
     * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
     * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escapeRegExp('[lodash](https://lodash.com/)');
     * // => '\[lodash\]\(https://lodash\.com/\)'
     */
    function escapeRegExp(string) {
      string = toString(string);
      return (string && reHasRegExpChar.test(string))
        ? string.replace(reRegExpChar, '\\$&')
        : string;
    }

    /**
     * Converts `string` to
     * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the kebab cased string.
     * @example
     *
     * _.kebabCase('Foo Bar');
     * // => 'foo-bar'
     *
     * _.kebabCase('fooBar');
     * // => 'foo-bar'
     *
     * _.kebabCase('__FOO_BAR__');
     * // => 'foo-bar'
     */
    var kebabCase = createCompounder(function(result, word, index) {
      return result + (index ? '-' : '') + word.toLowerCase();
    });

    /**
     * Converts `string`, as space separated words, to lower case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the lower cased string.
     * @example
     *
     * _.lowerCase('--Foo-Bar--');
     * // => 'foo bar'
     *
     * _.lowerCase('fooBar');
     * // => 'foo bar'
     *
     * _.lowerCase('__FOO_BAR__');
     * // => 'foo bar'
     */
    var lowerCase = createCompounder(function(result, word, index) {
      return result + (index ? ' ' : '') + word.toLowerCase();
    });

    /**
     * Converts the first character of `string` to lower case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.lowerFirst('Fred');
     * // => 'fred'
     *
     * _.lowerFirst('FRED');
     * // => 'fRED'
     */
    var lowerFirst = createCaseFirst('toLowerCase');

    /**
     * Pads `string` on the left and right sides if it's shorter than `length`.
     * Padding characters are truncated if they can't be evenly divided by `length`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.pad('abc', 8);
     * // => '  abc   '
     *
     * _.pad('abc', 8, '_-');
     * // => '_-abc_-_'
     *
     * _.pad('abc', 3);
     * // => 'abc'
     */
    function pad(string, length, chars) {
      string = toString(string);
      length = toInteger(length);

      var strLength = length ? stringSize(string) : 0;
      if (!length || strLength >= length) {
        return string;
      }
      var mid = (length - strLength) / 2;
      return (
        createPadding(nativeFloor(mid), chars) +
        string +
        createPadding(nativeCeil(mid), chars)
      );
    }

    /**
     * Pads `string` on the right side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padEnd('abc', 6);
     * // => 'abc   '
     *
     * _.padEnd('abc', 6, '_-');
     * // => 'abc_-_'
     *
     * _.padEnd('abc', 3);
     * // => 'abc'
     */
    function padEnd(string, length, chars) {
      string = toString(string);
      length = toInteger(length);

      var strLength = length ? stringSize(string) : 0;
      return (length && strLength < length)
        ? (string + createPadding(length - strLength, chars))
        : string;
    }

    /**
     * Pads `string` on the left side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padStart('abc', 6);
     * // => '   abc'
     *
     * _.padStart('abc', 6, '_-');
     * // => '_-_abc'
     *
     * _.padStart('abc', 3);
     * // => 'abc'
     */
    function padStart(string, length, chars) {
      string = toString(string);
      length = toInteger(length);

      var strLength = length ? stringSize(string) : 0;
      return (length && strLength < length)
        ? (createPadding(length - strLength, chars) + string)
        : string;
    }

    /**
     * Converts `string` to an integer of the specified radix. If `radix` is
     * `undefined` or `0`, a `radix` of `10` is used unless `value` is a
     * hexadecimal, in which case a `radix` of `16` is used.
     *
     * **Note:** This method aligns with the
     * [ES5 implementation](https://es5.github.io/#x15.1.2.2) of `parseInt`.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category String
     * @param {string} string The string to convert.
     * @param {number} [radix=10] The radix to interpret `value` by.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.parseInt('08');
     * // => 8
     *
     * _.map(['6', '08', '10'], _.parseInt);
     * // => [6, 8, 10]
     */
    function parseInt(string, radix, guard) {
      if (guard || radix == null) {
        radix = 0;
      } else if (radix) {
        radix = +radix;
      }
      return nativeParseInt(toString(string).replace(reTrimStart, ''), radix || 0);
    }

    /**
     * Repeats the given string `n` times.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to repeat.
     * @param {number} [n=1] The number of times to repeat the string.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the repeated string.
     * @example
     *
     * _.repeat('*', 3);
     * // => '***'
     *
     * _.repeat('abc', 2);
     * // => 'abcabc'
     *
     * _.repeat('abc', 0);
     * // => ''
     */
    function repeat(string, n, guard) {
      if ((guard ? isIterateeCall(string, n, guard) : n === undefined)) {
        n = 1;
      } else {
        n = toInteger(n);
      }
      return baseRepeat(toString(string), n);
    }

    /**
     * Replaces matches for `pattern` in `string` with `replacement`.
     *
     * **Note:** This method is based on
     * [`String#replace`](https://mdn.io/String/replace).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to modify.
     * @param {RegExp|string} pattern The pattern to replace.
     * @param {Function|string} replacement The match replacement.
     * @returns {string} Returns the modified string.
     * @example
     *
     * _.replace('Hi Fred', 'Fred', 'Barney');
     * // => 'Hi Barney'
     */
    function replace() {
      var args = arguments,
          string = toString(args[0]);

      return args.length < 3 ? string : string.replace(args[1], args[2]);
    }

    /**
     * Converts `string` to
     * [snake case](https://en.wikipedia.org/wiki/Snake_case).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the snake cased string.
     * @example
     *
     * _.snakeCase('Foo Bar');
     * // => 'foo_bar'
     *
     * _.snakeCase('fooBar');
     * // => 'foo_bar'
     *
     * _.snakeCase('--FOO-BAR--');
     * // => 'foo_bar'
     */
    var snakeCase = createCompounder(function(result, word, index) {
      return result + (index ? '_' : '') + word.toLowerCase();
    });

    /**
     * Splits `string` by `separator`.
     *
     * **Note:** This method is based on
     * [`String#split`](https://mdn.io/String/split).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to split.
     * @param {RegExp|string} separator The separator pattern to split by.
     * @param {number} [limit] The length to truncate results to.
     * @returns {Array} Returns the string segments.
     * @example
     *
     * _.split('a-b-c', '-', 2);
     * // => ['a', 'b']
     */
    function split(string, separator, limit) {
      if (limit && typeof limit != 'number' && isIterateeCall(string, separator, limit)) {
        separator = limit = undefined;
      }
      limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0;
      if (!limit) {
        return [];
      }
      string = toString(string);
      if (string && (
            typeof separator == 'string' ||
            (separator != null && !isRegExp(separator))
          )) {
        separator = baseToString(separator);
        if (!separator && hasUnicode(string)) {
          return castSlice(stringToArray(string), 0, limit);
        }
      }
      return string.split(separator, limit);
    }

    /**
     * Converts `string` to
     * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
     *
     * @static
     * @memberOf _
     * @since 3.1.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the start cased string.
     * @example
     *
     * _.startCase('--foo-bar--');
     * // => 'Foo Bar'
     *
     * _.startCase('fooBar');
     * // => 'Foo Bar'
     *
     * _.startCase('__FOO_BAR__');
     * // => 'FOO BAR'
     */
    var startCase = createCompounder(function(result, word, index) {
      return result + (index ? ' ' : '') + upperFirst(word);
    });

    /**
     * Checks if `string` starts with the given target string.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {string} [target] The string to search for.
     * @param {number} [position=0] The position to search from.
     * @returns {boolean} Returns `true` if `string` starts with `target`,
     *  else `false`.
     * @example
     *
     * _.startsWith('abc', 'a');
     * // => true
     *
     * _.startsWith('abc', 'b');
     * // => false
     *
     * _.startsWith('abc', 'b', 1);
     * // => true
     */
    function startsWith(string, target, position) {
      string = toString(string);
      position = position == null
        ? 0
        : baseClamp(toInteger(position), 0, string.length);

      target = baseToString(target);
      return string.slice(position, position + target.length) == target;
    }

    /**
     * Creates a compiled template function that can interpolate data properties
     * in "interpolate" delimiters, HTML-escape interpolated data properties in
     * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
     * properties may be accessed as free variables in the template. If a setting
     * object is given, it takes precedence over `_.templateSettings` values.
     *
     * **Note:** In the development build `_.template` utilizes
     * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
     * for easier debugging.
     *
     * For more information on precompiling templates see
     * [lodash's custom builds documentation](https://lodash.com/custom-builds).
     *
     * For more information on Chrome extension sandboxes see
     * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category String
     * @param {string} [string=''] The template string.
     * @param {Object} [options={}] The options object.
     * @param {RegExp} [options.escape=_.templateSettings.escape]
     *  The HTML "escape" delimiter.
     * @param {RegExp} [options.evaluate=_.templateSettings.evaluate]
     *  The "evaluate" delimiter.
     * @param {Object} [options.imports=_.templateSettings.imports]
     *  An object to import into the template as free variables.
     * @param {RegExp} [options.interpolate=_.templateSettings.interpolate]
     *  The "interpolate" delimiter.
     * @param {string} [options.sourceURL='lodash.templateSources[n]']
     *  The sourceURL of the compiled template.
     * @param {string} [options.variable='obj']
     *  The data object variable name.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the compiled template function.
     * @example
     *
     * // Use the "interpolate" delimiter to create a compiled template.
     * var compiled = _.template('hello <%= user %>!');
     * compiled({ 'user': 'fred' });
     * // => 'hello fred!'
     *
     * // Use the HTML "escape" delimiter to escape data property values.
     * var compiled = _.template('<b><%- value %></b>');
     * compiled({ 'value': '<script>' });
     * // => '<b>&lt;script&gt;</b>'
     *
     * // Use the "evaluate" delimiter to execute JavaScript and generate HTML.
     * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // Use the internal `print` function in "evaluate" delimiters.
     * var compiled = _.template('<% print("hello " + user); %>!');
     * compiled({ 'user': 'barney' });
     * // => 'hello barney!'
     *
     * // Use the ES template literal delimiter as an "interpolate" delimiter.
     * // Disable support by replacing the "interpolate" delimiter.
     * var compiled = _.template('hello ${ user }!');
     * compiled({ 'user': 'pebbles' });
     * // => 'hello pebbles!'
     *
     * // Use backslashes to treat delimiters as plain text.
     * var compiled = _.template('<%= "\\<%- value %\\>" %>');
     * compiled({ 'value': 'ignored' });
     * // => '<%- value %>'
     *
     * // Use the `imports` option to import `jQuery` as `jq`.
     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
     * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // Use the `sourceURL` option to specify a custom sourceURL for the template.
     * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
     * compiled(data);
     * // => Find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector.
     *
     * // Use the `variable` option to ensure a with-statement isn't used in the compiled template.
     * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
     * compiled.source;
     * // => function(data) {
     * //   var __t, __p = '';
     * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
     * //   return __p;
     * // }
     *
     * // Use custom template delimiters.
     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
     * var compiled = _.template('hello {{ user }}!');
     * compiled({ 'user': 'mustache' });
     * // => 'hello mustache!'
     *
     * // Use the `source` property to inline compiled templates for meaningful
     * // line numbers in error messages and stack traces.
     * fs.writeFileSync(path.join(process.cwd(), 'jst.js'), '\
     *   var JST = {\
     *     "main": ' + _.template(mainText).source + '\
     *   };\
     * ');
     */
    function template(string, options, guard) {
      // Based on John Resig's `tmpl` implementation
      // (http://ejohn.org/blog/javascript-micro-templating/)
      // and Laura Doktorova's doT.js (https://github.com/olado/doT).
      var settings = lodash.templateSettings;

      if (guard && isIterateeCall(string, options, guard)) {
        options = undefined;
      }
      string = toString(string);
      options = assignInWith({}, options, settings, customDefaultsAssignIn);

      var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn),
          importsKeys = keys(imports),
          importsValues = baseValues(imports, importsKeys);

      var isEscaping,
          isEvaluating,
          index = 0,
          interpolate = options.interpolate || reNoMatch,
          source = "__p += '";

      // Compile the regexp to match each delimiter.
      var reDelimiters = RegExp(
        (options.escape || reNoMatch).source + '|' +
        interpolate.source + '|' +
        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
        (options.evaluate || reNoMatch).source + '|$'
      , 'g');

      // Use a sourceURL for easier debugging.
      // The sourceURL gets injected into the source that's eval-ed, so be careful
      // with lookup (in case of e.g. prototype pollution), and strip newlines if any.
      // A newline wouldn't be a valid sourceURL anyway, and it'd enable code injection.
      var sourceURL = '//# sourceURL=' +
        (hasOwnProperty.call(options, 'sourceURL')
          ? (options.sourceURL + '').replace(/[\r\n]/g, ' ')
          : ('lodash.templateSources[' + (++templateCounter) + ']')
        ) + '\n';

      string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
        interpolateValue || (interpolateValue = esTemplateValue);

        // Escape characters that can't be included in string literals.
        source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

        // Replace delimiters with snippets.
        if (escapeValue) {
          isEscaping = true;
          source += "' +\n__e(" + escapeValue + ") +\n'";
        }
        if (evaluateValue) {
          isEvaluating = true;
          source += "';\n" + evaluateValue + ";\n__p += '";
        }
        if (interpolateValue) {
          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
        }
        index = offset + match.length;

        // The JS engine embedded in Adobe products needs `match` returned in
        // order to produce the correct `offset` value.
        return match;
      });

      source += "';\n";

      // If `variable` is not specified wrap a with-statement around the generated
      // code to add the data object to the top of the scope chain.
      // Like with sourceURL, we take care to not check the option's prototype,
      // as this configuration is a code injection vector.
      var variable = hasOwnProperty.call(options, 'variable') && options.variable;
      if (!variable) {
        source = 'with (obj) {\n' + source + '\n}\n';
      }
      // Cleanup code by stripping empty strings.
      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
        .replace(reEmptyStringMiddle, '$1')
        .replace(reEmptyStringTrailing, '$1;');

      // Frame code as the function body.
      source = 'function(' + (variable || 'obj') + ') {\n' +
        (variable
          ? ''
          : 'obj || (obj = {});\n'
        ) +
        "var __t, __p = ''" +
        (isEscaping
           ? ', __e = _.escape'
           : ''
        ) +
        (isEvaluating
          ? ', __j = Array.prototype.join;\n' +
            "function print() { __p += __j.call(arguments, '') }\n"
          : ';\n'
        ) +
        source +
        'return __p\n}';

      var result = attempt(function() {
        return Function(importsKeys, sourceURL + 'return ' + source)
          .apply(undefined, importsValues);
      });

      // Provide the compiled function's source by its `toString` method or
      // the `source` property as a convenience for inlining compiled templates.
      result.source = source;
      if (isError(result)) {
        throw result;
      }
      return result;
    }

    /**
     * Converts `string`, as a whole, to lower case just like
     * [String#toLowerCase](https://mdn.io/toLowerCase).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the lower cased string.
     * @example
     *
     * _.toLower('--Foo-Bar--');
     * // => '--foo-bar--'
     *
     * _.toLower('fooBar');
     * // => 'foobar'
     *
     * _.toLower('__FOO_BAR__');
     * // => '__foo_bar__'
     */
    function toLower(value) {
      return toString(value).toLowerCase();
    }

    /**
     * Converts `string`, as a whole, to upper case just like
     * [String#toUpperCase](https://mdn.io/toUpperCase).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the upper cased string.
     * @example
     *
     * _.toUpper('--foo-bar--');
     * // => '--FOO-BAR--'
     *
     * _.toUpper('fooBar');
     * // => 'FOOBAR'
     *
     * _.toUpper('__foo_bar__');
     * // => '__FOO_BAR__'
     */
    function toUpper(value) {
      return toString(value).toUpperCase();
    }

    /**
     * Removes leading and trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trim('  abc  ');
     * // => 'abc'
     *
     * _.trim('-_-abc-_-', '_-');
     * // => 'abc'
     *
     * _.map(['  foo  ', '  bar  '], _.trim);
     * // => ['foo', 'bar']
     */
    function trim(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === undefined)) {
        return string.replace(reTrim, '');
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string),
          chrSymbols = stringToArray(chars),
          start = charsStartIndex(strSymbols, chrSymbols),
          end = charsEndIndex(strSymbols, chrSymbols) + 1;

      return castSlice(strSymbols, start, end).join('');
    }

    /**
     * Removes trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimEnd('  abc  ');
     * // => '  abc'
     *
     * _.trimEnd('-_-abc-_-', '_-');
     * // => '-_-abc'
     */
    function trimEnd(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === undefined)) {
        return string.replace(reTrimEnd, '');
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string),
          end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;

      return castSlice(strSymbols, 0, end).join('');
    }

    /**
     * Removes leading whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimStart('  abc  ');
     * // => 'abc  '
     *
     * _.trimStart('-_-abc-_-', '_-');
     * // => 'abc-_-'
     */
    function trimStart(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === undefined)) {
        return string.replace(reTrimStart, '');
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string),
          start = charsStartIndex(strSymbols, stringToArray(chars));

      return castSlice(strSymbols, start).join('');
    }

    /**
     * Truncates `string` if it's longer than the given maximum string length.
     * The last characters of the truncated string are replaced with the omission
     * string which defaults to "...".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to truncate.
     * @param {Object} [options={}] The options object.
     * @param {number} [options.length=30] The maximum string length.
     * @param {string} [options.omission='...'] The string to indicate text is omitted.
     * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
     * @returns {string} Returns the truncated string.
     * @example
     *
     * _.truncate('hi-diddly-ho there, neighborino');
     * // => 'hi-diddly-ho there, neighbo...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': ' '
     * });
     * // => 'hi-diddly-ho there,...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': /,? +/
     * });
     * // => 'hi-diddly-ho there...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'omission': ' [...]'
     * });
     * // => 'hi-diddly-ho there, neig [...]'
     */
    function truncate(string, options) {
      var length = DEFAULT_TRUNC_LENGTH,
          omission = DEFAULT_TRUNC_OMISSION;

      if (isObject(options)) {
        var separator = 'separator' in options ? options.separator : separator;
        length = 'length' in options ? toInteger(options.length) : length;
        omission = 'omission' in options ? baseToString(options.omission) : omission;
      }
      string = toString(string);

      var strLength = string.length;
      if (hasUnicode(string)) {
        var strSymbols = stringToArray(string);
        strLength = strSymbols.length;
      }
      if (length >= strLength) {
        return string;
      }
      var end = length - stringSize(omission);
      if (end < 1) {
        return omission;
      }
      var result = strSymbols
        ? castSlice(strSymbols, 0, end).join('')
        : string.slice(0, end);

      if (separator === undefined) {
        return result + omission;
      }
      if (strSymbols) {
        end += (result.length - end);
      }
      if (isRegExp(separator)) {
        if (string.slice(end).search(separator)) {
          var match,
              substring = result;

          if (!separator.global) {
            separator = RegExp(separator.source, toString(reFlags.exec(separator)) + 'g');
          }
          separator.lastIndex = 0;
          while ((match = separator.exec(substring))) {
            var newEnd = match.index;
          }
          result = result.slice(0, newEnd === undefined ? end : newEnd);
        }
      } else if (string.indexOf(baseToString(separator), end) != end) {
        var index = result.lastIndexOf(separator);
        if (index > -1) {
          result = result.slice(0, index);
        }
      }
      return result + omission;
    }

    /**
     * The inverse of `_.escape`; this method converts the HTML entities
     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to
     * their corresponding characters.
     *
     * **Note:** No other HTML entities are unescaped. To unescape additional
     * HTML entities use a third-party library like [_he_](https://mths.be/he).
     *
     * @static
     * @memberOf _
     * @since 0.6.0
     * @category String
     * @param {string} [string=''] The string to unescape.
     * @returns {string} Returns the unescaped string.
     * @example
     *
     * _.unescape('fred, barney, &amp; pebbles');
     * // => 'fred, barney, & pebbles'
     */
    function unescape(string) {
      string = toString(string);
      return (string && reHasEscapedHtml.test(string))
        ? string.replace(reEscapedHtml, unescapeHtmlChar)
        : string;
    }

    /**
     * Converts `string`, as space separated words, to upper case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the upper cased string.
     * @example
     *
     * _.upperCase('--foo-bar');
     * // => 'FOO BAR'
     *
     * _.upperCase('fooBar');
     * // => 'FOO BAR'
     *
     * _.upperCase('__foo_bar__');
     * // => 'FOO BAR'
     */
    var upperCase = createCompounder(function(result, word, index) {
      return result + (index ? ' ' : '') + word.toUpperCase();
    });

    /**
     * Converts the first character of `string` to upper case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.upperFirst('fred');
     * // => 'Fred'
     *
     * _.upperFirst('FRED');
     * // => 'FRED'
     */
    var upperFirst = createCaseFirst('toUpperCase');

    /**
     * Splits `string` into an array of its words.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {RegExp|string} [pattern] The pattern to match words.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the words of `string`.
     * @example
     *
     * _.words('fred, barney, & pebbles');
     * // => ['fred', 'barney', 'pebbles']
     *
     * _.words('fred, barney, & pebbles', /[^, ]+/g);
     * // => ['fred', 'barney', '&', 'pebbles']
     */
    function words(string, pattern, guard) {
      string = toString(string);
      pattern = guard ? undefined : pattern;

      if (pattern === undefined) {
        return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
      }
      return string.match(pattern) || [];
    }

    /*------------------------------------------------------------------------*/

    /**
     * Attempts to invoke `func`, returning either the result or the caught error
     * object. Any additional arguments are provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {Function} func The function to attempt.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {*} Returns the `func` result or error object.
     * @example
     *
     * // Avoid throwing errors for invalid selectors.
     * var elements = _.attempt(function(selector) {
     *   return document.querySelectorAll(selector);
     * }, '>_>');
     *
     * if (_.isError(elements)) {
     *   elements = [];
     * }
     */
    var attempt = baseRest(function(func, args) {
      try {
        return apply(func, undefined, args);
      } catch (e) {
        return isError(e) ? e : new Error(e);
      }
    });

    /**
     * Binds methods of an object to the object itself, overwriting the existing
     * method.
     *
     * **Note:** This method doesn't set the "length" property of bound functions.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {Object} object The object to bind and assign the bound methods to.
     * @param {...(string|string[])} methodNames The object method names to bind.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var view = {
     *   'label': 'docs',
     *   'click': function() {
     *     console.log('clicked ' + this.label);
     *   }
     * };
     *
     * _.bindAll(view, ['click']);
     * jQuery(element).on('click', view.click);
     * // => Logs 'clicked docs' when clicked.
     */
    var bindAll = flatRest(function(object, methodNames) {
      arrayEach(methodNames, function(key) {
        key = toKey(key);
        baseAssignValue(object, key, bind(object[key], object));
      });
      return object;
    });

    /**
     * Creates a function that iterates over `pairs` and invokes the corresponding
     * function of the first predicate to return truthy. The predicate-function
     * pairs are invoked with the `this` binding and arguments of the created
     * function.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {Array} pairs The predicate-function pairs.
     * @returns {Function} Returns the new composite function.
     * @example
     *
     * var func = _.cond([
     *   [_.matches({ 'a': 1 }),           _.constant('matches A')],
     *   [_.conforms({ 'b': _.isNumber }), _.constant('matches B')],
     *   [_.stubTrue,                      _.constant('no match')]
     * ]);
     *
     * func({ 'a': 1, 'b': 2 });
     * // => 'matches A'
     *
     * func({ 'a': 0, 'b': 1 });
     * // => 'matches B'
     *
     * func({ 'a': '1', 'b': '2' });
     * // => 'no match'
     */
    function cond(pairs) {
      var length = pairs == null ? 0 : pairs.length,
          toIteratee = getIteratee();

      pairs = !length ? [] : arrayMap(pairs, function(pair) {
        if (typeof pair[1] != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        return [toIteratee(pair[0]), pair[1]];
      });

      return baseRest(function(args) {
        var index = -1;
        while (++index < length) {
          var pair = pairs[index];
          if (apply(pair[0], this, args)) {
            return apply(pair[1], this, args);
          }
        }
      });
    }

    /**
     * Creates a function that invokes the predicate properties of `source` with
     * the corresponding property values of a given object, returning `true` if
     * all predicates return truthy, else `false`.
     *
     * **Note:** The created function is equivalent to `_.conformsTo` with
     * `source` partially applied.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {Object} source The object of property predicates to conform to.
     * @returns {Function} Returns the new spec function.
     * @example
     *
     * var objects = [
     *   { 'a': 2, 'b': 1 },
     *   { 'a': 1, 'b': 2 }
     * ];
     *
     * _.filter(objects, _.conforms({ 'b': function(n) { return n > 1; } }));
     * // => [{ 'a': 1, 'b': 2 }]
     */
    function conforms(source) {
      return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new constant function.
     * @example
     *
     * var objects = _.times(2, _.constant({ 'a': 1 }));
     *
     * console.log(objects);
     * // => [{ 'a': 1 }, { 'a': 1 }]
     *
     * console.log(objects[0] === objects[1]);
     * // => true
     */
    function constant(value) {
      return function() {
        return value;
      };
    }

    /**
     * Checks `value` to determine whether a default value should be returned in
     * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
     * or `undefined`.
     *
     * @static
     * @memberOf _
     * @since 4.14.0
     * @category Util
     * @param {*} value The value to check.
     * @param {*} defaultValue The default value.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * _.defaultTo(1, 10);
     * // => 1
     *
     * _.defaultTo(undefined, 10);
     * // => 10
     */
    function defaultTo(value, defaultValue) {
      return (value == null || value !== value) ? defaultValue : value;
    }

    /**
     * Creates a function that returns the result of invoking the given functions
     * with the `this` binding of the created function, where each successive
     * invocation is supplied the return value of the previous.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {...(Function|Function[])} [funcs] The functions to invoke.
     * @returns {Function} Returns the new composite function.
     * @see _.flowRight
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var addSquare = _.flow([_.add, square]);
     * addSquare(1, 2);
     * // => 9
     */
    var flow = createFlow();

    /**
     * This method is like `_.flow` except that it creates a function that
     * invokes the given functions from right to left.
     *
     * @static
     * @since 3.0.0
     * @memberOf _
     * @category Util
     * @param {...(Function|Function[])} [funcs] The functions to invoke.
     * @returns {Function} Returns the new composite function.
     * @see _.flow
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var addSquare = _.flowRight([square, _.add]);
     * addSquare(1, 2);
     * // => 9
     */
    var flowRight = createFlow(true);

    /**
     * This method returns the first argument it receives.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'a': 1 };
     *
     * console.log(_.identity(object) === object);
     * // => true
     */
    function identity(value) {
      return value;
    }

    /**
     * Creates a function that invokes `func` with the arguments of the created
     * function. If `func` is a property name, the created function returns the
     * property value for a given element. If `func` is an array or object, the
     * created function returns `true` for elements that contain the equivalent
     * source properties, otherwise it returns `false`.
     *
     * @static
     * @since 4.0.0
     * @memberOf _
     * @category Util
     * @param {*} [func=_.identity] The value to convert to a callback.
     * @returns {Function} Returns the callback.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * // The `_.matches` iteratee shorthand.
     * _.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
     * // => [{ 'user': 'barney', 'age': 36, 'active': true }]
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.filter(users, _.iteratee(['user', 'fred']));
     * // => [{ 'user': 'fred', 'age': 40 }]
     *
     * // The `_.property` iteratee shorthand.
     * _.map(users, _.iteratee('user'));
     * // => ['barney', 'fred']
     *
     * // Create custom iteratee shorthands.
     * _.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
     *   return !_.isRegExp(func) ? iteratee(func) : function(string) {
     *     return func.test(string);
     *   };
     * });
     *
     * _.filter(['abc', 'def'], /ef/);
     * // => ['def']
     */
    function iteratee(func) {
      return baseIteratee(typeof func == 'function' ? func : baseClone(func, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that performs a partial deep comparison between a given
     * object and `source`, returning `true` if the given object has equivalent
     * property values, else `false`.
     *
     * **Note:** The created function is equivalent to `_.isMatch` with `source`
     * partially applied.
     *
     * Partial comparisons will match empty array and empty object `source`
     * values against any array or object value, respectively. See `_.isEqual`
     * for a list of supported value comparisons.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new spec function.
     * @example
     *
     * var objects = [
     *   { 'a': 1, 'b': 2, 'c': 3 },
     *   { 'a': 4, 'b': 5, 'c': 6 }
     * ];
     *
     * _.filter(objects, _.matches({ 'a': 4, 'c': 6 }));
     * // => [{ 'a': 4, 'b': 5, 'c': 6 }]
     */
    function matches(source) {
      return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that performs a partial deep comparison between the
     * value at `path` of a given object to `srcValue`, returning `true` if the
     * object value is equivalent, else `false`.
     *
     * **Note:** Partial comparisons will match empty array and empty object
     * `srcValue` values against any array or object value, respectively. See
     * `_.isEqual` for a list of supported value comparisons.
     *
     * @static
     * @memberOf _
     * @since 3.2.0
     * @category Util
     * @param {Array|string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     * @example
     *
     * var objects = [
     *   { 'a': 1, 'b': 2, 'c': 3 },
     *   { 'a': 4, 'b': 5, 'c': 6 }
     * ];
     *
     * _.find(objects, _.matchesProperty('a', 4));
     * // => { 'a': 4, 'b': 5, 'c': 6 }
     */
    function matchesProperty(path, srcValue) {
      return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that invokes the method at `path` of a given object.
     * Any additional arguments are provided to the invoked method.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Util
     * @param {Array|string} path The path of the method to invoke.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Function} Returns the new invoker function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': _.constant(2) } },
     *   { 'a': { 'b': _.constant(1) } }
     * ];
     *
     * _.map(objects, _.method('a.b'));
     * // => [2, 1]
     *
     * _.map(objects, _.method(['a', 'b']));
     * // => [2, 1]
     */
    var method = baseRest(function(path, args) {
      return function(object) {
        return baseInvoke(object, path, args);
      };
    });

    /**
     * The opposite of `_.method`; this method creates a function that invokes
     * the method at a given path of `object`. Any additional arguments are
     * provided to the invoked method.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Util
     * @param {Object} object The object to query.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Function} Returns the new invoker function.
     * @example
     *
     * var array = _.times(3, _.constant),
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.methodOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.methodOf(object));
     * // => [2, 0]
     */
    var methodOf = baseRest(function(object, args) {
      return function(path) {
        return baseInvoke(object, path, args);
      };
    });

    /**
     * Adds all own enumerable string keyed function properties of a source
     * object to the destination object. If `object` is a function, then methods
     * are added to its prototype as well.
     *
     * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
     * avoid conflicts caused by modifying the original.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {Function|Object} [object=lodash] The destination object.
     * @param {Object} source The object of functions to add.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.chain=true] Specify whether mixins are chainable.
     * @returns {Function|Object} Returns `object`.
     * @example
     *
     * function vowels(string) {
     *   return _.filter(string, function(v) {
     *     return /[aeiou]/i.test(v);
     *   });
     * }
     *
     * _.mixin({ 'vowels': vowels });
     * _.vowels('fred');
     * // => ['e']
     *
     * _('fred').vowels().value();
     * // => ['e']
     *
     * _.mixin({ 'vowels': vowels }, { 'chain': false });
     * _('fred').vowels();
     * // => ['e']
     */
    function mixin(object, source, options) {
      var props = keys(source),
          methodNames = baseFunctions(source, props);

      if (options == null &&
          !(isObject(source) && (methodNames.length || !props.length))) {
        options = source;
        source = object;
        object = this;
        methodNames = baseFunctions(source, keys(source));
      }
      var chain = !(isObject(options) && 'chain' in options) || !!options.chain,
          isFunc = isFunction(object);

      arrayEach(methodNames, function(methodName) {
        var func = source[methodName];
        object[methodName] = func;
        if (isFunc) {
          object.prototype[methodName] = function() {
            var chainAll = this.__chain__;
            if (chain || chainAll) {
              var result = object(this.__wrapped__),
                  actions = result.__actions__ = copyArray(this.__actions__);

              actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
              result.__chain__ = chainAll;
              return result;
            }
            return func.apply(object, arrayPush([this.value()], arguments));
          };
        }
      });

      return object;
    }

    /**
     * Reverts the `_` variable to its previous value and returns a reference to
     * the `lodash` function.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @returns {Function} Returns the `lodash` function.
     * @example
     *
     * var lodash = _.noConflict();
     */
    function noConflict() {
      if (root._ === this) {
        root._ = oldDash;
      }
      return this;
    }

    /**
     * This method returns `undefined`.
     *
     * @static
     * @memberOf _
     * @since 2.3.0
     * @category Util
     * @example
     *
     * _.times(2, _.noop);
     * // => [undefined, undefined]
     */
    function noop() {
      // No operation performed.
    }

    /**
     * Creates a function that gets the argument at index `n`. If `n` is negative,
     * the nth argument from the end is returned.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {number} [n=0] The index of the argument to return.
     * @returns {Function} Returns the new pass-thru function.
     * @example
     *
     * var func = _.nthArg(1);
     * func('a', 'b', 'c', 'd');
     * // => 'b'
     *
     * var func = _.nthArg(-2);
     * func('a', 'b', 'c', 'd');
     * // => 'c'
     */
    function nthArg(n) {
      n = toInteger(n);
      return baseRest(function(args) {
        return baseNth(args, n);
      });
    }

    /**
     * Creates a function that invokes `iteratees` with the arguments it receives
     * and returns their results.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {...(Function|Function[])} [iteratees=[_.identity]]
     *  The iteratees to invoke.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.over([Math.max, Math.min]);
     *
     * func(1, 2, 3, 4);
     * // => [4, 1]
     */
    var over = createOver(arrayMap);

    /**
     * Creates a function that checks if **all** of the `predicates` return
     * truthy when invoked with the arguments it receives.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {...(Function|Function[])} [predicates=[_.identity]]
     *  The predicates to check.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.overEvery([Boolean, isFinite]);
     *
     * func('1');
     * // => true
     *
     * func(null);
     * // => false
     *
     * func(NaN);
     * // => false
     */
    var overEvery = createOver(arrayEvery);

    /**
     * Creates a function that checks if **any** of the `predicates` return
     * truthy when invoked with the arguments it receives.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {...(Function|Function[])} [predicates=[_.identity]]
     *  The predicates to check.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.overSome([Boolean, isFinite]);
     *
     * func('1');
     * // => true
     *
     * func(null);
     * // => true
     *
     * func(NaN);
     * // => false
     */
    var overSome = createOver(arraySome);

    /**
     * Creates a function that returns the value at `path` of a given object.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': 2 } },
     *   { 'a': { 'b': 1 } }
     * ];
     *
     * _.map(objects, _.property('a.b'));
     * // => [2, 1]
     *
     * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
     * // => [1, 2]
     */
    function property(path) {
      return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
    }

    /**
     * The opposite of `_.property`; this method creates a function that returns
     * the value at a given path of `object`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {Object} object The object to query.
     * @returns {Function} Returns the new accessor function.
     * @example
     *
     * var array = [0, 1, 2],
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
     * // => [2, 0]
     */
    function propertyOf(object) {
      return function(path) {
        return object == null ? undefined : baseGet(object, path);
      };
    }

    /**
     * Creates an array of numbers (positive and/or negative) progressing from
     * `start` up to, but not including, `end`. A step of `-1` is used if a negative
     * `start` is specified without an `end` or `step`. If `end` is not specified,
     * it's set to `start` with `start` then set to `0`.
     *
     * **Note:** JavaScript follows the IEEE-754 standard for resolving
     * floating-point values which can produce unexpected results.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns the range of numbers.
     * @see _.inRange, _.rangeRight
     * @example
     *
     * _.range(4);
     * // => [0, 1, 2, 3]
     *
     * _.range(-4);
     * // => [0, -1, -2, -3]
     *
     * _.range(1, 5);
     * // => [1, 2, 3, 4]
     *
     * _.range(0, 20, 5);
     * // => [0, 5, 10, 15]
     *
     * _.range(0, -4, -1);
     * // => [0, -1, -2, -3]
     *
     * _.range(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.range(0);
     * // => []
     */
    var range = createRange();

    /**
     * This method is like `_.range` except that it populates values in
     * descending order.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns the range of numbers.
     * @see _.inRange, _.range
     * @example
     *
     * _.rangeRight(4);
     * // => [3, 2, 1, 0]
     *
     * _.rangeRight(-4);
     * // => [-3, -2, -1, 0]
     *
     * _.rangeRight(1, 5);
     * // => [4, 3, 2, 1]
     *
     * _.rangeRight(0, 20, 5);
     * // => [15, 10, 5, 0]
     *
     * _.rangeRight(0, -4, -1);
     * // => [-3, -2, -1, 0]
     *
     * _.rangeRight(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.rangeRight(0);
     * // => []
     */
    var rangeRight = createRange(true);

    /**
     * This method returns a new empty array.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {Array} Returns the new empty array.
     * @example
     *
     * var arrays = _.times(2, _.stubArray);
     *
     * console.log(arrays);
     * // => [[], []]
     *
     * console.log(arrays[0] === arrays[1]);
     * // => false
     */
    function stubArray() {
      return [];
    }

    /**
     * This method returns `false`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `false`.
     * @example
     *
     * _.times(2, _.stubFalse);
     * // => [false, false]
     */
    function stubFalse() {
      return false;
    }

    /**
     * This method returns a new empty object.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {Object} Returns the new empty object.
     * @example
     *
     * var objects = _.times(2, _.stubObject);
     *
     * console.log(objects);
     * // => [{}, {}]
     *
     * console.log(objects[0] === objects[1]);
     * // => false
     */
    function stubObject() {
      return {};
    }

    /**
     * This method returns an empty string.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {string} Returns the empty string.
     * @example
     *
     * _.times(2, _.stubString);
     * // => ['', '']
     */
    function stubString() {
      return '';
    }

    /**
     * This method returns `true`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `true`.
     * @example
     *
     * _.times(2, _.stubTrue);
     * // => [true, true]
     */
    function stubTrue() {
      return true;
    }

    /**
     * Invokes the iteratee `n` times, returning an array of the results of
     * each invocation. The iteratee is invoked with one argument; (index).
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * _.times(3, String);
     * // => ['0', '1', '2']
     *
     *  _.times(4, _.constant(0));
     * // => [0, 0, 0, 0]
     */
    function times(n, iteratee) {
      n = toInteger(n);
      if (n < 1 || n > MAX_SAFE_INTEGER) {
        return [];
      }
      var index = MAX_ARRAY_LENGTH,
          length = nativeMin(n, MAX_ARRAY_LENGTH);

      iteratee = getIteratee(iteratee);
      n -= MAX_ARRAY_LENGTH;

      var result = baseTimes(length, iteratee);
      while (++index < n) {
        iteratee(index);
      }
      return result;
    }

    /**
     * Converts `value` to a property path array.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {*} value The value to convert.
     * @returns {Array} Returns the new property path array.
     * @example
     *
     * _.toPath('a.b.c');
     * // => ['a', 'b', 'c']
     *
     * _.toPath('a[0].b.c');
     * // => ['a', '0', 'b', 'c']
     */
    function toPath(value) {
      if (isArray(value)) {
        return arrayMap(value, toKey);
      }
      return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
    }

    /**
     * Generates a unique ID. If `prefix` is given, the ID is appended to it.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {string} [prefix=''] The value to prefix the ID with.
     * @returns {string} Returns the unique ID.
     * @example
     *
     * _.uniqueId('contact_');
     * // => 'contact_104'
     *
     * _.uniqueId();
     * // => '105'
     */
    function uniqueId(prefix) {
      var id = ++idCounter;
      return toString(prefix) + id;
    }

    /*------------------------------------------------------------------------*/

    /**
     * Adds two numbers.
     *
     * @static
     * @memberOf _
     * @since 3.4.0
     * @category Math
     * @param {number} augend The first number in an addition.
     * @param {number} addend The second number in an addition.
     * @returns {number} Returns the total.
     * @example
     *
     * _.add(6, 4);
     * // => 10
     */
    var add = createMathOperation(function(augend, addend) {
      return augend + addend;
    }, 0);

    /**
     * Computes `number` rounded up to `precision`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Math
     * @param {number} number The number to round up.
     * @param {number} [precision=0] The precision to round up to.
     * @returns {number} Returns the rounded up number.
     * @example
     *
     * _.ceil(4.006);
     * // => 5
     *
     * _.ceil(6.004, 2);
     * // => 6.01
     *
     * _.ceil(6040, -2);
     * // => 6100
     */
    var ceil = createRound('ceil');

    /**
     * Divide two numbers.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Math
     * @param {number} dividend The first number in a division.
     * @param {number} divisor The second number in a division.
     * @returns {number} Returns the quotient.
     * @example
     *
     * _.divide(6, 4);
     * // => 1.5
     */
    var divide = createMathOperation(function(dividend, divisor) {
      return dividend / divisor;
    }, 1);

    /**
     * Computes `number` rounded down to `precision`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Math
     * @param {number} number The number to round down.
     * @param {number} [precision=0] The precision to round down to.
     * @returns {number} Returns the rounded down number.
     * @example
     *
     * _.floor(4.006);
     * // => 4
     *
     * _.floor(0.046, 2);
     * // => 0.04
     *
     * _.floor(4060, -2);
     * // => 4000
     */
    var floor = createRound('floor');

    /**
     * Computes the maximum value of `array`. If `array` is empty or falsey,
     * `undefined` is returned.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {*} Returns the maximum value.
     * @example
     *
     * _.max([4, 2, 8, 6]);
     * // => 8
     *
     * _.max([]);
     * // => undefined
     */
    function max(array) {
      return (array && array.length)
        ? baseExtremum(array, identity, baseGt)
        : undefined;
    }

    /**
     * This method is like `_.max` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * the value is ranked. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {*} Returns the maximum value.
     * @example
     *
     * var objects = [{ 'n': 1 }, { 'n': 2 }];
     *
     * _.maxBy(objects, function(o) { return o.n; });
     * // => { 'n': 2 }
     *
     * // The `_.property` iteratee shorthand.
     * _.maxBy(objects, 'n');
     * // => { 'n': 2 }
     */
    function maxBy(array, iteratee) {
      return (array && array.length)
        ? baseExtremum(array, getIteratee(iteratee, 2), baseGt)
        : undefined;
    }

    /**
     * Computes the mean of the values in `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {number} Returns the mean.
     * @example
     *
     * _.mean([4, 2, 8, 6]);
     * // => 5
     */
    function mean(array) {
      return baseMean(array, identity);
    }

    /**
     * This method is like `_.mean` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the value to be averaged.
     * The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the mean.
     * @example
     *
     * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
     *
     * _.meanBy(objects, function(o) { return o.n; });
     * // => 5
     *
     * // The `_.property` iteratee shorthand.
     * _.meanBy(objects, 'n');
     * // => 5
     */
    function meanBy(array, iteratee) {
      return baseMean(array, getIteratee(iteratee, 2));
    }

    /**
     * Computes the minimum value of `array`. If `array` is empty or falsey,
     * `undefined` is returned.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {*} Returns the minimum value.
     * @example
     *
     * _.min([4, 2, 8, 6]);
     * // => 2
     *
     * _.min([]);
     * // => undefined
     */
    function min(array) {
      return (array && array.length)
        ? baseExtremum(array, identity, baseLt)
        : undefined;
    }

    /**
     * This method is like `_.min` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * the value is ranked. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {*} Returns the minimum value.
     * @example
     *
     * var objects = [{ 'n': 1 }, { 'n': 2 }];
     *
     * _.minBy(objects, function(o) { return o.n; });
     * // => { 'n': 1 }
     *
     * // The `_.property` iteratee shorthand.
     * _.minBy(objects, 'n');
     * // => { 'n': 1 }
     */
    function minBy(array, iteratee) {
      return (array && array.length)
        ? baseExtremum(array, getIteratee(iteratee, 2), baseLt)
        : undefined;
    }

    /**
     * Multiply two numbers.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Math
     * @param {number} multiplier The first number in a multiplication.
     * @param {number} multiplicand The second number in a multiplication.
     * @returns {number} Returns the product.
     * @example
     *
     * _.multiply(6, 4);
     * // => 24
     */
    var multiply = createMathOperation(function(multiplier, multiplicand) {
      return multiplier * multiplicand;
    }, 1);

    /**
     * Computes `number` rounded to `precision`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Math
     * @param {number} number The number to round.
     * @param {number} [precision=0] The precision to round to.
     * @returns {number} Returns the rounded number.
     * @example
     *
     * _.round(4.006);
     * // => 4
     *
     * _.round(4.006, 2);
     * // => 4.01
     *
     * _.round(4060, -2);
     * // => 4100
     */
    var round = createRound('round');

    /**
     * Subtract two numbers.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {number} minuend The first number in a subtraction.
     * @param {number} subtrahend The second number in a subtraction.
     * @returns {number} Returns the difference.
     * @example
     *
     * _.subtract(6, 4);
     * // => 2
     */
    var subtract = createMathOperation(function(minuend, subtrahend) {
      return minuend - subtrahend;
    }, 0);

    /**
     * Computes the sum of the values in `array`.
     *
     * @static
     * @memberOf _
     * @since 3.4.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {number} Returns the sum.
     * @example
     *
     * _.sum([4, 2, 8, 6]);
     * // => 20
     */
    function sum(array) {
      return (array && array.length)
        ? baseSum(array, identity)
        : 0;
    }

    /**
     * This method is like `_.sum` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the value to be summed.
     * The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the sum.
     * @example
     *
     * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
     *
     * _.sumBy(objects, function(o) { return o.n; });
     * // => 20
     *
     * // The `_.property` iteratee shorthand.
     * _.sumBy(objects, 'n');
     * // => 20
     */
    function sumBy(array, iteratee) {
      return (array && array.length)
        ? baseSum(array, getIteratee(iteratee, 2))
        : 0;
    }

    /*------------------------------------------------------------------------*/

    // Add methods that return wrapped values in chain sequences.
    lodash.after = after;
    lodash.ary = ary;
    lodash.assign = assign;
    lodash.assignIn = assignIn;
    lodash.assignInWith = assignInWith;
    lodash.assignWith = assignWith;
    lodash.at = at;
    lodash.before = before;
    lodash.bind = bind;
    lodash.bindAll = bindAll;
    lodash.bindKey = bindKey;
    lodash.castArray = castArray;
    lodash.chain = chain;
    lodash.chunk = chunk;
    lodash.compact = compact;
    lodash.concat = concat;
    lodash.cond = cond;
    lodash.conforms = conforms;
    lodash.constant = constant;
    lodash.countBy = countBy;
    lodash.create = create;
    lodash.curry = curry;
    lodash.curryRight = curryRight;
    lodash.debounce = debounce;
    lodash.defaults = defaults;
    lodash.defaultsDeep = defaultsDeep;
    lodash.defer = defer;
    lodash.delay = delay;
    lodash.difference = difference;
    lodash.differenceBy = differenceBy;
    lodash.differenceWith = differenceWith;
    lodash.drop = drop;
    lodash.dropRight = dropRight;
    lodash.dropRightWhile = dropRightWhile;
    lodash.dropWhile = dropWhile;
    lodash.fill = fill;
    lodash.filter = filter;
    lodash.flatMap = flatMap;
    lodash.flatMapDeep = flatMapDeep;
    lodash.flatMapDepth = flatMapDepth;
    lodash.flatten = flatten;
    lodash.flattenDeep = flattenDeep;
    lodash.flattenDepth = flattenDepth;
    lodash.flip = flip;
    lodash.flow = flow;
    lodash.flowRight = flowRight;
    lodash.fromPairs = fromPairs;
    lodash.functions = functions;
    lodash.functionsIn = functionsIn;
    lodash.groupBy = groupBy;
    lodash.initial = initial;
    lodash.intersection = intersection;
    lodash.intersectionBy = intersectionBy;
    lodash.intersectionWith = intersectionWith;
    lodash.invert = invert;
    lodash.invertBy = invertBy;
    lodash.invokeMap = invokeMap;
    lodash.iteratee = iteratee;
    lodash.keyBy = keyBy;
    lodash.keys = keys;
    lodash.keysIn = keysIn;
    lodash.map = map;
    lodash.mapKeys = mapKeys;
    lodash.mapValues = mapValues;
    lodash.matches = matches;
    lodash.matchesProperty = matchesProperty;
    lodash.memoize = memoize;
    lodash.merge = merge;
    lodash.mergeWith = mergeWith;
    lodash.method = method;
    lodash.methodOf = methodOf;
    lodash.mixin = mixin;
    lodash.negate = negate;
    lodash.nthArg = nthArg;
    lodash.omit = omit;
    lodash.omitBy = omitBy;
    lodash.once = once;
    lodash.orderBy = orderBy;
    lodash.over = over;
    lodash.overArgs = overArgs;
    lodash.overEvery = overEvery;
    lodash.overSome = overSome;
    lodash.partial = partial;
    lodash.partialRight = partialRight;
    lodash.partition = partition;
    lodash.pick = pick;
    lodash.pickBy = pickBy;
    lodash.property = property;
    lodash.propertyOf = propertyOf;
    lodash.pull = pull;
    lodash.pullAll = pullAll;
    lodash.pullAllBy = pullAllBy;
    lodash.pullAllWith = pullAllWith;
    lodash.pullAt = pullAt;
    lodash.range = range;
    lodash.rangeRight = rangeRight;
    lodash.rearg = rearg;
    lodash.reject = reject;
    lodash.remove = remove;
    lodash.rest = rest;
    lodash.reverse = reverse;
    lodash.sampleSize = sampleSize;
    lodash.set = set;
    lodash.setWith = setWith;
    lodash.shuffle = shuffle;
    lodash.slice = slice;
    lodash.sortBy = sortBy;
    lodash.sortedUniq = sortedUniq;
    lodash.sortedUniqBy = sortedUniqBy;
    lodash.split = split;
    lodash.spread = spread;
    lodash.tail = tail;
    lodash.take = take;
    lodash.takeRight = takeRight;
    lodash.takeRightWhile = takeRightWhile;
    lodash.takeWhile = takeWhile;
    lodash.tap = tap;
    lodash.throttle = throttle;
    lodash.thru = thru;
    lodash.toArray = toArray;
    lodash.toPairs = toPairs;
    lodash.toPairsIn = toPairsIn;
    lodash.toPath = toPath;
    lodash.toPlainObject = toPlainObject;
    lodash.transform = transform;
    lodash.unary = unary;
    lodash.union = union;
    lodash.unionBy = unionBy;
    lodash.unionWith = unionWith;
    lodash.uniq = uniq;
    lodash.uniqBy = uniqBy;
    lodash.uniqWith = uniqWith;
    lodash.unset = unset;
    lodash.unzip = unzip;
    lodash.unzipWith = unzipWith;
    lodash.update = update;
    lodash.updateWith = updateWith;
    lodash.values = values;
    lodash.valuesIn = valuesIn;
    lodash.without = without;
    lodash.words = words;
    lodash.wrap = wrap;
    lodash.xor = xor;
    lodash.xorBy = xorBy;
    lodash.xorWith = xorWith;
    lodash.zip = zip;
    lodash.zipObject = zipObject;
    lodash.zipObjectDeep = zipObjectDeep;
    lodash.zipWith = zipWith;

    // Add aliases.
    lodash.entries = toPairs;
    lodash.entriesIn = toPairsIn;
    lodash.extend = assignIn;
    lodash.extendWith = assignInWith;

    // Add methods to `lodash.prototype`.
    mixin(lodash, lodash);

    /*------------------------------------------------------------------------*/

    // Add methods that return unwrapped values in chain sequences.
    lodash.add = add;
    lodash.attempt = attempt;
    lodash.camelCase = camelCase;
    lodash.capitalize = capitalize;
    lodash.ceil = ceil;
    lodash.clamp = clamp;
    lodash.clone = clone;
    lodash.cloneDeep = cloneDeep;
    lodash.cloneDeepWith = cloneDeepWith;
    lodash.cloneWith = cloneWith;
    lodash.conformsTo = conformsTo;
    lodash.deburr = deburr;
    lodash.defaultTo = defaultTo;
    lodash.divide = divide;
    lodash.endsWith = endsWith;
    lodash.eq = eq;
    lodash.escape = escape;
    lodash.escapeRegExp = escapeRegExp;
    lodash.every = every;
    lodash.find = find;
    lodash.findIndex = findIndex;
    lodash.findKey = findKey;
    lodash.findLast = findLast;
    lodash.findLastIndex = findLastIndex;
    lodash.findLastKey = findLastKey;
    lodash.floor = floor;
    lodash.forEach = forEach;
    lodash.forEachRight = forEachRight;
    lodash.forIn = forIn;
    lodash.forInRight = forInRight;
    lodash.forOwn = forOwn;
    lodash.forOwnRight = forOwnRight;
    lodash.get = get;
    lodash.gt = gt;
    lodash.gte = gte;
    lodash.has = has;
    lodash.hasIn = hasIn;
    lodash.head = head;
    lodash.identity = identity;
    lodash.includes = includes;
    lodash.indexOf = indexOf;
    lodash.inRange = inRange;
    lodash.invoke = invoke;
    lodash.isArguments = isArguments;
    lodash.isArray = isArray;
    lodash.isArrayBuffer = isArrayBuffer;
    lodash.isArrayLike = isArrayLike;
    lodash.isArrayLikeObject = isArrayLikeObject;
    lodash.isBoolean = isBoolean;
    lodash.isBuffer = isBuffer;
    lodash.isDate = isDate;
    lodash.isElement = isElement;
    lodash.isEmpty = isEmpty;
    lodash.isEqual = isEqual;
    lodash.isEqualWith = isEqualWith;
    lodash.isError = isError;
    lodash.isFinite = isFinite;
    lodash.isFunction = isFunction;
    lodash.isInteger = isInteger;
    lodash.isLength = isLength;
    lodash.isMap = isMap;
    lodash.isMatch = isMatch;
    lodash.isMatchWith = isMatchWith;
    lodash.isNaN = isNaN;
    lodash.isNative = isNative;
    lodash.isNil = isNil;
    lodash.isNull = isNull;
    lodash.isNumber = isNumber;
    lodash.isObject = isObject;
    lodash.isObjectLike = isObjectLike;
    lodash.isPlainObject = isPlainObject;
    lodash.isRegExp = isRegExp;
    lodash.isSafeInteger = isSafeInteger;
    lodash.isSet = isSet;
    lodash.isString = isString;
    lodash.isSymbol = isSymbol;
    lodash.isTypedArray = isTypedArray;
    lodash.isUndefined = isUndefined;
    lodash.isWeakMap = isWeakMap;
    lodash.isWeakSet = isWeakSet;
    lodash.join = join;
    lodash.kebabCase = kebabCase;
    lodash.last = last;
    lodash.lastIndexOf = lastIndexOf;
    lodash.lowerCase = lowerCase;
    lodash.lowerFirst = lowerFirst;
    lodash.lt = lt;
    lodash.lte = lte;
    lodash.max = max;
    lodash.maxBy = maxBy;
    lodash.mean = mean;
    lodash.meanBy = meanBy;
    lodash.min = min;
    lodash.minBy = minBy;
    lodash.stubArray = stubArray;
    lodash.stubFalse = stubFalse;
    lodash.stubObject = stubObject;
    lodash.stubString = stubString;
    lodash.stubTrue = stubTrue;
    lodash.multiply = multiply;
    lodash.nth = nth;
    lodash.noConflict = noConflict;
    lodash.noop = noop;
    lodash.now = now;
    lodash.pad = pad;
    lodash.padEnd = padEnd;
    lodash.padStart = padStart;
    lodash.parseInt = parseInt;
    lodash.random = random;
    lodash.reduce = reduce;
    lodash.reduceRight = reduceRight;
    lodash.repeat = repeat;
    lodash.replace = replace;
    lodash.result = result;
    lodash.round = round;
    lodash.runInContext = runInContext;
    lodash.sample = sample;
    lodash.size = size;
    lodash.snakeCase = snakeCase;
    lodash.some = some;
    lodash.sortedIndex = sortedIndex;
    lodash.sortedIndexBy = sortedIndexBy;
    lodash.sortedIndexOf = sortedIndexOf;
    lodash.sortedLastIndex = sortedLastIndex;
    lodash.sortedLastIndexBy = sortedLastIndexBy;
    lodash.sortedLastIndexOf = sortedLastIndexOf;
    lodash.startCase = startCase;
    lodash.startsWith = startsWith;
    lodash.subtract = subtract;
    lodash.sum = sum;
    lodash.sumBy = sumBy;
    lodash.template = template;
    lodash.times = times;
    lodash.toFinite = toFinite;
    lodash.toInteger = toInteger;
    lodash.toLength = toLength;
    lodash.toLower = toLower;
    lodash.toNumber = toNumber;
    lodash.toSafeInteger = toSafeInteger;
    lodash.toString = toString;
    lodash.toUpper = toUpper;
    lodash.trim = trim;
    lodash.trimEnd = trimEnd;
    lodash.trimStart = trimStart;
    lodash.truncate = truncate;
    lodash.unescape = unescape;
    lodash.uniqueId = uniqueId;
    lodash.upperCase = upperCase;
    lodash.upperFirst = upperFirst;

    // Add aliases.
    lodash.each = forEach;
    lodash.eachRight = forEachRight;
    lodash.first = head;

    mixin(lodash, (function() {
      var source = {};
      baseForOwn(lodash, function(func, methodName) {
        if (!hasOwnProperty.call(lodash.prototype, methodName)) {
          source[methodName] = func;
        }
      });
      return source;
    }()), { 'chain': false });

    /*------------------------------------------------------------------------*/

    /**
     * The semantic version number.
     *
     * @static
     * @memberOf _
     * @type {string}
     */
    lodash.VERSION = VERSION;

    // Assign default placeholders.
    arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function(methodName) {
      lodash[methodName].placeholder = lodash;
    });

    // Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
    arrayEach(['drop', 'take'], function(methodName, index) {
      LazyWrapper.prototype[methodName] = function(n) {
        n = n === undefined ? 1 : nativeMax(toInteger(n), 0);

        var result = (this.__filtered__ && !index)
          ? new LazyWrapper(this)
          : this.clone();

        if (result.__filtered__) {
          result.__takeCount__ = nativeMin(n, result.__takeCount__);
        } else {
          result.__views__.push({
            'size': nativeMin(n, MAX_ARRAY_LENGTH),
            'type': methodName + (result.__dir__ < 0 ? 'Right' : '')
          });
        }
        return result;
      };

      LazyWrapper.prototype[methodName + 'Right'] = function(n) {
        return this.reverse()[methodName](n).reverse();
      };
    });

    // Add `LazyWrapper` methods that accept an `iteratee` value.
    arrayEach(['filter', 'map', 'takeWhile'], function(methodName, index) {
      var type = index + 1,
          isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;

      LazyWrapper.prototype[methodName] = function(iteratee) {
        var result = this.clone();
        result.__iteratees__.push({
          'iteratee': getIteratee(iteratee, 3),
          'type': type
        });
        result.__filtered__ = result.__filtered__ || isFilter;
        return result;
      };
    });

    // Add `LazyWrapper` methods for `_.head` and `_.last`.
    arrayEach(['head', 'last'], function(methodName, index) {
      var takeName = 'take' + (index ? 'Right' : '');

      LazyWrapper.prototype[methodName] = function() {
        return this[takeName](1).value()[0];
      };
    });

    // Add `LazyWrapper` methods for `_.initial` and `_.tail`.
    arrayEach(['initial', 'tail'], function(methodName, index) {
      var dropName = 'drop' + (index ? '' : 'Right');

      LazyWrapper.prototype[methodName] = function() {
        return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
      };
    });

    LazyWrapper.prototype.compact = function() {
      return this.filter(identity);
    };

    LazyWrapper.prototype.find = function(predicate) {
      return this.filter(predicate).head();
    };

    LazyWrapper.prototype.findLast = function(predicate) {
      return this.reverse().find(predicate);
    };

    LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
      if (typeof path == 'function') {
        return new LazyWrapper(this);
      }
      return this.map(function(value) {
        return baseInvoke(value, path, args);
      });
    });

    LazyWrapper.prototype.reject = function(predicate) {
      return this.filter(negate(getIteratee(predicate)));
    };

    LazyWrapper.prototype.slice = function(start, end) {
      start = toInteger(start);

      var result = this;
      if (result.__filtered__ && (start > 0 || end < 0)) {
        return new LazyWrapper(result);
      }
      if (start < 0) {
        result = result.takeRight(-start);
      } else if (start) {
        result = result.drop(start);
      }
      if (end !== undefined) {
        end = toInteger(end);
        result = end < 0 ? result.dropRight(-end) : result.take(end - start);
      }
      return result;
    };

    LazyWrapper.prototype.takeRightWhile = function(predicate) {
      return this.reverse().takeWhile(predicate).reverse();
    };

    LazyWrapper.prototype.toArray = function() {
      return this.take(MAX_ARRAY_LENGTH);
    };

    // Add `LazyWrapper` methods to `lodash.prototype`.
    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
      var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName),
          isTaker = /^(?:head|last)$/.test(methodName),
          lodashFunc = lodash[isTaker ? ('take' + (methodName == 'last' ? 'Right' : '')) : methodName],
          retUnwrapped = isTaker || /^find/.test(methodName);

      if (!lodashFunc) {
        return;
      }
      lodash.prototype[methodName] = function() {
        var value = this.__wrapped__,
            args = isTaker ? [1] : arguments,
            isLazy = value instanceof LazyWrapper,
            iteratee = args[0],
            useLazy = isLazy || isArray(value);

        var interceptor = function(value) {
          var result = lodashFunc.apply(lodash, arrayPush([value], args));
          return (isTaker && chainAll) ? result[0] : result;
        };

        if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
          // Avoid lazy use if the iteratee has a "length" value other than `1`.
          isLazy = useLazy = false;
        }
        var chainAll = this.__chain__,
            isHybrid = !!this.__actions__.length,
            isUnwrapped = retUnwrapped && !chainAll,
            onlyLazy = isLazy && !isHybrid;

        if (!retUnwrapped && useLazy) {
          value = onlyLazy ? value : new LazyWrapper(this);
          var result = func.apply(value, args);
          result.__actions__.push({ 'func': thru, 'args': [interceptor], 'thisArg': undefined });
          return new LodashWrapper(result, chainAll);
        }
        if (isUnwrapped && onlyLazy) {
          return func.apply(this, args);
        }
        result = this.thru(interceptor);
        return isUnwrapped ? (isTaker ? result.value()[0] : result.value()) : result;
      };
    });

    // Add `Array` methods to `lodash.prototype`.
    arrayEach(['pop', 'push', 'shift', 'sort', 'splice', 'unshift'], function(methodName) {
      var func = arrayProto[methodName],
          chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
          retUnwrapped = /^(?:pop|shift)$/.test(methodName);

      lodash.prototype[methodName] = function() {
        var args = arguments;
        if (retUnwrapped && !this.__chain__) {
          var value = this.value();
          return func.apply(isArray(value) ? value : [], args);
        }
        return this[chainName](function(value) {
          return func.apply(isArray(value) ? value : [], args);
        });
      };
    });

    // Map minified method names to their real names.
    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
      var lodashFunc = lodash[methodName];
      if (lodashFunc) {
        var key = lodashFunc.name + '';
        if (!hasOwnProperty.call(realNames, key)) {
          realNames[key] = [];
        }
        realNames[key].push({ 'name': methodName, 'func': lodashFunc });
      }
    });

    realNames[createHybrid(undefined, WRAP_BIND_KEY_FLAG).name] = [{
      'name': 'wrapper',
      'func': undefined
    }];

    // Add methods to `LazyWrapper`.
    LazyWrapper.prototype.clone = lazyClone;
    LazyWrapper.prototype.reverse = lazyReverse;
    LazyWrapper.prototype.value = lazyValue;

    // Add chain sequence methods to the `lodash` wrapper.
    lodash.prototype.at = wrapperAt;
    lodash.prototype.chain = wrapperChain;
    lodash.prototype.commit = wrapperCommit;
    lodash.prototype.next = wrapperNext;
    lodash.prototype.plant = wrapperPlant;
    lodash.prototype.reverse = wrapperReverse;
    lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;

    // Add lazy aliases.
    lodash.prototype.first = lodash.prototype.head;

    if (symIterator) {
      lodash.prototype[symIterator] = wrapperToIterator;
    }
    return lodash;
  });

  /*--------------------------------------------------------------------------*/

  // Export lodash.
  var _ = runInContext();

  // Some AMD build optimizers, like r.js, check for condition patterns like:
  if (true) {
    // Expose Lodash on the global object to prevent errors when Lodash is
    // loaded by a script tag in the presence of an AMD loader.
    // See http://requirejs.org/docs/errors.html#mismatch for more details.
    // Use `_.noConflict` to remove Lodash from the global object.
    root._ = _;

    // Define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module.
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
      return _;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
  // Check for `exports` after `define` in case a build optimizer adds it.
  else {}
}.call(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/uuid/index.js":
/*!************************************!*\
  !*** ./node_modules/uuid/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__(/*! ./v1 */ "./node_modules/uuid/v1.js");
var v4 = __webpack_require__(/*! ./v4 */ "./node_modules/uuid/v4.js");

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]]
  ]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ "./node_modules/uuid/lib/rng-browser.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/rng-browser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ "./node_modules/uuid/v1.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v1.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),

/***/ "./node_modules/uuid/v4.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ "./node_modules/validatorjs/src/async.js":
/*!***********************************************!*\
  !*** ./node_modules/validatorjs/src/async.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function AsyncResolvers(onFailedOne, onResolvedAll) {
  this.onResolvedAll = onResolvedAll;
  this.onFailedOne = onFailedOne;
  this.resolvers = {};
  this.resolversCount = 0;
  this.passed = [];
  this.failed = [];
  this.firing = false;
}

AsyncResolvers.prototype = {

  /**
   * Add resolver
   *
   * @param {Rule} rule
   * @return {integer}
   */
  add: function(rule) {
    var index = this.resolversCount;
    this.resolvers[index] = rule;
    this.resolversCount++;
    return index;
  },

  /**
   * Resolve given index
   *
   * @param  {integer} index
   * @return {void}
   */
  resolve: function(index) {
    var rule = this.resolvers[index];
    if (rule.passes === true) {
      this.passed.push(rule);
    } else if (rule.passes === false) {
      this.failed.push(rule);
      this.onFailedOne(rule);
    }

    this.fire();
  },

  /**
   * Determine if all have been resolved
   *
   * @return {boolean}
   */
  isAllResolved: function() {
    return (this.passed.length + this.failed.length) === this.resolversCount;
  },

  /**
   * Attempt to fire final all resolved callback if completed
   *
   * @return {void}
   */
  fire: function() {

    if (!this.firing) {
      return;
    }

    if (this.isAllResolved()) {
      this.onResolvedAll(this.failed.length === 0);
    }

  },

  /**
   * Enable firing
   *
   * @return {void}
   */
  enableFiring: function() {
    this.firing = true;
  }

};

module.exports = AsyncResolvers;


/***/ }),

/***/ "./node_modules/validatorjs/src/attributes.js":
/*!****************************************************!*\
  !*** ./node_modules/validatorjs/src/attributes.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var replacements = {

  /**
   * Between replacement (replaces :min and :max)
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  between: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      min: parameters[0],
      max: parameters[1]
    });
  },

  /**
   * Digits-Between replacement (replaces :min and :max)
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  digits_between: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      min: parameters[0],
      max: parameters[1]
    });
  },

  /**
   * Required_if replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  required_if: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      other: this._getAttributeName(parameters[0]),
      value: parameters[1]
    });
  },

  /**
   * Required_unless replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  required_unless: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      other: this._getAttributeName(parameters[0]),
      value: parameters[1]
    });
  },

  /**
   * Required_with replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  required_with: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      field: this._getAttributeName(parameters[0])
    });
  },

  /**
   * Required_with_all replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  required_with_all: function(template, rule) {
    var parameters = rule.getParameters();
    var getAttributeName = this._getAttributeName.bind(this);
    return this._replacePlaceholders(rule, template, {
      fields: parameters.map(getAttributeName).join(', ')
    });
  },

  /**
   * Required_without replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  required_without: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      field: this._getAttributeName(parameters[0])
    });
  },

  /**
   * Required_without_all replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  required_without_all: function(template, rule) {
    var parameters = rule.getParameters();
    var getAttributeName = this._getAttributeName.bind(this);
    return this._replacePlaceholders(rule, template, {
      fields: parameters.map(getAttributeName).join(', ')
    });
  },

  /**
   * After replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  after: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      after: this._getAttributeName(parameters[0])
    });
  },

  /**
   * Before replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  before: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      before: this._getAttributeName(parameters[0])
    });
  },

  /**
   * After_or_equal replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  after_or_equal: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      after_or_equal: this._getAttributeName(parameters[0])
    });
  },

  /**
   * Before_or_equal replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  before_or_equal: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      before_or_equal: this._getAttributeName(parameters[0])
    });
  },

  /**
   * Same replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  same: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      same: this._getAttributeName(parameters[0])
    });
  },
};

function formatter(attribute) {
  return attribute.replace(/[_\[]/g, ' ').replace(/]/g, '');
}

module.exports = {
  replacements: replacements,
  formatter: formatter
};


/***/ }),

/***/ "./node_modules/validatorjs/src/errors.js":
/*!************************************************!*\
  !*** ./node_modules/validatorjs/src/errors.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var Errors = function() {
  this.errors = {};
};

Errors.prototype = {
  constructor: Errors,

  /**
   * Add new error message for given attribute
   *
   * @param  {string} attribute
   * @param  {string} message
   * @return {void}
   */
  add: function(attribute, message) {
    if (!this.has(attribute)) {
      this.errors[attribute] = [];
    }

    if (this.errors[attribute].indexOf(message) === -1) {
      this.errors[attribute].push(message);
    }
  },

  /**
   * Returns an array of error messages for an attribute, or an empty array
   *
   * @param  {string} attribute A key in the data object being validated
   * @return {array} An array of error messages
   */
  get: function(attribute) {
    if (this.has(attribute)) {
      return this.errors[attribute];
    }

    return [];
  },

  /**
   * Returns the first error message for an attribute, false otherwise
   *
   * @param  {string} attribute A key in the data object being validated
   * @return {string|false} First error message or false
   */
  first: function(attribute) {
    if (this.has(attribute)) {
      return this.errors[attribute][0];
    }

    return false;
  },

  /**
   * Get all error messages from all failing attributes
   *
   * @return {Object} Failed attribute names for keys and an array of messages for values
   */
  all: function() {
    return this.errors;
  },

  /**
   * Determine if there are any error messages for an attribute
   *
   * @param  {string}  attribute A key in the data object being validated
   * @return {boolean}
   */
  has: function(attribute) {
    if (this.errors.hasOwnProperty(attribute)) {
      return true;
    }

    return false;
  }
};

module.exports = Errors;


/***/ }),

/***/ "./node_modules/validatorjs/src/lang sync recursive ^\\.\\/.*$":
/*!*********************************************************!*\
  !*** ./node_modules/validatorjs/src/lang sync ^\.\/.*$ ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./ar": "./node_modules/validatorjs/src/lang/ar.js",
	"./ar.js": "./node_modules/validatorjs/src/lang/ar.js",
	"./az": "./node_modules/validatorjs/src/lang/az.js",
	"./az.js": "./node_modules/validatorjs/src/lang/az.js",
	"./be": "./node_modules/validatorjs/src/lang/be.js",
	"./be.js": "./node_modules/validatorjs/src/lang/be.js",
	"./bg": "./node_modules/validatorjs/src/lang/bg.js",
	"./bg.js": "./node_modules/validatorjs/src/lang/bg.js",
	"./bs": "./node_modules/validatorjs/src/lang/bs.js",
	"./bs.js": "./node_modules/validatorjs/src/lang/bs.js",
	"./ca": "./node_modules/validatorjs/src/lang/ca.js",
	"./ca.js": "./node_modules/validatorjs/src/lang/ca.js",
	"./cs": "./node_modules/validatorjs/src/lang/cs.js",
	"./cs.js": "./node_modules/validatorjs/src/lang/cs.js",
	"./cy": "./node_modules/validatorjs/src/lang/cy.js",
	"./cy.js": "./node_modules/validatorjs/src/lang/cy.js",
	"./da": "./node_modules/validatorjs/src/lang/da.js",
	"./da.js": "./node_modules/validatorjs/src/lang/da.js",
	"./de": "./node_modules/validatorjs/src/lang/de.js",
	"./de.js": "./node_modules/validatorjs/src/lang/de.js",
	"./el": "./node_modules/validatorjs/src/lang/el.js",
	"./el.js": "./node_modules/validatorjs/src/lang/el.js",
	"./en": "./node_modules/validatorjs/src/lang/en.js",
	"./en.js": "./node_modules/validatorjs/src/lang/en.js",
	"./es": "./node_modules/validatorjs/src/lang/es.js",
	"./es.js": "./node_modules/validatorjs/src/lang/es.js",
	"./et": "./node_modules/validatorjs/src/lang/et.js",
	"./et.js": "./node_modules/validatorjs/src/lang/et.js",
	"./eu": "./node_modules/validatorjs/src/lang/eu.js",
	"./eu.js": "./node_modules/validatorjs/src/lang/eu.js",
	"./fa": "./node_modules/validatorjs/src/lang/fa.js",
	"./fa.js": "./node_modules/validatorjs/src/lang/fa.js",
	"./fi": "./node_modules/validatorjs/src/lang/fi.js",
	"./fi.js": "./node_modules/validatorjs/src/lang/fi.js",
	"./fr": "./node_modules/validatorjs/src/lang/fr.js",
	"./fr.js": "./node_modules/validatorjs/src/lang/fr.js",
	"./hr": "./node_modules/validatorjs/src/lang/hr.js",
	"./hr.js": "./node_modules/validatorjs/src/lang/hr.js",
	"./hu": "./node_modules/validatorjs/src/lang/hu.js",
	"./hu.js": "./node_modules/validatorjs/src/lang/hu.js",
	"./id": "./node_modules/validatorjs/src/lang/id.js",
	"./id.js": "./node_modules/validatorjs/src/lang/id.js",
	"./it": "./node_modules/validatorjs/src/lang/it.js",
	"./it.js": "./node_modules/validatorjs/src/lang/it.js",
	"./ja": "./node_modules/validatorjs/src/lang/ja.js",
	"./ja.js": "./node_modules/validatorjs/src/lang/ja.js",
	"./ka": "./node_modules/validatorjs/src/lang/ka.js",
	"./ka.js": "./node_modules/validatorjs/src/lang/ka.js",
	"./ko": "./node_modules/validatorjs/src/lang/ko.js",
	"./ko.js": "./node_modules/validatorjs/src/lang/ko.js",
	"./lt": "./node_modules/validatorjs/src/lang/lt.js",
	"./lt.js": "./node_modules/validatorjs/src/lang/lt.js",
	"./lv": "./node_modules/validatorjs/src/lang/lv.js",
	"./lv.js": "./node_modules/validatorjs/src/lang/lv.js",
	"./mk": "./node_modules/validatorjs/src/lang/mk.js",
	"./mk.js": "./node_modules/validatorjs/src/lang/mk.js",
	"./mn": "./node_modules/validatorjs/src/lang/mn.js",
	"./mn.js": "./node_modules/validatorjs/src/lang/mn.js",
	"./ms": "./node_modules/validatorjs/src/lang/ms.js",
	"./ms.js": "./node_modules/validatorjs/src/lang/ms.js",
	"./nb_NO": "./node_modules/validatorjs/src/lang/nb_NO.js",
	"./nb_NO.js": "./node_modules/validatorjs/src/lang/nb_NO.js",
	"./nl": "./node_modules/validatorjs/src/lang/nl.js",
	"./nl.js": "./node_modules/validatorjs/src/lang/nl.js",
	"./pl": "./node_modules/validatorjs/src/lang/pl.js",
	"./pl.js": "./node_modules/validatorjs/src/lang/pl.js",
	"./pt": "./node_modules/validatorjs/src/lang/pt.js",
	"./pt.js": "./node_modules/validatorjs/src/lang/pt.js",
	"./pt_BR": "./node_modules/validatorjs/src/lang/pt_BR.js",
	"./pt_BR.js": "./node_modules/validatorjs/src/lang/pt_BR.js",
	"./ro": "./node_modules/validatorjs/src/lang/ro.js",
	"./ro.js": "./node_modules/validatorjs/src/lang/ro.js",
	"./ru": "./node_modules/validatorjs/src/lang/ru.js",
	"./ru.js": "./node_modules/validatorjs/src/lang/ru.js",
	"./se": "./node_modules/validatorjs/src/lang/se.js",
	"./se.js": "./node_modules/validatorjs/src/lang/se.js",
	"./sl": "./node_modules/validatorjs/src/lang/sl.js",
	"./sl.js": "./node_modules/validatorjs/src/lang/sl.js",
	"./sq": "./node_modules/validatorjs/src/lang/sq.js",
	"./sq.js": "./node_modules/validatorjs/src/lang/sq.js",
	"./sr": "./node_modules/validatorjs/src/lang/sr.js",
	"./sr.js": "./node_modules/validatorjs/src/lang/sr.js",
	"./sv": "./node_modules/validatorjs/src/lang/sv.js",
	"./sv.js": "./node_modules/validatorjs/src/lang/sv.js",
	"./tr": "./node_modules/validatorjs/src/lang/tr.js",
	"./tr.js": "./node_modules/validatorjs/src/lang/tr.js",
	"./ua": "./node_modules/validatorjs/src/lang/ua.js",
	"./ua.js": "./node_modules/validatorjs/src/lang/ua.js",
	"./uk": "./node_modules/validatorjs/src/lang/uk.js",
	"./uk.js": "./node_modules/validatorjs/src/lang/uk.js",
	"./vi": "./node_modules/validatorjs/src/lang/vi.js",
	"./vi.js": "./node_modules/validatorjs/src/lang/vi.js",
	"./zh": "./node_modules/validatorjs/src/lang/zh.js",
	"./zh.js": "./node_modules/validatorjs/src/lang/zh.js",
	"./zh_TW": "./node_modules/validatorjs/src/lang/zh_TW.js",
	"./zh_TW.js": "./node_modules/validatorjs/src/lang/zh_TW.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/validatorjs/src/lang sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./node_modules/validatorjs/src/lang.js":
/*!**********************************************!*\
  !*** ./node_modules/validatorjs/src/lang.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var require;var Messages = __webpack_require__(/*! ./messages */ "./node_modules/validatorjs/src/messages.js");

__webpack_require__(/*! ./lang/en */ "./node_modules/validatorjs/src/lang/en.js");

var require_method = require;

var container = {

  messages: {},

  /**
   * Set messages for language
   *
   * @param {string} lang
   * @param {object} rawMessages
   * @return {void}
   */
  _set: function(lang, rawMessages) {
    this.messages[lang] = rawMessages;
  },

  /**
   * Set message for given language's rule.
   *
   * @param {string} lang
   * @param {string} attribute
   * @param {string|object} message
   * @return {void}
   */
  _setRuleMessage: function(lang, attribute, message) {
    this._load(lang);
    if (message === undefined) {
      message = this.messages[lang].def;
    }

    this.messages[lang][attribute] = message;
  },

  /**
   * Load messages (if not already loaded)
   *
   * @param  {string} lang
   * @return {void}
   */
  _load: function(lang) {
    if (!this.messages[lang]) {
      try {
        var rawMessages = __webpack_require__("./node_modules/validatorjs/src/lang sync recursive ^\\.\\/.*$")("./" + lang);
        this._set(lang, rawMessages);
      } catch (e) {}
    }
  },

  /**
   * Get raw messages for language
   *
   * @param  {string} lang
   * @return {object}
   */
  _get: function(lang) {
    this._load(lang);
    return this.messages[lang];
  },

  /**
   * Make messages for given language
   *
   * @param  {string} lang
   * @return {Messages}
   */
  _make: function(lang) {
    this._load(lang);
    return new Messages(lang, this.messages[lang]);
  }

};

module.exports = container;


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/ar.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/ar.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'الصفة :attribute يجب أن تكون مقبولة',
  after: 'الصفة :attribute يجب أن تكون بعد الصفة :after.',
  after_or_equal: 'الصفة :attribute يجب أن تكون مساوية أو بعد الصفة :after_or_equal.',
  alpha: 'حقل الصفة  :attribute يجب أن تحتوي على أحرف فقط',
  alpha_dash: 'حقل الصفة :attribute مسموح بأن يحتوي على حروف و أرقام و شرطة و شرطة منخفضة',
  alpha_num: 'حقل الصفة :attribute يجب أن يحتوي على أحرف و أرقام',
  before: 'الصفة :attribute يجب أن تكون قبل :before.',
  before_or_equal: 'الصفة :attribute يجب أن تكون مساوية أو قبل الصفة :before_or_equal.',
  between: 'حقل الصفة :attribute يجب أن يكون بين :min و :max.',
  confirmed: 'تأكيد الصفة :attribute غير متطابق.',
  email: 'الصفة :attribute صيغتها غير صحيحة',
  date: 'الصفة :attribute صيغتها ليست تاريخ صحيح',
  def: 'الصفة :attribute تحتوي على أخطاء',
  digits: 'الصفة :attribute يجب أن تكون :digits أرقام.',
  digits_between: 'يجب أن يحتوي :attribute بين :min و :max رقمًا/أرقام .',
  different: 'الصفة :attribute و الصفة :different يجب أن تكونا مختلفتين',
  in: 'الصفة :attribute المختارة، غير صحيحة.',
  integer: 'الصفة :attribute يجب أن تكون عدد صحيح',
  hex: 'حقل الصفة :attribute يجب أن يحتوي على صيغة هكسيديسمل',
  min: {
    numeric: 'الصفة :attribute يجب أن تكون :min على الأقل',
    string: 'الصفة :attribute يجب أن تكون :min حرف على الأقل.'
  },
  max: {
    numeric: 'الصفة :attribute لا يمكن أن تكون أكبر من  :max.',
    string: 'الصفة :attribute يجب أن لا تكون أكثر من :max حرف.'
  },
  not_in: 'الصفة :attribute المختارة غير صحيحة.',
  numeric: 'الصفة :attribute يجب أن تكون رقما.',
  present: 'حقل الصفة :attribute يجب أن يكون معرفا ، يمكن أن يكون فارغا.',
  required: 'حقل الصفة :attribute مطلوب.',
  required_if: 'حقل الصفة :attribute مطلوب حين تكون قيمة الحقل :other تساوي :value.',
  required_unless: 'حقل الصفة :attribute مطلوب حين تكون قيم الحقل :other لا تساوي :value.',
  required_with: 'حقل الصفة :attribute مطلوب حين يكون الحقا :field غير فارغ.',
  required_with_all: 'حقل الصفة :attribute مطلوب حين تكون الحقول :fields غير فارغة.',
  required_without: 'حقل الصفة :attribute مطلوب حين يكون الحقل :field فارغا.',
  required_without_all: 'حقل الصفة :attribute مطلوب حين تكون الحقول :fields فارغة.',
  same: 'حقل الصفة :attribute و حقل الصفة :same يجب أن يتطابقا.',
  size: {
    numeric: 'الصفة :attribute يجب أن تكون :size.',
    string: 'الصفة :attribute يجب أن تكون :size حرفا.'
  },
  string: 'الصفة :attribute يجب أن تكون نص.',
  url: 'الصفة :attribute صياغتها غير صحيحة.',
  regex: 'الصفة :attribute صياغتها غير صحيحة.',
  attributes: {
    username: 'اسم المستخدم',
    password: 'كلمة المرور',
    email: 'البريد الالكتروني',
    website: 'الموقع الالكتروني',
    firstname: 'الاسم الاول',
    lastname: 'الاسم الاخير',
    subject: 'الموضوع',
    city: 'المدينة',
    region: 'المنطقة',
    country: 'الدولة',
    street: 'الشارع',
    zipcode: 'الرمز البريدي',
    phone: 'رقم الهاتف',
    mobile: 'رقم الجوال'
  }
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/az.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/az.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute qəbul edilməlidir',
  active_url: ':attribute doğru URL deyil',
  after: ':attribute :date tarixindən sonra olmalıdır',
  after_or_equal: ':attribute :date tarixi ilə eyni və ya sonra olmalıdır',
  alpha: ':attribute yalnız hərflərdən ibarət ola bilər',
  alpha_dash: ':attribute yalnız hərf, rəqəm və tire simvolundan ibarət ola bilər',
  alpha_num: ':attribute yalnız hərf və rəqəmlərdən ibarət ola bilər',
  array: ':attribute massiv formatında olmalıdır',
  before: ':attribute :date tarixindən əvvəl olmalıdır',
  before_or_equal: ':attribute :date tarixindən əvvəl və ya bərabər olmalıdır',
  between: {
    numeric: ':attribute :min ilə :max arasında olmalıdır',
    file: ':attribute :min ilə :max KB ölçüsü intervalında olmalıdır',
    string: ':attribute :min ilə :max simvolu intervalında olmalıdır',
    array: ':attribute :min ilə :max intervalında hissədən ibarət olmalıdır'
  },
  boolean: ' :attribute doğru və ya yanlış ola bilər',
  confirmed: ' :attribute doğrulanması yanlışdır',
  date: ' :attribute tarix formatında olmalıdır',
  date_format: ' :attribute :format formatında olmalıdır',
  different: ' :attribute və :other fərqli olmalıdır',
  digits: ' :attribute :digits rəqəmli olmalıdır',
  digits_between: ' :attribute :min ilə :max rəqəmləri intervalında olmalıdır',
  dimensions: ' :attribute doğru şəkil ölçülərində deyil',
  distinct: ' :attribute dublikat qiymətlidir',
  email: ' :attribute doğru email formatında deyil',
  exists: ' seçilmiş :attribute yanlışdır',
  file: ' :attribute fayl formatında olmalıdır',
  filled: ' :attribute qiyməti olmalıdır',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.'
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.'
  },
  image: ' :attribute şəkil formatında olmalıdır',
  in: ' seçilmiş :attribute yanlışdır',
  in_array: ' :attribute :other qiymətləri arasında olmalıdır',
  integer: ' :attribute tam ədəd olmalıdır',
  ip: ' :attribute İP adres formatında olmalıdır',
  ipv4: ' :attribute İPv4 adres formatında olmalıdır',
  ipv6: ' :attribute İPv6 adres formatında olmalıdır',
  json: ' :attribute JSON formatında olmalıdır',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.'
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.'
  },
  max: {
    numeric: ' :attribute maksiumum :max rəqəmdən ibarət ola bilər',
    file: ' :attribute maksimum :max KB ölçüsündə ola bilər',
    string: ' :attribute maksimum :max simvoldan ibarət ola bilər',
    array: ' :attribute maksimum :max hədd\'dən ibarət ola bilər'
  },
  mimes: ' :attribute :values tipində fayl olmalıdır',
  mimetypes: ' :attribute :values tipində fayl olmalıdır',
  min: {
    numeric: ' :attribute minimum :min rəqəmdən ibarət ola bilər',
    file: ' :attribute minimum :min KB ölçüsündə ola bilər',
    string: ' :attribute minimum :min simvoldan ibarət ola bilər',
    array: ' :attribute minimum :min hədd\'dən ibarət ola bilər'
  },
  not_in: ' seçilmiş :attribute yanlışdır',
  numeric: ' :attribute rəqəmlərdən ibarət olmalıdır',
  present: ' :attribute iştirak etməlidir',
  regex: ' :attribute formatı yanlışdır',
  required: ' :attribute mütləqdir',
  required_if: ' :attribute (:other :value ikən) mütləqdir',
  required_unless: ' :attribute (:other :values \'ə daxil ikən) mütləqdir',
  required_with: ' :attribute (:values var ikən) mütləqdir',
  required_with_all: ' :attribute (:values var ikən) mütləqdir',
  required_without: ' :attribute (:values yox ikən) mütləqdir',
  required_without_all: ' :attribute (:values yox ikən) mütləqdir',
  same: ' :attribute və :other eyni olmalıdır',
  size: {
    numeric: ' :attribute :size ölçüsündə olmalıdır',
    file: ' :attribute :size KB ölçüsündə olmalıdır',
    string: ' :attribute :size simvoldan ibarət olmalıdır',
    array: ' :attribute :size hədd\'dən ibarət olmalıdır'
  },
  string: ' :attribute hərf formatında olmalıdır',
  timezone: ' :attribute ərazi formatında olmalıdır',
  unique: ' :attribute artıq iştirak edib',
  uploaded: ' :attribute yüklənməsi mümkün olmadı',
  url: ' :attribute formatı yanlışdır'
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/be.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/be.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Вы павінны прыняць :attribute.',
  active_url: 'Поле :attribute утрымлівае несапраўдны URL.',
  after: 'У полі :attribute павінна быць дата пасля :date.',
  after_or_equal: 'The :attribute must be a date after or equal to :date.',
  alpha: 'Поле :attribute можа мець толькі літары.',
  alpha_dash: 'Поле :attribute можа мець толькі літары, лічбы і злучок.',
  alpha_num: 'Поле :attribute можа мець толькі літары і лічбы.',
  array: 'Поле :attribute павінна быць масівам.',
  before: 'У полі :attribute павінна быць дата да :date.',
  before_or_equal: 'The :attribute must be a date before or equal to :date.',
  between: {
    numeric: 'Поле :attribute павінна быць паміж :min і :max.',
    file: 'Памер файла ў поле :attribute павінен быць паміж :min і :max кілабайт.',
    string: 'Колькасць сiмвалаў у поле :attribute павінна быць паміж :min і :max.',
    array: 'Колькасць элементаў у поле :attribute павінна быць паміж :min і :max.'
  },
  boolean: 'Поле :attribute павінна мець значэнне лагічнага тыпу.',
  confirmed: 'Поле :attribute не супадае з пацвярджэннем.',
  date: 'Поле :attribute не з\'яўляецца датай.',
  date_format: 'Поле :attribute не адпавядае фармату :format.',
  different: 'Палі :attribute і :other павінны адрознівацца.',
  digits: 'Даўжыня лічбавага поля :attribute павінна быць :digits.',
  digits_between: 'Даўжыня лічбавага поля :attribute павінна быць паміж :min і :max.',
  dimensions: 'The :attribute has invalid image dimensions.',
  distinct: 'The :attribute field has a duplicate value.',
  email: 'Поле :attribute павінна быць сапраўдным электронным адрасам.',
  file: 'The :attribute must be a file.',
  filled: 'Поле :attribute абавязкова для запаўнення.',
  exists: 'Выбранае значэнне для :attribute некарэктна.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.'
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.'
  },
  image: 'Поле :attribute павінна быць малюнкам.',
  in: 'Выбранае значэнне для :attribute памылкова.',
  in_array: 'The :attribute field does not exist in :other.',
  integer: 'Поле :attribute павінна быць цэлым лікам.',
  ip: 'Поле :attribute дпавінна быць сапраўдным IP-адрасам.',
  ipv4: 'The :attribute must be a valid IPv4 address.',
  ipv6: 'The :attribute must be a valid IPv6 address.',
  json: 'Поле :attribute павінна быць JSON радком.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.'
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.'
  },
  max: {
    numeric: 'Поле :attribute не можа быць больш :max.',
    file: 'Памер файла ў поле :attribute не можа быць больш :max кілабайт).',
    string: 'Колькасць сiмвалаў у поле :attribute не можа перавышаць :max.',
    array: 'Колькасць элементаў у поле :attribute не можа перавышаць :max.'
  },
  mimes: 'Поле :attribute павінна быць файлам аднаго з наступных тыпаў: :values.',
  mimetypes: 'Поле :attribute павінна быць файлам аднаго з наступных тыпаў: :values.',
  min: {
    numeric: 'Поле :attribute павінна быць не менш :min.',
    file: 'Памер файла ў полее :attribute павінен быць не менш :min кілабайт.',
    string: 'Колькасць сiмвалаў у поле :attribute павінна быць не менш :min.',
    array: 'Колькасць элементаў у поле :attribute павінна быць не менш :min.'
  },
  not_in: 'Выбранае значэнне для :attribute памылкова.',
  not_regex: 'The :attribute format is invalid.',
  numeric: 'Поле :attribute павінна быць лікам.',
  present: 'The :attribute field must be present.',
  regex: 'Поле :attribute мае памылковы фармат.',
  required: 'Поле :attribute абавязкова для запаўнення.',
  required_if: 'Поле :attribute абавязкова для запаўнення, калі :other раўняецца :value.',
  required_unless: 'Поле :attribute абавязкова для запаўнення, калі :other не раўняецца :values.',
  required_with: 'Поле :attribute абавязкова для запаўнення, калі :values ўказана.',
  required_with_all: 'Поле :attribute абавязкова для запаўнення, калі :values ўказана.',
  required_without: 'Поле :attribute абавязкова для запаўнення, калі :values не ўказана.',
  required_without_all: 'Поле :attribute абавязкова для запаўнення, калі ні адно з :values не ўказана.',
  same: 'Значэнне :attribute павінна супадаць з :other.',
  size: {
    numeric: 'Поле :attribute павінна быць :size.',
    file: 'Размер файла в поле :attribute павінен быць :size кілабайт.',
    string: 'Колькасць сiмвалаў у поле :attribute павінна быць :size.',
    array: 'Колькасць элементаў у поле :attribute павінна быць :size.'
  },
  string: 'Поле :attribute павінна быць радком.',
  timezone: 'Поле :attribute павінна быць сапраўдным гадзінным поясам.',
  unique: 'Такое значэнне поля :attribute ўжо існуе.',
  uploaded: 'The :attribute failed to upload.',
  url: 'Поле :attribute мае памылковы фармат.'
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/bg.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/bg.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Трябва да приемете :attribute.',
  active_url: 'Полето :attribute не е валиден URL адрес.',
  after: 'Полето :attribute трябва да бъде дата след :date.',
  after_or_equal: 'Полето :attribute трябва да бъде дата след или равна на :date.',
  alpha: 'Полето :attribute трябва да съдържа само букви.',
  alpha_dash: 'Полето :attribute трябва да съдържа само букви, цифри, долна черта и тире.',
  alpha_num: 'Полето :attribute трябва да съдържа само букви и цифри.',
  array: 'Полето :attribute трябва да бъде масив.',
  before: 'Полето :attribute трябва да бъде дата преди :date.',
  before_or_equal: 'Полето :attribute трябва да бъде дата преди или равна на :date.',
  between: {
    numeric: 'Полето :attribute трябва да бъде между :min и :max.',
    file: 'Полето :attribute трябва да бъде между :min и :max килобайта.',
    string: 'Полето :attribute трябва да бъде между :min и :max знака.',
    array: 'Полето :attribute трябва да има между :min - :max елемента.'
  },
  boolean: 'Полето :attribute трябва да съдържа Да или Не',
  confirmed: 'Полето :attribute не е потвърдено.',
  date: 'Полето :attribute не е валидна дата.',
  date_format: 'Полето :attribute не е във формат :format.',
  different: 'Полетата :attribute и :other трябва да са различни.',
  digits: 'Полето :attribute трябва да има :digits цифри.',
  digits_between: 'Полето :attribute трябва да има между :min и :max цифри.',
  dimensions: 'Невалидни размери за снимка :attribute.',
  distinct: 'Данните в полето :attribute се дублират.',
  email: 'Полето :attribute е в невалиден формат.',
  exists: 'Избранато поле :attribute вече съществува.',
  file: 'Полето :attribute трябва да бъде файл.',
  filled: 'Полето :attribute е задължително.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.'
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.'
  },
  image: 'Полето :attribute трябва да бъде изображение.',
  in: 'Избраното поле :attribute е невалидно.',
  in_array: 'Полето :attribute не съществува в :other.',
  integer: 'Полето :attribute трябва да бъде цяло число.',
  ip: 'Полето :attribute трябва да бъде IP адрес.',
  ipv4: 'Полето :attribute трябва да бъде IPv4 адрес.',
  ipv6: 'Полето :attribute трябва да бъде IPv6 адрес.',
  json: 'Полето :attribute трябва да бъде JSON низ.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.'
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.'
  },
  max: {
    numeric: 'Полето :attribute трябва да бъде по-малко от :max.',
    file: 'Полето :attribute трябва да бъде по-малко от :max килобайта.',
    string: 'Полето :attribute трябва да бъде по-малко от :max знака.',
    array: 'Полето :attribute трябва да има по-малко от :max елемента.'
  },
  mimes: 'Полето :attribute трябва да бъде файл от тип: :values.',
  mimetypes: 'Полето :attribute трябва да бъде файл от тип: :values.',
  min: {
    numeric: 'Полето :attribute трябва да бъде минимум :min.',
    file: 'Полето :attribute трябва да бъде минимум :min килобайта.',
    string: 'Полето :attribute трябва да бъде минимум :min знака.',
    array: 'Полето :attribute трябва има минимум :min елемента.'
  },
  not_in: 'Избраното поле :attribute е невалидно.',
  not_regex: 'The :attribute format is invalid.',
  numeric: 'Полето :attribute трябва да бъде число.',
  present: 'Полето :attribute трябва да съествува.',
  regex: 'Полето :attribute е в невалиден формат.',
  required: 'Полето :attribute е задължително.',
  required_if: 'Полето :attribute се изисква, когато :other е :value.',
  required_unless: 'Полето :attribute се изисква, освен ако :other не е в :values.',
  required_with: 'Полето :attribute се изисква, когато :values има стойност.',
  required_with_all: 'Полето :attribute е задължително, когато :values имат стойност.',
  required_without: 'Полето :attribute се изисква, когато :values няма стойност.',
  required_without_all: 'Полето :attribute се изисква, когато никое от полетата :values няма стойност.',
  same: 'Полетата :attribute и :other трябва да съвпадат.',
  size: {
    numeric: 'Полето :attribute трябва да бъде :size.',
    file: 'Полето :attribute трябва да бъде :size килобайта.',
    string: 'Полето :attribute трябва да бъде :size знака.',
    array: 'Полето :attribute трябва да има :size елемента.'
  },
  string: 'Полето :attribute трябва да бъде знаков низ.',
  timezone: 'Полето :attribute трябва да съдържа валидна часова зона.',
  unique: 'Полето :attribute вече съществува.',
  uploaded: 'Неуспешно качване на :attribute.',
  url: 'Полето :attribute е в невалиден формат.'
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/bs.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/bs.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Polje :attribute mora biti prihvaćeno.',
  active_url: 'Polje :attribute nije validan URL.',
  after: 'Polje :attribute mora biti datum poslije :date.',
  after_or_equal: 'The :attribute must be a date after or equal to :date.',
  alpha: 'Polje :attribute može sadržati samo slova.',
  alpha_dash: 'Polje :attribute može sadržati samo slova, brojeve i povlake.',
  alpha_num: 'Polje :attribute može sadržati samo slova i brojeve.',
  attributes: {},
  array: 'Polje :attribute mora biti niz.',
  before: 'Polje :attribute mora biti datum prije :date.',
  before_or_equal: 'The :attribute must be a date before or equal to :date.',
  between: {
    numeric: 'Polje :attribute mora biti izmedju :min - :max.',
    file: 'Fajl :attribute mora biti izmedju :min - :max kilobajta.',
    string: 'Polje :attribute mora biti izmedju :min - :max karaktera.',
    array: 'Polje :attribute mora biti između :min - :max karaktera.'
  },
  boolean: 'Polje :attribute mora biti tačno ili netačno',
  confirmed: 'Potvrda polja :attribute se ne poklapa.',
  date: 'Polje :attribute nema ispravan datum.',
  date_format: 'Polje :attribute nema odgovarajući format :format.',
  different: 'Polja :attribute i :other moraju biti različita.',
  digits: 'Polje :attribute mora da sadži :digits brojeve.',
  digits_between: 'Polje :attribute mora biti između :min i :max broja.',
  dimensions: 'The :attribute has invalid image dimensions.',
  distinct: 'The :attribute field has a duplicate value.',
  email: 'Format polja :attribute mora biti validan email.',
  exists: 'Odabrano polje :attribute nije validno.',
  file: 'The :attribute must be a file.',
  filled: 'Polje :attribute je obavezno.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.'
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.'
  },
  image: 'Polje :attribute mora biti slika.',
  in: 'Odabrano polje :attribute nije validno.',
  in_array: 'The :attribute field does not exist in :other.',
  integer: 'Polje :attribute mora biti broj.',
  ip: 'Polje :attribute mora biti validna IP adresa.',
  ipv4: 'The :attribute must be a valid IPv4 address.',
  ipv6: 'The :attribute must be a valid IPv6 address.',
  json: 'The :attribute must be a valid JSON string.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.'
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.'
  },
  max: {
    numeric: 'Polje :attribute mora biti manje od :max.',
    file: 'Polje :attribute mora biti manje od :max kilobajta.',
    string: 'Polje :attribute mora sadržati manje od :max karaktera.',
    array: 'Polje :attribute mora sadržati manje od :max karaktera.'
  },
  mimes: 'Polje :attribute mora biti fajl tipa: :values.',
  mimetypes: 'Polje :attribute mora biti fajl tipa: :values.',
  min: {
    numeric: 'Polje :attribute mora biti najmanje :min.',
    file: 'Fajl :attribute mora biti najmanje :min kilobajta.',
    string: 'Polje :attribute mora sadržati najmanje :min karaktera.',
    array: 'Polje :attribute mora sadržati najmanje :min karaktera.'
  },
  not_in: 'Odabrani element polja :attribute nije validan.',
  not_regex: 'The :attribute format is invalid.',
  numeric: 'Polje :attribute mora biti broj.',
  present: 'The :attribute field must be present.',
  regex: 'Polje :attribute ima neispravan format.',
  required: 'Polje :attribute je obavezno.',
  required_if: 'Polje :attribute je obavezno kada :other je :value.',
  required_unless: 'The :attribute field is required unless :other is in :values.',
  required_with: 'Polje :attribute je obavezno kada je :values prikazano.',
  required_with_all: 'Polje :attribute je obavezno kada je :values prikazano.',
  required_without: 'Polje :attribute je obavezno kada :values nije prikazano.',
  required_without_all: 'Polje :attribute je obavezno kada nijedno :values nije prikazano.',
  same: 'Polja :attribute i :other se moraju poklapati.',
  size: {
    numeric: 'Polje :attribute mora biti :size.',
    file: 'Fajl :attribute mora biti :size kilobajta.',
    string: 'Polje :attribute mora biti :size karaktera.',
    array: 'Polje :attribute mora biti :size karaktera.'
  },
  string: 'Polje :attribute mora sadrzavati slova.',
  timezone: 'Polje :attribute mora biti ispravna vremenska zona.',
  unique: 'Polje :attribute već postoji.',
  uploaded: 'The :attribute failed to upload.',
  url: 'Format polja :attribute nije validan.'
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/ca.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/ca.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'El camp :attribute pot ser aceptat.',
  after: 'El camp :attribute pot ser una data posterior a :after.',
  alpha: 'El camp :attribute només pot contenir lletras.',
  alpha_dash: 'El camp :attribute només pot contenir lletras, nombres y guions.',
  alpha_num: 'El camp :attribute només pot contenir lletras y nombres.',
  attributes: {},
  between: 'El camp :attribute té que estar entre :min - :max.',
  confirmed: 'La confirmació de :attribute no coincideix.',
  different: 'El camp :attribute y :other poden ser diferents.',
  digits: 'El camp :attribute pot tindre :digits dígitos.',
  digits_between: 'El camp  :attribute ha de tenir entre :min i :max dígits.',
  email: 'El camp :attribute no es un correu válido.',
  'in': 'El camp :attribute es invàlid.',
  integer: 'El camp :attribute pot ser un nombre enter.',
  hex: 'El camp :attribute hauria de tenir format hexadecimal',
  max: {
    numeric: 'El camp :attribute no pot ser mayor a :max.',
    string: 'El camp :attribute no pot ser mayor que :max caràcters.'
  },
  min: {
    numeric: 'La mida del camp :attribute pot ser de al menys :min.',
    string: 'El camp :attribute pot contenir al menys :min caràcters.'
  },
  not_in: 'El camp :attribute es invàlid.',
  numeric: 'El camp :attribute pot ser numéric.',
  present: 'El camp de :attribute pot estar present (però pot estar buit).',
  regex: 'El format del camp :attribute es invàlid.',
  required: 'El camp :attribute es obligatori.',
  required_if: 'El camp :attribute es obligatori quan :other es :value.',
  same: 'El camp :attribute y :other poden coincidir.',
  size: {
    numeric: 'La mida del camp :attribute pot ser :size.',
    string: 'El camp :attribute pot contenir :size caràcters.'
  },
  url: 'El format de :attribute es invàlid.'
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/cs.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/cs.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute musí být přijat.',
  active_url: ':attribute není platnou URL adresou.',
  after: ':attribute musí být datum po :date.',
  after_or_equal: 'The :attribute must be a date after or equal to :date.',
  alpha: ':attribute může obsahovat pouze písmena.',
  alpha_dash:
    ':attribute může obsahovat pouze písmena, číslice, pomlčky a podtržítka. České znaky (á, é, í, ó, ú, ů, ž, š, č, ř, ď, ť, ň) nejsou podporovány.',
  alpha_num: ':attribute může obsahovat pouze písmena a číslice.',
  attributes: {},
  array: ':attribute musí být pole.',
  before: ':attribute musí být datum před :date.',
  before_or_equal: 'The :attribute must be a date before or equal to :date.',
  between: {
    numeric: ':attribute musí být hodnota mezi :min a :max.',
    file: ':attribute musí být větší než :min a menší než :max Kilobytů.',
    string: ':attribute musí být delší než :min a kratší než :max znaků.',
    array: ':attribute musí obsahovat nejméně :min a nesmí obsahovat více než :max prvků.'
  },
  boolean: ':attribute musí být true nebo false',
  confirmed: ':attribute nebylo odsouhlaseno.',
  date: ':attribute musí být platné datum.',
  date_format: ':attribute není platný formát data podle :format.',
  different: ':attribute a :other se musí lišit.',
  digits: ':attribute musí být :digits pozic dlouhé.',
  digits_between: ':attribute musí být dlouhé nejméně :min a nejvíce :max pozic.',
  dimensions: ':attribute má neplatné rozměry.',
  distinct: ':attribute má duplicitní hodnotu.',
  email: ':attribute není platný formát.',
  exists: 'Zvolená hodnota pro :attribute není platná.',
  file: ':attribute musí být soubor.',
  filled: ':attribute musí být vyplněno.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.'
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.'
  },
  image: ':attribute musí být obrázek.',
  in: 'Zvolená hodnota pro :attribute je neplatná.',
  in_array: ':attribute není obsažen v :other.',
  integer: ':attribute musí být celé číslo.',
  ip: ':attribute musí být platnou IP adresou.',
  ipv4: 'The :attribute must be a valid IPv4 address.',
  ipv6: 'The :attribute must be a valid IPv6 address.',
  json: ':attribute musí být platný JSON řetězec.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.'
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.'
  },
  max: {
    numeric: ':attribute musí být nižší než :max.',
    file: ':attribute musí být menší než :max Kilobytů.',
    string: ':attribute musí být kratší než :max znaků.',
    array: ':attribute nesmí obsahovat více než :max prvků.'
  },
  mimes: ':attribute musí být jeden z následujících datových typů :values.',
  mimetypes: ':attribute musí být jeden z následujících datových typů :values.',
  min: {
    numeric: ':attribute musí být větší než :min.',
    file: ':attribute musí být větší než :min Kilobytů.',
    string: ':attribute musí být delší než :min znaků.',
    array: ':attribute musí obsahovat více než :min prvků.'
  },
  not_in: 'Zvolená hodnota pro :attribute je neplatná.',
  not_regex: 'The :attribute format is invalid.',
  numeric: ':attribute musí být číslo.',
  present: ':attribute musí být vyplněno.',
  regex: ':attribute nemá správný formát.',
  required: ':attribute musí být vyplněno.',
  required_if: ':attribute musí být vyplněno pokud :other je :value.',
  required_unless: ':attribute musí být vyplněno dokud :other je v :value.',
  required_with: ':attribute musí být vyplněno pokud :field je vyplněno.',
  required_with_all: ':attribute musí být vyplněno pokud :fields je zvoleno.',
  required_without: ':attribute musí být vyplněno pokud :field není vyplněno.',
  required_without_all: ':attribute musí být vyplněno pokud není žádné z :fields zvoleno.',
  same: ':attribute a :other se musí shodovat.',
  size: {
    numeric: ':attribute musí být přesně :size.',
    file: ':attribute musí mít přesně :size Kilobytů.',
    string: ':attribute musí být přesně :size znaků dlouhý.',
    array: ':attribute musí obsahovat právě :size prvků.'
  },
  string: ':attribute musí být řetězec znaků.',
  timezone: ':attribute musí být platná časová zóna.',
  unique: ':attribute musí být unikátní.',
  uploaded: 'Nahrávání :attribute se nezdařilo.',
  url: 'Formát :attribute je neplatný.'
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/cy.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/cy.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Rhaid derbyn :attribute.',
  active_url: 'Nid yw :attribute yn URL dilys.',
  after: 'Rhaid i :attribute fod yn ddyddiad sydd ar ôl :date.',
  after_or_equal: 'The :attribute must be a date after or equal to :date.',
  alpha: 'Dim ond llythrennau\'n unig gall :attribute gynnwys.',
  alpha_dash: 'Dim ond llythrennau, rhifau a dash yn unig gall :attribute gynnwys.',
  alpha_num: 'Dim ond llythrennau a rhifau yn unig gall :attribute gynnwys.',
  attributes: {},
  array: 'Rhaid i :attribute fod yn array.',
  before: 'Rhaid i :attribute fod yn ddyddiad sydd cyn :date.',
  before_or_equal: 'The :attribute must be a date before or equal to :date.',
  between: {
    numeric: 'Rhaid i :attribute fod rhwng :min a :max.',
    file: 'Rhaid i :attribute fod rhwng :min a :max kilobytes.',
    string: 'Rhaid i :attribute fod rhwng :min a :max nodyn.',
    array: 'Rhaid i :attribute fod rhwng :min a :max eitem.'
  },
  boolean: 'Rhaid i\'r maes :attribute fod yn wir neu gau.',
  confirmed: 'Nid yw\'r cadarnhad :attribute yn gyfwerth.',
  date: 'Nid yw :attribute yn ddyddiad dilys.',
  date_format: 'Nid yw :attribute yn y fformat :format.',
  different: 'Rhaid i :attribute a :other fod yn wahanol.',
  digits: 'Rhaid i :attribute fod yn :digits digid.',
  digits_between: 'Rhaid i :attribute fod rhwng :min a :max digid.',
  dimensions: 'The :attribute has invalid image dimensions.',
  distinct: 'The :attribute field has a duplicate value.',
  email: 'Rhaid i :attribute fod yn gyfeiriad ebost dilys.',
  file: 'The :attribute must be a file.',
  filled: 'Rhaid cynnwys :attribute.',
  exists: 'Nid yw :attribute yn ddilys.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.'
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.'
  },
  image: 'Rhaid i :attribute fod yn lun.',
  in: 'Nid yw :attribute yn ddilys.',
  in_array: 'The :attribute field does not exist in :other.',
  integer: 'Rhaid i :attribute fod yn integer.',
  ip: 'Rhaid i :attribute fod yn gyfeiriad IP dilys.',
  ipv4: 'The :attribute must be a valid IPv4 address.',
  ipv6: 'The :attribute must be a valid IPv6 address.',
  json: 'The :attribute must be a valid JSON string.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.'
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.'
  },
  max: {
    numeric: 'Ni chai :attribute fod yn fwy na :max.',
    file: 'Ni chai :attribute fod yn fwy na :max kilobytes.',
    string: 'Ni chai :attribute fod yn fwy na :max nodyn.',
    array: 'Ni chai :attribute fod yn fwy na :max eitem.'
  },
  mimes: 'Rhaid i :attribute fod yn ffeil o\'r math: :values.',
  mimetypes: 'Rhaid i :attribute fod yn ffeil o\'r math: :values.',
  min: {
    numeric: 'Rhaid i :attribute fod o leiaf :min.',
    file: 'Rhaid i :attribute fod o leiaf :min kilobytes.',
    string: 'Rhaid i :attribute fod o leiaf :min nodyn.',
    array: 'Rhaid i :attribute fod o leiaf :min eitem.'
  },
  not_in: 'Nid yw :attribute yn ddilys.',
  not_regex: 'The :attribute format is invalid.',
  numeric: 'Rhaid i :attribute fod yn rif.',
  present: 'The :attribute field must be present.',
  regex: 'Nid yw fformat :attribute yn ddilys.',
  required: 'Rhaid cynnwys :attribute.',
  required_if: 'Rhaid cynnwys :attribute pan mae :other yn :value.',
  required_unless: 'The :attribute field is required unless :other is in :values.',
  required_with: 'Rhaid cynnwys :attribute pan mae :values yn bresennol.',
  required_with_all: 'Rhaid cynnwys :attribute pan mae :values yn bresennol.',
  required_without: 'Rhaid cynnwys :attribute pan nad oes :values yn bresennol.',
  required_without_all: 'Rhaid cynnwys :attribute pan nad oes :values yn bresennol.',
  same: 'Rhaid i :attribute a :other fod yn gyfwerth.',
  size: {
    numeric: 'Rhaid i :attribute fod yn :size.',
    file: 'Rhaid i :attribute fod yn :size kilobytes.',
    string: 'Rhaid i :attribute fod yn :size nodyn.',
    array: 'Rhaid i :attribute fod yn :size eitem.'
  },
  string: 'The :attribute must be a string.',
  timezone: 'Rhaid i :attribute fod yn timezone dilys.',
  unique: 'Mae :attribute eisoes yn bodoli.',
  uploaded: 'The :attribute failed to upload.',
  url: 'Nid yw fformat :attribute yn ddilys.'
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/da.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/da.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute skal accepteres.',
  after: ':attribute skal være en dato efter :after.',
  after_or_equal: ':attribute skal være en dato efter eller lig med :after_or_equal.',
  alpha: ':attribute må kun bestå af bogstaver.',
  alpha_dash: ':attribute må kun bestå af bogstaver, tal og bindestreger.',
  alpha_num: ':attribute må kun bestå af bogstaver og tal.',
  before: ':attribute skal være en dato før :before.',
  before_or_equal: ':attribute skal være en dato før eller lig med :before_or_equal.',
  between: ':attribute skal være mellem :min og :max.',
  confirmed: ':attribute er ikke det samme som bekræftelsesfeltet.',
  email: ':attribute skal være en gyldig email.',
  date: ':attribute er ikke en gyldig dato.',
  def: ':attribute attributen har fejl.',
  digits: ':attribute skal have :digits cifre.',
  digits_between: ':attribute skal have mellem :min og :max cifre.',
  different: ':attribute og :different skal være forskellige.',
  in: 'Det valgte :attribute er ugyldigt.',
  integer: ':attribute skal være et heltal.',
  hex: ':attribute skal have hexadecimalt format',
  min: {
    numeric: ':attribute skal være mindst :min.',
    string: ':attribute skal være mindst :min tegn.'
  },
  max: {
    numeric: ':attribute skal være højest :max.',
    string: ':attribute skal være højest :max tegn.'
  },
  not_in: 'Den valgte :attribute er ugyldig',
  numeric: ':attribute skal være et tal.',
  present: ':attribute skal være tilstede.',
  required: ':attribute skal udfyldes.',
  required_if: ':attribute skal udfyldes når :other er :value.',
  required_unless: ':attribute er påkrævet medmindre :other findes i :values.',
  required_with: ':attribute skal udfyldes når :field er udfyldt.',
  required_with_all: ':attribute skal udfyldes når :fields er udfyldt.',
  required_without: ':attribute skal udfyldes når :field ikke er udfyldt.',
  required_without_all: ':attribute skal udfyldes når ingen af :fields er udfyldt.',
  same: ':attribute og :same skal være ens.',
  size: {
    numeric: ':attribute skal være :size.',
    string: ':attribute skal være :size tegn lang.'
  },
  string: ':attribute skal være en streng.',
  url: ':attribute formatet er ugyldigt.',
  regex: ':attribute formatet er ugyldigt.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/de.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/de.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Das :attribute Feld muss akzeptiert werden.',
  after: 'Das :attribute muss ein Datum nach dem :after sein.',
  after_or_equal: 'Das :attribute Datum muss kleiner oder gleich dem :after_or_equal sein.',
  alpha: 'Das :attribute Feld darf nur aus Buchstaben bestehen.',
  alpha_dash: 'Das :attribute Feld darf nur aus Buchstaben, Zahlen, Binde- und Unterstrichen bestehen.',
  alpha_num: 'Das :attribute Feld darf nur aus Buchstaben und Zahlen bestehen.',
  before: 'Das :attribute muss ein Datum vor dem :before sein.',
  before_or_equal: 'Das :attribute Datum muss größer oder gleich dem :before_or_equal sein.',
  between: 'Das :attribute Feld muss zwischen :min und :max liegen.',
  confirmed: 'Das :attribute Feld stimmt nicht mit der Bestätigung überein.',
  email: 'Das :attribute Format ist ungültig.',
  date: 'Das :attribute Feld muss ein gültiges Datum sein.',
  def: 'Das :attribute Feld hat Fehler.',
  digits: 'Das :attribute Feld muss :digits Stellen haben.',
  digits_between: 'Das :attribute Feld muss zwischen :min und :max Stellen haben.',
  different: 'Die Felder :attribute und :different müssen sich unterscheiden.',
  in: 'Der gewählte Wert für :attribute ist ungültig.',
  integer: 'Das :attribute Feld muss eine ganze Zahl sein.',
  hex: 'Das :attribute Feld sollte hexadezimal sein',
  min: {
    numeric: 'Das :attribute Feld muss mindestens :min sein.',
    string: 'Das :attribute Feld muss mindestens :min Zeichen lang sein.'
  },
  max: {
    numeric: 'Das :attribute Feld darf maximal :max sein.',
    string: 'Das :attribute Feld darf maximal :max Zeichen haben.'
  },
  not_in: 'Der gewählte Wert für :attribute ist ungültig.',
  numeric: 'Das :attribute Feld muss eine Zahl sein.',
  present: 'Das Feld :attribute muss vorhanden sein (kann aber leer sein).',
  required: 'Das :attribute Feld muss ausgefüllt sein.',
  required_if: 'Das :attribute Feld muss ausgefüllt sein, wenn :other :value ist.',
  same: 'Die Felder :attribute und :same müssen übereinstimmen.',
  size: {
    numeric: 'Das :attribute Feld muss gleich :size sein.',
    string: 'Das :attribute Feld muss :size Zeichen lang sein.'
  },
  string: 'Das :attribute Feld muss ein Satz sein.',
  url: 'Das Format von :attribute ist ungültig.',
  regex: 'Das :attribute Format ist ungültig.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/el.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/el.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Το πεδίο :attribute πρέπει να γίνει αποδεκτό.',
  after: 'Το πεδίο :attribute πρέπει να είναι μία ημερομηνία μετά από :after.',
  alpha: 'Το πεδίο :attribute μπορεί να περιέχει μόνο γράμματα.',
  alpha_dash: 'Το πεδίο :attribute μπορεί να περιέχει μόνο γράμματα, αριθμούς, και παύλες.',
  alpha_num: 'Το πεδίο :attribute μπορεί να περιέχει μόνο γράμματα και αριθμούς.',
  between: 'Το πεδίο :attribute πρέπει να είναι μεταξύ :min και :max.',
  confirmed: 'Η επιβεβαίωση του :attribute δεν ταιριάζει.',
  email: 'Το πεδίο :attribute πρέπει να είναι μία έγκυρη διεύθυνση email.',
  date: 'Το πεδίο :attribute δεν είναι έγκυρη ημερομηνία.',
  def: 'Το πεδίο :attribute περιέχει σφάλματα.',
  digits: 'Το πεδίο :attribute πρέπει να είναι :digits ψηφία.',
  digits_between: 'Το πεδίο :attribute πρέπει να είναι μεταξύ :min και :max ψηφία.',
  different: 'Το πεδίο :attribute  και :different πρέπει να είναι διαφορετικά.',
  in: 'Το επιλεγμένο :attribute δεν είναι έγκυρο.',
  integer: 'Το πεδίο :attribute πρέπει να είναι ακέραιος.',
  hex: 'Το πεδίο :attribute πρέπει να είναι σε δεκαεξαδική μορφή.',
  min: {
    numeric: 'Το πεδίο :attribute πρέπει να είναι τουλάχιστον :min.',
    string: 'Το πεδίο :attribute πρέπει να έχει τουλάχιστον :min χαρακτήρες.'
  },
  max: {
    numeric: 'Το πεδίο :attribute δεν μπορεί να είναι μεγαλύτερο από :max.',
    string: 'Το πεδίο :attribute δεν μπορεί να έχει περισσότερους από :max χαρακτήρες.'
  },
  not_in: 'Το επιλεγμένο :attribute δεν είναι αποδεκτό.',
  numeric: 'Το πεδίο :attribute πρέπει να είναι αριθμός.',
  present: 'The :attribute field must be present (but can be empty).',
  required: 'Το πεδίο :attribute είναι απαραίτητο.',
  required_if: 'Το πεδίο :attribute είναι απαραίτητο όταν το πεδίο :other είναι :value.',
  same: 'Τα πεδία :attribute και :same πρέπει να είναι ίδια.',
  size: {
    numeric: 'Το πεδίο :attribute πρέπει να είναι :size.',
    string: 'Το πεδίο :attribute πρέπει να είναι :size χαρακτήρες.'
  },
  string: 'Το πεδίο :attribute πρέπει να είναι αλφαριθμητικό.',
  url: 'Το πεδίο :attribute δεν είναι έγκυρη διεύθυνση URL.',
  regex: 'Η μορφή του :attribute δεν είναι αποδεκτή.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/en.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/en.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'The :attribute must be accepted.',
  after: 'The :attribute must be after :after.',
  after_or_equal: 'The :attribute must be equal or after :after_or_equal.',
  alpha: 'The :attribute field must contain only alphabetic characters.',
  alpha_dash: 'The :attribute field may only contain alpha-numeric characters, as well as dashes and underscores.',
  alpha_num: 'The :attribute field must be alphanumeric.',
  before: 'The :attribute must be before :before.',
  before_or_equal: 'The :attribute must be equal or before :before_or_equal.',
  between: 'The :attribute field must be between :min and :max.',
  confirmed: 'The :attribute confirmation does not match.',
  email: 'The :attribute format is invalid.',
  date: 'The :attribute is not a valid date format.',
  def: 'The :attribute attribute has errors.',
  digits: 'The :attribute must be :digits digits.',
  digits_between: 'The :attribute field must be between :min and :max digits.',
  different: 'The :attribute and :different must be different.',
  in: 'The selected :attribute is invalid.',
  integer: 'The :attribute must be an integer.',
  hex: 'The :attribute field should have hexadecimal format',
  min: {
    numeric: 'The :attribute must be at least :min.',
    string: 'The :attribute must be at least :min characters.'
  },
  max: {
    numeric: 'The :attribute may not be greater than :max.',
    string: 'The :attribute may not be greater than :max characters.'
  },
  not_in: 'The selected :attribute is invalid.',
  numeric: 'The :attribute must be a number.',
  present: 'The :attribute field must be present (but can be empty).',
  required: 'The :attribute field is required.',
  required_if: 'The :attribute field is required when :other is :value.',
  required_unless: 'The :attribute field is required when :other is not :value.',
  required_with: 'The :attribute field is required when :field is not empty.',
  required_with_all: 'The :attribute field is required when :fields are not empty.',
  required_without: 'The :attribute field is required when :field is empty.',
  required_without_all: 'The :attribute field is required when :fields are empty.',
  same: 'The :attribute and :same fields must match.',
  size: {
    numeric: 'The :attribute must be :size.',
    string: 'The :attribute must be :size characters.'
  },
  string: 'The :attribute must be a string.',
  url: 'The :attribute format is invalid.',
  regex: 'The :attribute format is invalid.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/es.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/es.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'El campo :attribute debe ser aceptado.',
  after: 'El campo :attribute debe ser una fecha posterior a :after.',
  alpha: 'El campo :attribute solo debe contener letras.',
  alpha_dash: 'El campo :attribute solo debe contener letras, números y guiones.',
  alpha_num: 'El campo :attribute solo debe contener letras y números.',
  attributes: {},
  between: 'El campo :attribute tiene que estar entre :min - :max.',
  confirmed: 'La confirmación de :attribute no coincide.',
  different: 'El campo :attribute y :other deben ser diferentes.',
  digits: 'El campo :attribute debe tener :digits dígitos.',
  digits_between: 'El campo :attribute debe tener entre :min y :max dígitos.',
  email: 'El campo :attribute no es un correo válido.',
  in: 'El campo :attribute es inválido.',
  integer: 'El campo :attribute debe ser un número entero.',
  hex: 'El campo :attribute debe tener formato hexadecimal.',
  max: {
    numeric: 'El campo :attribute no debe ser mayor a :max.',
    string: 'El campo :attribute no debe ser mayor que :max caracteres.'
  },
  min: {
    numeric: 'El tamaño del campo :attribute debe ser de al menos :min.',
    string: 'El campo :attribute debe contener al menos :min caracteres.'
  },
  not_in: 'El campo :attribute es inválido.',
  numeric: 'El campo :attribute debe ser numérico.',
  present: 'El campo de :attribute debe estar presente (pero puede estar vacío).',
  regex: 'El formato del campo :attribute es inválido.',
  required: 'El campo :attribute es obligatorio.',
  required_if: 'El campo :attribute es obligatorio cuando :other es :value.',
  same: 'El campo :attribute y :other deben coincidir.',
  size: {
    numeric: 'El tamaño del campo :attribute debe ser :size.',
    string: 'El campo :attribute debe contener :size caracteres.'
  },
  url: 'El formato de :attribute es inválido.'
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/et.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/et.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute tuleb aktsepteerida.',
  active_url: ':attribute ei ole kehtiv URL.',
  after: ':attribute peab olema kuupäev pärast :date.',
  after_or_equal: ':attribute peab olema kuupäev pärast või samastuma :date.',
  alpha: ':attribute võib sisaldada vaid tähemärke.',
  alpha_dash: ':attribute võib sisaldada vaid tähti, numbreid ja kriipse.',
  alpha_num: ':attribute võib sisaldada vaid tähti ja numbreid.',
  attributes: {},
  array: ':attribute peab olema massiiv.',
  before: ':attribute peab olema kuupäev enne :date.',
  before_or_equal: ':attribute peab olema kuupäev enne või samastuma :date.',
  between: {
    numeric: ':attribute peab olema :min ja :max vahel.',
    file: ':attribute peab olema :min ja :max kilobaidi vahel.',
    string: ':attribute peab olema :min ja :max tähemärgi vahel.',
    array: ':attribute peab olema :min ja :max kirje vahel.'
  },
  boolean: ':attribute väli peab olema tõene või väär.',
  confirmed: ':attribute kinnitus ei vasta.',
  date: ':attribute pole kehtiv kuupäev.',
  date_format: ':attribute ei vasta formaadile :format.',
  different: ':attribute ja :other peavad olema erinevad.',
  digits: ':attribute peab olema :digits numbrit.',
  digits_between: ':attribute peab olema :min ja :max numbri vahel.',
  dimensions: ':attribute on valed pildi suurused.',
  distinct: ':attribute väljal on topeltväärtus.',
  email: ':attribute peab olema kehtiv e-posti aadress.',
  exists: 'Valitud :attribute on vigane.',
  file: ':attribute peab olema fail.',
  filled: ':attribute väli on nõutav.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.'
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.'
  },
  image: ':attribute peab olema pilt.',
  in: 'Valitud :attribute on vigane.',
  in_array: ':attribute väli ei eksisteeri :other sees.',
  integer: ':attribute peab olema täisarv.',
  ip: ':attribute peab olema kehtiv IP aadress.',
  ipv4: ':attribute peab olema kehtiv IPv4 aadress.',
  ipv6: ':attribute peab olema kehtiv IPv6 aadress.',
  json: ':attribute peab olema kehtiv JSON string.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.'
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.'
  },
  max: {
    numeric: ':attribute ei tohi olla suurem kui :max.',
    file: ':attribute ei tohi olla suurem kui :max kilobaiti.',
    string: ':attribute ei tohi olla suurem kui :max tähemärki.',
    array: ':attribute ei tohi sisaldada rohkem kui :max kirjet.'
  },
  mimes: ':attribute peab olema :values tüüpi.',
  mimetypes: ':attribute peab olema :values tüüpi.',
  min: {
    numeric: ':attribute peab olema vähemalt :min.',
    file: ':attribute peab olema vähemalt :min kilobaiti.',
    string: ':attribute peab olema vähemalt :min tähemärki.',
    array: ':attribute peab olema vähemalt :min kirjet.'
  },
  not_in: 'Valitud :attribute on vigane.',
  not_regex: 'The :attribute format is invalid.',
  numeric: ':attribute peab olema number.',
  present: ':attribute väli peab olema esindatud.',
  regex: ':attribute vorming on vigane.',
  required: ':attribute väli on nõutud.',
  required_if: ':attribute väli on nõutud, kui :other on :value.',
  required_unless: ':attribute väli on nõutud, välja arvatud, kui :other on :values.',
  required_with: ':attribute väli on nõutud, kui :values on esindatud.',
  required_with_all: ':attribute väli on nõutud, kui :values on esindatud.',
  required_without: ':attribute väli on nõutud, kui :values ei ole esindatud.',
  required_without_all: ':attribute väli on nõutud, kui ükski :values pole esindatud.',
  same: ':attribute ja :other peavad sobima.',
  size: {
    numeric: ':attribute peab olema :size.',
    file: ':attribute peab olema :size kilobaiti.',
    string: ':attribute peab olema :size tähemärki.',
    array: ':attribute peab sisaldama :size kirjet.'
  },
  string: ':attribute peab olema string.',
  timezone: ':attribute peab olema kehtiv tsoon.',
  unique: ':attribute on juba hõivatud.',
  uploaded: ':attribute ei õnnestunud laadida.',
  url: ':attribute vorming on vigane.'
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/eu.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/eu.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute onartua izan behar da.',
  active_url: ':attribute ez da baliozko URL bat.',
  after: ':attribute :date osteko data izan behar da.',
  after_or_equal: ':attribute :date osteko data edo data berdina izan behar da.',
  alpha: ':attribute hizkiak besterik ezin ditu izan.',
  alpha_dash: ':attribute hizkiak, zenbakiak eta marrak besterik ezin ditu izan.',
  alpha_num: ':attribute hizkiak eta zenbakiak besterik ezin ditu izan.',
  attributes: {},
  array: ':attribute bilduma izan behar da.',
  before: ':attribute :date aurreko data izan behar da.',
  before_or_equal: ':attribute :date aurreko data edo data berdina izan behar da.',
  between: {
    numeric: ':attribute :min eta :max artean egon behar da.',
    file: ':attribute-k :min eta :max kilobyte arteko pisua izan behar du.',
    string: ':attribute :min eta :max karaktere artean egon behar da.',
    array: ':attribute-k :min eta :max arteko ale kantitatea euki behar du.'
  },
  boolean: ':attribute-ren balioa egia edo gezurra izan behar da.',
  confirmed: ':attribute-ren konfirmazioa ez dator bat.',
  date: ':attribute ez da baliozko data.',
  date_format: ':attribute datak ez du :format formatua.',
  different: ':attribute eta :other ezberdinak izan behar dira.',
  digits: ':attribute-k :digits digitu euki behar ditu.',
  digits_between: ':attribute-k :min eta :max arteko digitu kantitatea euki behar du.',
  dimensions: ':attribute-k ez ditu irudi neurri aproposak.',
  distinct: ':attribute-k balio bikoiztua dauka.',
  email: ':attribute-k baliozko posta helbidea euki behar du.',
  exists: 'Hautatutako :attribute baliogabea da.',
  file: ':attribute fitxategi bat izan behar da.',
  filled: ':attribute-k balioren bat euki behar du.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.'
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.'
  },
  image: ':attribute irudi bat izan behar da.',
  in: 'Hautatutako :attribute baliogabea da.',
  in_array: ':attribute ez da :other-en existizen.',
  integer: ':attribute zenbaki osoa izan behar da.',
  ip: ':attribute baliozko IP helbidea izan behar da.',
  ipv4: ':attribute baliozko IPv4 helbidea izan behar da.',
  ipv6: ':attribute baliozko IPv6 helbidea izan behar da.',
  json: ':attribute-k baliozko JSON karaktere-katea euki behar du.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.'
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.'
  },
  max: {
    numeric: ':attribute ezin da :max baino handiagoa izan.',
    file: ':attribute-k ezin du :max kilobyte baino gehiagoko pisua euki.',
    string: ':attribute-k ezin du :max karaktere baino gehiago euki.',
    array: ':attribute-k ezin du :max ale baino gehiago euki.'
  },
  mimes: ':attribute :values motatako fitxategia izan behar da.',
  mimetypes: ':attribute :values motatako fitxategia izan behar da.',
  min: {
    numeric: ':attribute-k gutxienez :min-eko tamaina izan behar du.',
    file: ':attribute-k gutxienez :min kilobyteko pisua euki behar du.',
    string: ':attribute-k gutxienez :min karaktere euki behar ditu.',
    array: ':attribute-k gutxienez :min ale euki behar ditu.'
  },
  not_in: 'Hautatutako :attribute baliogabea da.',
  not_regex: 'The :attribute format is invalid.',
  numeric: ':attribute zenbaki bat izan behar da.',
  present: ':attribute bertan egon behar da.',
  regex: ':attribute-k ez dauka formatu egokirik.',
  required: ':attribute derrigorrezkoa da.',
  required_if: ':attribute derrigorrezkoa da :other :value denean.',
  required_unless: ':attribute derrigorrezkoa da :other :values-en egon ezean.',
  required_with: ':attribute derrigorrezkoa da :values bertan dagoenean.',
  required_with_all: ':attribute derrigorrezkoa da :values bertan dagoenean.',
  required_without: ':attribute derrigorrezkoa da :values bertan ez dagoenean.',
  required_without_all: ':attribute derrigorrezkoa da :values bertan ez dagoenean.',
  same: ':attribute eta :other bat etorri behar dira.',
  size: {
    numeric: ':attribute-k :size-eko tamaina izan behar du.',
    file: ':attribute-k :size kilobyteko pisua euki behar du.',
    string: ':attribute-k :size karaktere euki beha ditu.',
    array: ':attribute-k :size ale euki behar ditu.'
  },
  string: ':attribute karaktere-katea izan behar da.',
  timezone: ':attribute baliozko gunea izan behar da.',
  unique: ':attribute jadanik erregistratua izan da.',
  uploaded: ':attribute igotzerakoan huts egin du.',
  url: ':attribute-k ez dauka formatu egokirik.'
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/fa.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/fa.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'فیلد :attribute می بایست تایید شود',
  alpha: 'فیلد :attribute می بایست فقط شامل حروف انگلیسی باشد',
  alpha_dash: 'فیلد :attribute می بایست فقط شامل حروف انگلیسی و خط تیره و زیرخط باشد',
  alpha_num: 'فیلد :attribute می بایست فقط شامل حروف و اعداد باشد',
  between: 'فیلد :attribute می بایست بزرگتر از :min و کوچکتر از :max باشد',
  confirmed: 'تطبیق فیلد :attribute صحیح نمی باشد',
  email: 'فرمت ایمیل وارد شده در :attribute صحیح نمی‌باشد',
  date: 'تاریخ درج شده در فیلد :attribute صحیح نیست',
  def: 'فیلد :attribute اشکال دارد',
  digits: 'فیلد :attribute می بایست شامل :digits رقم باشد',
  digits_between: ':attribute باید بین :min و :max رقم باشد.',
  different: 'فیلد :attribute می بایست مقداری غیر از :different داشته باشد',
  in: 'فیلد :attribute انتخاب شده صحیح نمی باشد',
  integer: 'فیلد :attribute می بایست عددی باشد',
  hex: 'فیلد :attribute باید در فرمت مبنای ۱۶ باشد',
  min: {
    numeric: 'فیلد :attribute می بایست از :min بزرگتر باشد',
    string: 'فیلد :attribute بایستی حداقل :min کاراکتر طول داشته باشد'
  },
  max: {
    numeric: 'فیلد :attribute می بایست از :max کوچکتر باشد',
    string: 'فیلد :attribute نباید بیشتر از :max کاراکتر طول داشته باشد'
  },
  not_in: 'فیلد :attribute انتخاب شده صحیح نمی باشد',
  numeric: 'فیلد :attribute می بایست عددی باشد',
  present: 'The :attribute field must be present (but can be empty).',
  required: 'فیلد :attribute الزامی است',
  required_if: 'در صورت دادن :value به :other تکمیل فیلد :attribute الزامی است',
  same: 'فیلد :attribute می بایست با فیلد :same یکی باشد',
  size: {
    numeric: 'فیلد :attribute می بایست :size باشد',
    string: 'فیلد :attribute می بایست :size کاراکتر طول داشته باشد'
  },
  string: 'فیلد :attribute می بایست متنی باشد',
  url: 'آدرس فیلد :attribute صحیح نمی باشد',
  regex: 'فرمت آدرس :attribute صحیح نمی باشد',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/fi.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/fi.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute on oltava hyväksytty.',
  after: ':attribute on oltava :after jälkeen.',
  after_or_equal: ':attribute täytyy olla sama kuin :after_or_equal tai sen jälkeen.',
  alpha: ':attribute kenttä saa sisältää ainoastaan kirjaimia.',
  alpha_dash: ':attribute kenttä saa sisältää ainoastaan kirjaimia tai numeroita, sekä pisteitä ja alaviivoja.',
  alpha_num: ':attribute kenttä saa sisältää ainoastaan kirjaimia tai numeroita.',
  before: ':attribute on oltava ennen kuin :before.',
  before_or_equal: ':attribute on oltava sama tai ennen kuin :before_or_equal.',
  between: ':attribute on oltava :min ja :max väliltä.',
  confirmed: ':attribute vahvistus ei täsmää.',
  email: ':attribute on väärässä muodossa.',
  date: ':attribute ei ole päivämäärä.',
  def: ':attribute sisältää virheitä.',
  digits: ':attribute on oltava :digits numeroa pitkä.',
  digits_between: 'Kentän :attribute arvon tulee olla :min - :max numeroa.',
  different: ':attribute ei saa olla yhtä kuin :different.',
  in: 'Valittu :attribute ei kelpaa.',
  integer: ':attribute ei ole numero.',
  hex: ':attribute on oltava heksadesimaali.',
  min: {
    numeric: ':attribute on oltava vähintään :min.',
    string: ':attribute on oltava vähintään :min merkkiä pitkä.'
  },
  max: {
    numeric: ':attribute on oltava enintään :max.',
    string: ':attribute on oltava enintään :max merkkiä pitkä.'
  },
  not_in: 'Valittu :attribute ei kelpaa.',
  numeric: ':attribute on oltava numero.',
  present: ':attribute kenttä on oltava (mutta saa olla tyhjä).',
  required: ':attribute kenttä on pakollinen.',
  required_if: ':attribute kenttä on pakollinen, jos kenttä :other on :value.',
  required_unless: ':attribute kenttä on pakollinen, jos kenttä :other ei ole :value.',
  required_with: ':attribute kenttä on pakollinen, jos kenttä :field ei ole tyhjä.',
  required_with_all: ':attribute kenttä on pakollinen, jos kentät :fields eivät ole tyhjiä.',
  required_without: ':attribute kenttä on pakollinen, jos kenttä :field on tyhjä.',
  required_without_all: ':attribute kenttä on pakollinen, jos kentät :fields ovat tyhjiä.',
  same: ':attribute ja :same on oltava samat.',
  size: {
    numeric: ':attribute on oltava :size.',
    string: ':attribute on oltava :size merkkiä pitkä.'
  },
  string: ':attribute on oltava merkkijono.',
  url: ':attribute on väärässä muodossa.',
  regex: ':attribute on väärässä muodossa.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/fr.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/fr.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Le champ :attribute doit être accepté.',
  alpha: 'Le champ :attribute ne peut contenir que des caractères alphabétiques.',
  alpha_dash: 'Le champ :attribute ne peut contenir que des caractères alphanumériques, des tirets et des underscores.',
  alpha_num: 'Le champ :attribute ne peut contenir que des caractères alphanumériques.',
  between: 'La longueur du champ :attribute doit être comprise entre :min and :max.',
  confirmed: 'Le champ :attribute n\'est pas confirmé.',
  email: 'Le champ :attribute contient un format invalide.',
  def: 'Le champ :attribute contient un attribut erroné.',
  digits: 'Le champ :attribute doit être composé de :digits chiffres.',
  digits_between: 'Le champ :attribute doit contenir entre :min et :max chiffres.',
  different: 'Les champs :attribute et :different doivent être différents.',
  in: 'Le champ :attribute est invalide.',
  integer: 'Le champ :attribute doit être un entier.',
  hex: 'Le champ :attribute doit être au format hexadécimal.',
  min: {
    numeric: 'Le champ :attribute doit être supérieur à :min.',
    string: 'Le champ :attribute doit contenir plus de :min caractères.'
  },
  max: {
    numeric: 'Le champ :attribute doit être inférieur à :max.',
    string: 'Le champ :attribute doit contenir moins de :max caractères.'
  },
  not_in: 'Le champ :attribute est invalide.',
  numeric: 'Le champ :attribute doit être un chiffre.',
  present: 'Le champ :attribute doit être présent (mais peut être vide).',
  required: 'Le champ :attribute est requis.',
  required_if: 'Le champ :attribute est requis quand :other est :value.',
  same: 'Les champs :attribute et :same doivent correspondre.',
  size: {
    numeric: 'Le champ :attribute doit être égal à :size.',
    string: 'Le champ :attribute doit contenir :size caractères.'
  },
  url: 'Le format du champ :attribute est invalide.',
  regex: 'Le format du champ :attribute est invalide.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/hr.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/hr.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Polje :attribute mora biti prihvaćeno.',
  active_url: 'Polje :attribute nije ispravan URL.',
  after: 'Polje :attribute mora biti datum nakon :date.',
  after_or_equal: 'Polje :attribute mora biti datum veći ili jednak :date.',
  alpha: 'Polje :attribute smije sadržavati samo slova.',
  alpha_dash: 'Polje :attribute smije sadržavati samo slova, brojeve i crtice.',
  alpha_num: 'Polje :attribute smije sadržavati samo slova i brojeve.',
  attributes: {},
  array: 'Polje :attribute mora biti niz.',
  before: 'Polje :attribute mora biti datum prije :date.',
  before_or_equal: 'Polje :attribute mora biti datum manji ili jednak :date.',
  between: {
    numeric: 'Polje :attribute mora biti između :min - :max.',
    file: 'Polje :attribute mora biti između :min - :max kilobajta.',
    string: 'Polje :attribute mora biti između :min - :max znakova.',
    array: 'Polje :attribute mora imati između :min - :max stavki.'
  },
  boolean: 'Polje :attribute mora biti false ili true.',
  confirmed: 'Potvrda polja :attribute se ne podudara.',
  date: 'Polje :attribute nije ispravan datum.',
  date_format: 'Polje :attribute ne podudara s formatom :format.',
  different: 'Polja :attribute i :other moraju biti različita.',
  digits: 'Polje :attribute mora sadržavati :digits znamenki.',
  digits_between: 'Polje :attribute mora imati između :min i :max znamenki.',
  dimensions: 'Polje :attribute ima neispravne dimenzije slike.',
  distinct: 'Polje :attribute ima dupliciranu vrijednost.',
  email: 'Polje :attribute mora biti ispravna e-mail adresa.',
  exists: 'Odabrano polje :attribute nije ispravno.',
  file: 'Polje :attribute mora biti datoteka.',
  filled: 'Polje :attribute je obavezno.',
  gt: {
    numeric: 'Polje :attribute mora biti veće od :value.',
    file: 'Polje :attribute mora biti veće od :value kilobajta.',
    string: 'Polje :attribute mora biti veće od :value karaktera.',
    array: 'Polje :attribute mora biti veće od :value stavki.'
  },
  gte: {
    numeric: 'Polje :attribute mora biti veće ili jednako :value.',
    file: 'Polje :attribute mora biti veće ili jednako :value kilobajta.',
    string: 'Polje :attribute mora biti veće ili jednako :value znakova.',
    array: 'Polje :attribute mora imati :value stavki ili više.'
  },
  image: 'Polje :attribute mora biti slika.',
  in: 'Odabrano polje :attribute nije ispravno.',
  in_array: 'Polje :attribute ne postoji u :other.',
  integer: 'Polje :attribute mora biti broj.',
  ip: 'Polje :attribute mora biti ispravna IP adresa.',
  ipv4: 'Polje :attribute mora biti ispravna IPv4 adresa.',
  ipv6: 'Polje :attribute mora biti ispravna IPv6 adresa.',
  json: 'Polje :attribute mora biti ispravan JSON string.',
  lt: {
    numeric: 'Polje :attribute mora biti manje od :value.',
    file: 'Polje :attribute mora biti manje od :value kilobajta.',
    string: 'Polje :attribute mora biti manje od :value znakova.',
    array: 'Polje :attribute mora biti manje od :value stavki.'
  },
  lte: {
    numeric: 'Polje :attribute mora biti manje ili jednako :value.',
    file: 'Polje :attribute mora biti manje ili jednako :value kilobajta.',
    string: 'Polje :attribute mora biti manje ili jednako :value znakova.',
    array: 'Polje :attribute ne smije imati više od :value stavki.'
  },
  max: {
    numeric: 'Polje :attribute mora biti manje od :max.',
    file: 'Polje :attribute mora biti manje od :max kilobajta.',
    string: 'Polje :attribute mora sadržavati manje od :max znakova.',
    array: 'Polje :attribute ne smije imati više od :max stavki.'
  },
  mimes: 'Polje :attribute mora biti datoteka tipa: :values.',
  mimetypes: 'Polje :attribute mora biti datoteka tipa: :values.',
  min: {
    numeric: 'Polje :attribute mora biti najmanje :min.',
    file: 'Polje :attribute mora biti najmanje :min kilobajta.',
    string: 'Polje :attribute mora sadržavati najmanje :min znakova.',
    array: 'Polje :attribute mora sadržavati najmanje :min stavki.'
  },
  not_in: 'Odabrano polje :attribute nije ispravno.',
  not_regex: 'Format polja :attribute je neispravan.',
  numeric: 'Polje :attribute mora biti broj.',
  present: 'Polje :attribute mora biti prisutno.',
  regex: 'Polje :attribute se ne podudara s formatom.',
  required: 'Polje :attribute je obavezno.',
  required_if: 'Polje :attribute je obavezno kada polje :other sadrži :value.',
  required_unless: 'Polje :attribute je obavezno osim :other je u :values.',
  required_with: 'Polje :attribute je obavezno kada postoji polje :values.',
  required_with_all: 'Polje :attribute je obavezno kada postje polja :values.',
  required_without: 'Polje :attribute je obavezno kada ne postoji polje :values.',
  required_without_all: 'Polje :attribute je obavezno kada nijedno od polja :values ne postoji.',
  same: 'Polja :attribute i :other se moraju podudarati.',
  size: {
    numeric: 'Polje :attribute mora biti :size.',
    file: 'Polje :attribute mora biti :size kilobajta.',
    string: 'Polje :attribute mora biti :size znakova.',
    array: 'Polje :attribute mora sadržavati :size stavki.'
  },
  string: 'Polje :attribute mora biti string.',
  timezone: 'Polje :attribute mora biti ispravna vremenska zona.',
  unique: 'Polje :attribute već postoji.',
  uploaded: 'Polje :attribute nije uspešno učitano.',
  url: 'Polje :attribute nije ispravnog formata.'
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/hu.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/hu.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'A(z) :attribute el kell legyen fogadva!',
  active_url: 'A(z) :attribute nem érvényes url!',
  after: 'A(z) :attribute :date utáni dátum kell, hogy legyen!',
  after_or_equal: 'A(z) :attribute nem lehet korábbi dátum, mint :date!',
  alpha: 'A(z) :attribute kizárólag betűket tartalmazhat!',
  alpha_dash: 'A(z) :attribute kizárólag betűket, számokat és kötőjeleket tartalmazhat!',
  alpha_num: 'A(z) :attribute kizárólag betűket és számokat tartalmazhat!',
  attributes: {},
  array: 'A(z) :attribute egy tömb kell, hogy legyen!',
  before: 'A(z) :attribute :date előtti dátum kell, hogy legyen!',
  before_or_equal: 'A(z) :attribute nem lehet későbbi dátum, mint :date!',
  between: {
    numeric: 'A(z) :attribute :min és :max közötti szám kell, hogy legyen!',
    file: 'A(z) :attribute mérete :min és :max kilobájt között kell, hogy legyen!',
    string: 'A(z) :attribute hossza :min és :max karakter között kell, hogy legyen!',
    array: 'A(z) :attribute :min - :max közötti elemet kell, hogy tartalmazzon!'
  },
  boolean: 'A(z) :attribute mező csak true vagy false értéket kaphat!',
  confirmed: 'A(z) :attribute nem egyezik a megerősítéssel.',
  date: 'A(z) :attribute nem érvényes dátum.',
  date_format: 'A(z) :attribute nem egyezik az alábbi dátum formátummal :format!',
  different: 'A(z) :attribute és :other értékei különbözőek kell, hogy legyenek!',
  digits: 'A(z) :attribute :digits számjegyű kell, hogy legyen!',
  digits_between: 'A(z) :attribute értéke :min és :max közötti számjegy lehet!',
  dimensions: 'A(z) :attribute felbontása nem megfelelő.',
  distinct: 'A(z) :attribute értékének egyedinek kell lennie!',
  email: 'A(z) :attribute nem érvényes email formátum.',
  exists: 'A(z) :attribute már létezik.',
  file: 'A(z) :attribute fájl kell, hogy legyen!',
  filled: 'A(z) :attribute megadása kötelező!',
  gt: {
    numeric: 'A(z) :attribute nagyobb kell, hogy legyen, mint :value!',
    file: 'A(z) :attribute mérete nagyobb kell, hogy legyen, mint :value kilobájt.',
    string: 'A(z) :attribute hosszabb kell, hogy legyen, mint :value karakter.',
    array: 'A(z) :attribute több, mint :value elemet kell, hogy tartalmazzon.'
  },
  gte: {
    numeric: 'A(z) :attribute nagyobb vagy egyenlő kell, hogy legyen, mint :value!',
    file: 'A(z) :attribute mérete nem lehet kevesebb, mint :value kilobájt.',
    string: 'A(z) :attribute hossza nem lehet kevesebb, mint :value karakter.',
    array: 'A(z) :attribute legalább :value elemet kell, hogy tartalmazzon.'
  },
  image: 'A(z) :attribute képfájl kell, hogy legyen!',
  in: 'A kiválasztott :attribute érvénytelen.',
  in_array: 'A(z) :attribute értéke nem található a(z) :other értékek között.',
  integer: 'A(z) :attribute értéke szám kell, hogy legyen!',
  ip: 'A(z) :attribute érvényes IP cím kell, hogy legyen!',
  ipv4: 'A(z) :attribute érvényes IPv4 cím kell, hogy legyen!',
  ipv6: 'A(z) :attribute érvényes IPv6 cím kell, hogy legyen!',
  json: 'A(z) :attribute érvényes JSON szöveg kell, hogy legyen!',
  lt: {
    numeric: 'A(z) :attribute kisebb kell, hogy legyen, mint :value!',
    file: 'A(z) :attribute mérete kisebb kell, hogy legyen, mint :value kilobájt.',
    string: 'A(z) :attribute rövidebb kell, hogy legyen, mint :value karakter.',
    array: 'A(z) :attribute kevesebb, mint :value elemet kell, hogy tartalmazzon.'
  },
  lte: {
    numeric: 'A(z) :attribute kisebb vagy egyenlő kell, hogy legyen, mint :value!',
    file: 'A(z) :attribute mérete nem lehet több, mint :value kilobájt.',
    string: 'A(z) :attribute hossza nem lehet több, mint :value karakter.',
    array: 'A(z) :attribute legfeljebb :value elemet kell, hogy tartalmazzon.'
  },
  max: {
    numeric: 'A(z) :attribute értéke nem lehet nagyobb, mint :max!',
    file: 'A(z) :attribute mérete nem lehet több, mint :max kilobájt.',
    string: 'A(z) :attribute hossza nem lehet több, mint :max karakter.',
    array: 'A(z) :attribute legfeljebb :max elemet kell, hogy tartalmazzon.'
  },
  mimes: 'A(z) :attribute kizárólag az alábbi fájlformátumok egyike lehet: :values.',
  mimetypes: 'A(z) :attribute kizárólag az alábbi fájlformátumok egyike lehet: :values.',
  min: {
    numeric: 'A(z) :attribute értéke nem lehet kisebb, mint :min!',
    file: 'A(z) :attribute mérete nem lehet kevesebb, mint :min kilobájt.',
    string: 'A(z) :attribute hossza nem lehet kevesebb, mint :min karakter.',
    array: 'A(z) :attribute legalább :min elemet kell, hogy tartalmazzon.'
  },
  not_in: 'A(z) :attribute értéke érvénytelen.',
  not_regex: 'A(z) :attribute formátuma érvénytelen.',
  numeric: 'A(z) :attribute szám kell, hogy legyen!',
  present: 'A(z) :attribute mező nem található!',
  regex: 'A(z) :attribute formátuma érvénytelen.',
  required: 'A(z) :attribute megadása kötelező!',
  required_if: 'A(z) :attribute megadása kötelező, ha a(z) :other értéke :value!',
  required_unless: 'A(z) :attribute megadása kötelező, ha a(z) :other értéke nem :values!',
  required_with: 'A(z) :attribute megadása kötelező, ha a(z) :values érték létezik.',
  required_with_all: 'A(z) :attribute megadása kötelező, ha a(z) :values értékek léteznek.',
  required_without: 'A(z) :attribute megadása kötelező, ha a(z) :values érték nem létezik.',
  required_without_all: 'A(z) :attribute megadása kötelező, ha egyik :values érték sem létezik.',
  same: 'A(z) :attribute és :other mezőknek egyezniük kell!',
  size: {
    numeric: 'A(z) :attribute értéke :size kell, hogy legyen!',
    file: 'A(z) :attribute mérete :size kilobájt kell, hogy legyen!',
    string: 'A(z) :attribute hossza :size karakter kell, hogy legyen!',
    array: 'A(z) :attribute :size elemet kell tartalmazzon!'
  },
  string: 'A(z) :attribute szöveg kell, hogy legyen.',
  timezone: 'A(z) :attribute nem létező időzona.',
  unique: 'A(z) :attribute már foglalt.',
  uploaded: 'A(z) :attribute feltöltése sikertelen.',
  url: 'A(z) :attribute érvénytelen link.'
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/id.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/id.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute harus disetujui.',
  after: ':attribute harus setelah :after.',
  after_or_equal: ':attribute harus sama dengan atau setelah :after_or_equal.',
  alpha: ':attribute hanya boleh berisi huruf.',
  alpha_dash: ':attribute hanya boleh berisi huruf, - atau _.',
  alpha_num: ':attribute hanya boleh berisi huruf dan angka.',
  before: ':attribute harus sebelum :before.',
  before_or_equal: ':attribute harus sama dengan atau sebelum :before_or_equal.',
  between: ':attribute harus berisi antara :min dan :max.',
  confirmed: ':attribute konfirmasi tidak sama.',
  email: ':attribute harus berupa email.',
  date: ':attribute format tanggal tidak benar.',
  def: ':attribute attribute has errors.',
  digits: ':attribute harus :digits digit.',
  digits_between: 'Isian :attribute harus antara angka :min dan :max.',
  different: ':attribute dan :different harus berbeda.',
  in: ':attribute tidak benar.',
  integer: ':attribute harus berupa angka.',
  hex: ':attribute harus berformat heksadesimal',
  min: {
    numeric: ':attribute minimal :min.',
    string: ':attribute minimal :min karakter.'
  },
  max: {
    numeric: ':attribute harus lebih kecil :max.',
    string: ':attribute maksimal :max karakter.'
  },
  not_in: ':attribute tidak benar.',
  numeric: ':attribute harus berupa angka.',
  present: ':attribute harus ada (tapi boleh kosong).',
  required: ':attribute tidak boleh kosong.',
  required_if: ':attribute harus di isi jika :other berisi :value.',
  required_unless: ':attribute harus di isi jika :other tidak berisi :value.',
  required_with: ':attribute harus di isi jika :field tidak kosong.',
  required_with_all: ':attribute harus di isi jika :fields tidak kosong.',
  required_without: ':attribute harus di isi jika :field kosong.',
  required_without_all: ':attribute harus di isi jika :fields kosong.',
  same: ':attribute dan :same harus sama.',
  size: {
    numeric: ':attribute harus berisi :size.',
    string: ':attribute harus berisi :size karakter.'
  },
  string: ':attribute harus berupa string.',
  url: ':attribute harus berupa format url.',
  regex: ':attribute format tidak benar.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/it.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/it.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Il campo :attribute deve essere accettato.',
  alpha: 'Il campo :attribute deve contenere sono caratteri alfabetici.',
  alpha_dash: 'Il campo :attribute può contenere solo caratteri alfanumerici oltre a trattini e trattini bassi.',
  alpha_num: 'Il campo :attribute deve essere alfanumerico.',
  between: 'Il campo :attribute deve essere compreso tra :min e :max.',
  confirmed: 'Il campo conferma :attribute non è uguale.',
  email: 'Il formato dell\'attributo :attribute non è valido.',
  def: 'Gli attributi del campo :attribute contengono degli errori.',
  digits: 'Il campo :attribute deve essere di :digits cifre.',
  digits_between: 'Il campo :attribute deve essere tra :min e :max cifre.',
  different: 'Il campo :attribute e :different devo essere diversi.',
  in: 'Il valore del campo :attribute non è valido.',
  integer: 'Il campo :attribute deve essere un valore intero.',
  hex: 'Il campo :attribute deve essere in formato esadecimale',
  min: {
    numeric: 'Il campo :attribute deve essere maggiore o uguale di :min.',
    string: 'Il campo :attribute deve essere composto da almeno :min caratteri.'
  },
  max: {
    numeric: 'Il campo :attribute deve essere minore o uguale di :max.',
    string: 'Il campo :attribute deve essere composto da massimo :max caratteri.'
  },
  not_in: 'Il campo :attribute non è valido.',
  numeric: 'Il campo :attribute deve essere un numero.',
  present: 'Il campo :attribute deve essere presente (ma può essere vuoto).',
  required: 'Il campo :attribute è richiesto.',
  required_if: 'Il campo :attribute è richiesto quando il campo :other è uguale a :value.',
  same: 'I campi :attribute e :same devono essere uguali.',
  size: {
    numeric: 'La dimensione del campo :attribute deve essere uguale a :size.',
    string: 'Il campo :attribute deve essere di :size caratteri.'
  },
  string: 'Il campo :attribute deve essere una stringa.',
  url: 'Il formato del campo :attribute non è valido.',
  regex: 'Il formato del campo :attribute non è valido.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/ja.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/ja.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attributeを確認してください。',
  after: ':attributeは:afterより後の日付を入力してください。',
  after_or_equal: ':attributeは:after_or_equal以降の日付を入力してください。',
  alpha: ':attributeは英字のみで入力してください。',
  alpha_dash: ':attributeは英字とダッシュと下線のみで入力してください。',
  alpha_num: ':attributeは英数字のみで入力してください。',
  before: ':attributeは:beforeより前の日付を入力してください。',
  before_or_equal: ':attributeは:before_or_equal以前の日付を入力してください。',
  between: ':attributeは:min〜:max文字で入力してください。',
  confirmed: ':attributeは確認が一致しません。',
  email: ':attributeは正しいメールアドレスを入力してください。',
  date: ':attributeは正しい日付形式を入力してください',
  def: ':attributeは検証エラーが含まれています。',
  digits: ':attributeは:digitsの数字のみで入力してください。',
  digits_between: ':attributeは、:min桁から:max桁にしてください。',
  different: ':attributeと:differentは同じであってはなりません。',
  in: '選択された:attributeは無効です。',
  integer: ':attributeは整数で入力してください。',
  hex: ':attributeは16進数で入力してください。',
  min: {
    numeric: ':attributeは:min以上で入力してください。',
    string: ':attributeは:min文字以上で入力してください。'
  },
  max: {
    numeric: ':attributeは:max以下で入力してください。',
    string: ':attributeは:max文字以下で入力してください。'
  },
  not_in: '選択された:attributeは無効です。',
  numeric: ':attributeは数値で入力してください。',
  present: ':attributeを入力してください（空欄も可能です）。',
  required: ':attributeは必須です。',
  required_if: ':otherは:valueになったら:attributeは必須です。',
  required_unless: ':otherが:valueでなければ:attributeは必須です。',
  required_with: ':fieldが空欄でなければ:attributeは必須です。',
  required_with_all: ':fieldsが空欄でなければ:attributeは必須です。',
  required_without: ':fieldが空欄なら:attributeは必須です。',
  required_without_all: ':fieldsが空欄なら:attributeは必須です。',
  same: ':attributeと:sameは同じでなければなりません。',
  size: {
    numeric: ':attributeは:sizeを入力してください。',
    string: ':attributeは:size文字で入力してください。'
  },
  string: ':attributeは文字のみで入力してください。',
  url: ':attributeは正しいURIを入力してください。',
  regex: ':attributeの値はパターンにマッチする必要があります。',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/ka.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/ka.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute უნდა იყოს მონიშნული.',
  active_url: ':attribute უნდა იყოს URL მისამართი.',
  after: ':attribute უნდა იყოს :date-ის შემდეგ.',
  after_or_equal: ':attribute უნდა იყოს :date-ის შემდეგ ან მისი ტოლი.',
  alpha: ':attribute უნდა შეიცავდეს მხოლოდ ასოებს.',
  alpha_dash: ':attribute უნდა შეიცავდეს მხოლოდ ასოებს, რიცხვებს და ტირეებს.',
  alpha_num: ':attribute უნდა შეიცავდეს მხოლოდ ასოებს და რიცხვებს.',
  attributes: {},
  array: ':attribute უნდა იყოს მასივი.',
  before: ':attribute უნდა იყოს :date-მდე.',
  before_or_equal: ':attribute უნდა იყოს :date-მდე ან მისი ტოლი.',
  between: {
    numeric: ':attribute უნდა იყოს :min-სა და :max-ს შორის.',
    file: ':attribute უნდა იყოს :min-სა და :max კილობაიტს შორის.',
    string: ':attribute უნდა იყოს :min-სა და :max სიმბოლოს შორის.',
    array: ':attribute-ის რაოდენობა უნდა იყოს :min-დან :max-მდე.'
  },
  boolean: ':attribute უნდა იყოს true, false, 0 ან 1.',
  confirmed: ':attribute არ ემთხვევა დადასტურებას.',
  date: ':attribute შეიცავს თარიღის არასწორ ფორმატს.',
  date_format: ':attribute არ ემთხვევა თარიღის ფორმატს: :format.',
  different: ':attribute და :other არ უნდა ემთხვეოდეს ერთმანეთს.',
  digits: ':attribute უნდა შედგებოდეს :digits ციფრისგან.',
  digits_between: ':attribute უნდა შედგებოდეს :min-დან :max ციფრამბდე.',
  dimensions: ':attribute შეიცავს სურათის არასწორ ზომებს.',
  distinct: ':attribute უნდა იყოს უნიკალური.',
  email: ':attribute უნდა იყოს სწორი ელ.ფოსტა.',
  exists: 'ასეთი :attribute არ არსებობს.',
  file: ':attribute უნდა იყოს ფაილი.',
  filled: ':attribute აუცილებელია.',
  gt: {
    numeric: ':attribute უნდა იყოს :value-ზე მეტი.',
    file: ':attribute უნდა იყოს :value კილობაიტზე მეტი.',
    string: ':attribute უნდა შეიცავდეს :value სიმბოლოზე მეტს.',
    array: ':attribute უნდა შეიცავლდეს :value ელემენტზე მეტს.'
  },
  gte: {
    numeric: ':attribute უნდა იყოს მინიმუმ :value.',
    file: ':attribute უნდა იყოს მინიმუმ :value კილობაიტი.',
    string: ':attribute უნდა შეიცავდეს მინიმუმ :value სიმბოლოს.',
    array: ':attribute უნდა შეიცავდეს მინიმუმ :value ელემენტს.'
  },
  image: ':attribute უნდა იყოს სურათი.',
  in: 'მითითებული :attribute არასწორია.',
  in_array: ':attribute უნდა არსებობდეს :other-ში.',
  integer: ':attribute უნდა იყოს მთელი რიცხვი.',
  ip: ':attribute უნდა იყოს IP მისამართი.',
  ipv4: ':attribute უნდა იყოს IPv4 მისამართი.',
  ipv6: ':attribute უნდა იყოს IPv6 მისამართი.',
  json: ':attribute უნდა იყოს JSON ტიპის.',
  lt: {
    numeric: ':attribute უნდა იყოს :value-ზე ნაკლები.',
    file: ':attribute უნდა იყოს :value კილობაიტზე ნაკლები.',
    string: ':attribute უნდა შეიცავდეს :value სიმბოლოზე ნაკლებს.',
    array: ':attribute უნდა შეიცავლდეს :value ელემენტზე ნაკლებს.'
  },
  lte: {
    numeric: ':attribute უნდა იყოს მაქსიმუმ :value.',
    file: ':attribute უნდა იყოს მაქსიმუმ :value კილობაიტი.',
    string: ':attribute უნდა შეიცავდეს მაქსიმუმ :value სიმბოლოს.',
    array: ':attribute უნდა შეიცავდეს მაქსიმუმ :value ელემენტს.'
  },
  max: {
    numeric: ':attribute არ უნდა აღემატებოდეს :max-ს.',
    file: ':attribute არ უნდა აღემატებოდეს :max კილობაიტს.',
    string: ':attribute არ უნდა აღემატებოდეს :max სიმბოლოს.',
    array: ':attribute-ის რაოდენობა არ უნდა აღემატებოდეს :max-ს.'
  },
  mimes: ':attribute უნდა იყოს შემდეგი ტიპის: :values.',
  mimetypes: ':attribute უნდა იყოს შემდეგი ტიპის: :values.',
  min: {
    numeric: ':attribute უნდა იყოს მინიმუმ :min.',
    file: ':attribute უნდა იყოს მინიმუმ :min კილობაიტი.',
    string: ':attribute უნდა შეიცავდეს მინიმუმ :min სიმბოლოს.',
    array: ':attribute უნდა იყოს მინიმუმ :min.'
  },
  not_in: 'მითითებული :attribute არასწორია.',
  not_regex: ':attribute არასწორ ფორმატშია.',
  numeric: ':attribute უნდა იყოს რიცხვი.',
  present: ':attribute უნდა არსებობდეს, თუნდაც ცარიელი.',
  regex: ':attribute არ ემთხვევა ფორმატს.',
  required: ':attribute აუცილებელია.',
  required_if: ':attribute აუცილებელია, თუ :other-ის მნიშვნელობა ემთხვევა :value-ს.',
  required_unless: ':attribute აუცილებელია, თუ :values არ შეიცავს :other-ს.',
  required_with: ':attribute აუცილებელია, თუ :values მითითებულია.',
  required_with_all: ':attribute აუცილებელია, თუ :values მითითებულია.',
  required_without: ':attribute აუცილებელია, თუ :values არ არის მითითებული.',
  required_without_all: ':attribute აუცილებელია, თუ :values არ არის მითითებული.',
  same: ':attribute და :other უნდა ემთხვეოდეს ერთმანეთს.',
  size: {
    numeric: ':attribute უნდა იყოს :size-ის ტოლი.',
    file: ':attribute უნდა იყოს :size კილობაიტი.',
    string: ':attribute უნდა შედგებოდეს :size სიმბოლოსგან.',
    array: ':attribute უნდა შეიცავდეს :size ელემენტს.'
  },
  string: ':attribute უნდა იყოს ტექსტი.',
  timezone: ':attribute უნდა იყოს სასაათო სარტყელი.',
  unique: 'ასეთი :attribute უკვე არსებობს.',
  uploaded: ':attribute-ის ატვირთვა ვერ მოხერხდა.',
  url: ':attribute უნდა იყოს URL მისამართი.'
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/ko.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/ko.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute을(를) 동의해야 합니다.',
  active_url: ':attribute은(는) 유효한 URL이 아닙니다.',
  after: ':attribute은(는) :date 이후 날짜여야 합니다.',
  after_or_equal: ':attribute은(는) :date 이후 날짜이거나 같은 날짜여야 합니다.',
  alpha: ':attribute은(는) 문자만 포함할 수 있습니다.',
  alpha_dash: ':attribute은(는) 문자, 숫자, 대쉬(-)만 포함할 수 있습니다.',
  alpha_num: ':attribute은(는) 문자와 숫자만 포함할 수 있습니다.',
  attributes: {},
  array: ':attribute은(는) 배열이어야 합니다.',
  before: ':attribute은(는) :date 이전 날짜여야 합니다.',
  before_or_equal: ':attribute은(는) :date 이전 날짜이거나 같은 날짜여야 합니다.',
  between: {
    numeric: ':attribute은(는) :min에서 :max 사이여야 합니다.',
    file: ':attribute은(는) :min에서 :max 킬로바이트 사이여야 합니다.',
    string: ':attribute은(는) :min에서 :max 문자 사이여야 합니다.',
    array: ':attribute은(는) :min에서 :max 개의 항목이 있어야 합니다.'
  },
  boolean: ':attribute은(는) true 또는 false 이어야 합니다.',
  confirmed: ':attribute 확인 항목이 일치하지 않습니다.',
  date: ':attribute은(는) 유효한 날짜가 아닙니다.',
  date_format: ':attribute이(가) :format 형식과 일치하지 않습니다.',
  different: ':attribute와(과) :other은(는) 서로 달라야 합니다.',
  digits: ':attribute은(는) :digits 자리 숫자여야 합니다.',
  digits_between: ':attribute)은(는) :min에서 :max 자리 사이여야 합니다.',
  dimensions: ':attribute은(는) 유효하지 않는 이미지 크기입니다.',
  distinct: ':attribute 필드에 중복된 값이 있습니다.',
  email: ':attribute은(는) 유효한 이메일 주소여야 합니다.',
  exists: '선택된 :attribute은(는) 유효하지 않습니다.',
  file: ':attribute은(는) 파일이어야 합니다.',
  filled: ':attribute 필드는 값이 있어야 합니다.',
  gt: {
    numeric: ':attribute의 값은 :value보다 커야 합니다.',
    file: ':attribute의 용량은 :value킬로바이트보다 커야 합니다.',
    string: ':attribute의 길이는 :value보다 길어야 합니다.',
    array: ':attribute의 항목수는 :value개 보다 많아야 합니다.'
  },
  gte: {
    numeric: ':attribute의 값은 :value보다 같거나 커야 합니다.',
    file: ':attribute의 용량은 :value킬로바이트보다 같거나 커야 합니다.',
    string: ':attribute의 길이는 :value보다 같거나 길어야 합니다.',
    array: ':attribute의 항목수는 :value개 보다 같거나 많아야 합니다.'
  },
  image: ':attribute은(는) 이미지여야 합니다.',
  in: '선택된 :attribute은(는) 유효하지 않습니다.',
  in_array: ':attribute 필드는 :other에 존재하지 않습니다.',
  integer: ':attribute은(는) 정수여야 합니다.',
  ip: ':attribute은(는) 유효한 IP 주소여야 합니다.',
  ipv4: ':attribute은(는) 유효한 IPv4 주소여야 합니다.',
  ipv6: ':attribute은(는) 유효한 IPv6 주소여야 합니다.',
  json: ':attribute은(는) JSON 문자열이어야 합니다.',
  lt: {
    numeric: ':attribute의 값은 :value보다 작아야 합니다.',
    file: ':attribute의 용량은 :value킬로바이트보다 작아야 합니다.',
    string: ':attribute의 길이는 :value보다 짧아야 합니다.',
    array: ':attribute의 항목수는 :value개 보다 작아야 합니다.'
  },
  lte: {
    numeric: ':attribute의 값은 :value보다 같거나 작아야 합니다.',
    file: ':attribute의 용량은 :value킬로바이트보다 같거나 작아야 합니다.',
    string: ':attribute의 길이는 :value보다 같거나 짧아야 합니다.',
    array: ':attribute의 항목수는 :value개 보다 같거나 작아야 합니다.'
  },
  max: {
    numeric: ':attribute은(는) :max보다 클 수 없습니다.',
    file: ':attribute은(는) :max킬로바이트보다 클 수 없습니다.',
    string: ':attribute은(는) :max자보다 클 수 없습니다.',
    array: ':attribute은(는) :max개보다 많을 수 없습니다.'
  },
  mimes: ':attribute은(는) 다음의 파일 형식이어야 합니다: :values.',
  mimetypes: ':attribute은(는) 다음의 파일 형식이어야 합니다: :values.',
  min: {
    numeric: ':attribute은(는) 최소한 :min이어야 합니다.',
    file: ':attribute은(는) 최소한 :min킬로바이트이어야 합니다.',
    string: ':attribute은(는) 최소한 :min자이어야 합니다.',
    array: ':attribute은(는) 최소한 :min개의 항목이 있어야 합니다.'
  },
  not_in: '선택된 :attribute이(가) 유효하지 않습니다.',
  not_regex: ':attribute의 형식이 올바르지 않습니다.',
  numeric: ':attribute은(는) 숫자여야 합니다.',
  present: ':attribute 필드가 있어야 합니다.',
  regex: ':attribute 형식이 유효하지 않습니다.',
  required: ':attribute 필드는 필수입니다.',
  required_if: ':other이(가) :value 일 때 :attribute 필드는 필수입니다.',
  required_unless: ':other이(가) :value에 없다면 :attribute 필드는 필수입니다.',
  required_with: ':values이(가) 있는 경우 :attribute 필드는 필수입니다.',
  required_with_all: ':values이(가) 모두 있는 경우 :attribute 필드는 필수입니다.',
  required_without: ':values이(가) 없는 경우 :attribute 필드는 필수입니다.',
  required_without_all: ':values이(가) 모두 없는 경우 :attribute 필드는 필수입니다.',
  same: ':attribute와(과) :other은(는) 일치해야 합니다.',
  size: {
    numeric: ':attribute은(는) :size (이)여야 합니다.',
    file: ':attribute은(는) :size킬로바이트여야 합니다.',
    string: ':attribute은(는) :size자여야 합니다.',
    array: ':attribute은(는) :size개의 항목을 포함해야 합니다.'
  },
  string: ':attribute은(는) 문자열이어야 합니다.',
  timezone: ':attribute은(는) 올바른 시간대 이어야 합니다.',
  unique: ':attribute은(는) 이미 사용 중입니다.',
  uploaded: ':attribute을(를) 업로드하지 못했습니다.',
  url: ':attribute 형식은 유효하지 않습니다.'
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/lt.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/lt.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Laukas :attribute turi būti priimtas.',
  active_url: 'Laukas :attribute nėra galiojantis internetinis adresas.',
  after: 'Lauko :attribute reikšmė turi būti po :date datos.',
  after_or_equal: 'The :attribute must be a date after or equal to :date.',
  alpha: 'Laukas :attribute gali turėti tik raides.',
  alpha_dash: 'Laukas :attribute gali turėti tik raides, skaičius ir brūkšnelius.',
  alpha_num: 'Laukas :attribute gali turėti tik raides ir skaičius.',
  attributes: {},
  array: 'Laukas :attribute turi būti masyvas.',
  before: 'Laukas :attribute turi būti data prieš :date.',
  before_or_equal: 'The :attribute must be a date before or equal to :date.',
  between: {
    numeric: 'Lauko :attribute reikšmė turi būti tarp :min ir :max.',
    file: 'Failo dydis lauke :attribute turi būti tarp :min ir :max kilobaitų.',
    string: 'Simbolių skaičius lauke :attribute turi būti tarp :min ir :max.',
    array: 'Elementų skaičius lauke :attribute turi turėti nuo :min iki :max.'
  },
  boolean: 'Lauko reikšmė :attribute turi būti \'taip\' arba \'ne\'.',
  confirmed: 'Lauko :attribute patvirtinimas nesutampa.',
  date: 'Lauko :attribute reikšmė nėra galiojanti data.',
  date_format: 'Lauko :attribute reikšmė neatitinka formato :format.',
  different: 'Laukų :attribute ir :other reikšmės turi skirtis.',
  digits: 'Laukas :attribute turi būti sudarytas iš :digits skaitmenų.',
  digits_between: 'Laukas :attribute tuti turėti nuo :min iki :max skaitmenų.',
  dimensions: 'Lauke :attribute įkeltas paveiksliukas neatitinka išmatavimų reikalavimo.',
  distinct: 'Laukas :attribute pasikartoja.',
  email: 'Lauko :attribute reikšmė turi būti galiojantis el. pašto adresas.',
  file: 'The :attribute must be a file.',
  filled: 'Laukas :attribute turi būti užpildytas.',
  exists: 'Pasirinkta negaliojanti :attribute reikšmė.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.'
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.'
  },
  image: 'Lauko :attribute reikšmė turi būti paveikslėlis.',
  in: 'Pasirinkta negaliojanti :attribute reikšmė.',
  in_array: 'Laukas :attribute neegzistuoja :other lauke.',
  integer: 'Lauko :attribute reikšmė turi būti sveikasis skaičius.',
  ip: 'Lauko :attribute reikšmė turi būti galiojantis IP adresas.',
  ipv4: 'The :attribute must be a valid IPv4 address.',
  ipv6: 'The :attribute must be a valid IPv6 address.',
  json: 'Lauko :attribute reikšmė turi būti JSON tekstas.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.'
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.'
  },
  max: {
    numeric: 'Lauko :attribute reikšmė negali būti didesnė nei :max.',
    file: 'Failo dydis lauke :attribute reikšmė negali būti didesnė nei :max kilobaitų.',
    string: 'Simbolių kiekis lauke :attribute reikšmė negali būti didesnė nei :max simbolių.',
    array: 'Elementų kiekis lauke :attribute negali turėti daugiau nei :max elementų.'
  },
  mimes: 'Lauko reikšmė :attribute turi būti failas vieno iš sekančių tipų: :values.',
  mimetypes: 'Lauko reikšmė :attribute turi būti failas vieno iš sekančių tipų: :values.',
  min: {
    numeric: 'Lauko :attribute reikšmė turi būti ne mažesnė nei :min.',
    file: 'Failo dydis lauke :attribute turi būti ne mažesnis nei :min kilobaitų.',
    string: 'Simbolių kiekis lauke :attribute turi būti ne mažiau nei :min.',
    array: 'Elementų kiekis lauke :attribute turi būti ne mažiau nei :min.'
  },
  not_in: 'Pasirinkta negaliojanti reikšmė :attribute.',
  not_regex: 'The :attribute format is invalid.',
  numeric: 'Lauko :attribute reikšmė turi būti skaičius.',
  present: 'Laukas :attribute turi egzistuoti.',
  regex: 'Negaliojantis lauko :attribute formatas.',
  required: 'Privaloma užpildyti lauką :attribute.',
  required_if: 'Privaloma užpildyti lauką :attribute kai :other yra :value.',
  required_unless: 'Laukas :attribute yra privalomas, nebent :other yra tarp :values reikšmių.',
  required_with: 'Privaloma užpildyti lauką :attribute kai pateikta :values.',
  required_with_all: 'Privaloma užpildyti lauką :attribute kai pateikta :values.',
  required_without: 'Privaloma užpildyti lauką :attribute kai nepateikta :values.',
  required_without_all: 'Privaloma užpildyti lauką :attribute kai nepateikta nei viena iš reikšmių :values.',
  same: 'Laukai :attribute ir :other turi sutapti.',
  size: {
    numeric: 'Lauko :attribute reikšmė turi būti :size.',
    file: 'Failo dydis lauke :attribute turi būti :size kilobaitai.',
    string: 'Simbolių skaičius lauke :attribute turi būti :size.',
    array: 'Elementų kiekis lauke :attribute turi būti :size.'
  },
  string: 'Laukas :attribute turi būti tekstinis.',
  timezone: 'Lauko :attribute reikšmė turi būti galiojanti laiko zona.',
  unique: 'Tokia :attribute reikšmė jau pasirinkta.',
  uploaded: 'The :attribute failed to upload.',
  url: 'Negaliojantis lauko :attribute formatas.'
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/lv.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/lv.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ' :attribute ir jābūt pieņemtam.',
  active_url: ' :attribute ir ar nederīgu linku.',
  after: ' :attribute ir jābūt ar datumu pēc :datums.',
  after_or_equal: ' :attribute ir jābūt ar datumu pēc vai vienādu ar :datums.',
  alpha: ' :attribute var saturēt tikai burtus.',
  alpha_dash: ' :attribute var saturēt tikai burtus, nummurus un atstarpes.',
  alpha_num: ' :attribute var tikai saturēt burtus un nummurus.',
  attributes: {},
  array: ' :attribute ir jābūt sakārtotam.',
  before: ' :attribute ir jābūt ar datumu pirms :datums.',
  before_or_equal: ' :attribute ir jābūt ar datumu pirms vai vienādu ar :datums.',
  between: {
    numeric: ' :attribute jābūt starp :min un :max.',
    file: ' :attribute jābūt starp :min un :max kilobaiti.',
    string: ' :attribute jābūt no :min līdz :max zīmēm.',
    array: ' :attribute jābūt no :min līdz :max vienībām.'
  },
  boolean: ' :attribute laiciņam jābūt atbilstošam vai neatbilstošam.',
  confirmed: ' :attribute apstiprinājums neatbilst.',
  date: ' :attribute nav derīgs.',
  date_format: ' :attribute neatbilst formātam :format.',
  different: ' :attribute un :other ir jābūt citiem.',
  digits: ' :attribute ir jābūt :digits ciparam.',
  digits_between: ' :attribute ir jābūt :min un :max ciparam.',
  dimensions: ' :attribute ir nederīgs attēla izmērs.',
  distinct: ' :attribute laikam ir dubulta vērtība.',
  email: ' :attribute derīgam e-pastam.',
  exists: 'Izvēlētais :attribute ir nederīgs.',
  file: ' :attribute jābūt failam.',
  filled: ':attribute lauks ir nepieciešams.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.'
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.'
  },
  image: ' :attribute jābūt attēlam.',
  in: 'Izvēlētais :attribute ir nederīgs.',
  in_array: ' :attribute laiks neeksistē :cits.',
  integer: ' :attribute ir jabūt skaitim.',
  ip: ' :attribute jābūt derīgai IP adresei.',
  ipv4: 'The :attribute must be a valid IPv4 address.',
  ipv6: 'The :attribute must be a valid IPv6 address.',
  json: ' :attribute jābūt derīgai JSON virknei.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.'
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.'
  },
  max: {
    numeric: ' :attribute nedrīkst pārsniegt :max.',
    file: ' :attribute nedrīkst pārsniegt :max kilobaiti.',
    string: ' :attribute nedrīkst pārsniegt :max zīmes.',
    array: ' :attribute nedrīkst pārsniegt :max vienības.'
  },
  mimes: ' :attribute jābūt faila tipam: :values',
  mimetypes: ' :attribute jābūt faile tipam: :values.',
  min: {
    numeric: ' :attribute jābūt vismaz :min.',
    file: ' :attribute jābūt vismaz :min kilobaiti.',
    string: ' :attribute jābūt vismaz :min zīmes.',
    array: ' :attribute jāsatur vismaz :min vienības.'
  },
  not_in: ' izvēlieties :attribute ir nederīgs.',
  not_regex: 'The :attribute format is invalid.',
  numeric: ' :attribute jābūt skaitlim.',
  present: ' :attribute laikums ir nepieciešams.',
  regex: ' :attribute formāts ir nederīgs.',
  required: ' :attribute laukums ir nepieciešams.',
  required_if: ' :attribute laukums ir nepieciešams, ja vien :other ir :values.',
  required_unless: ' :attribute laukums ir nepieciešams, ja vien :other ir :values.',
  required_with: ' :attribute laukums ir nepieciešams, kad :values ir pieejama.',
  required_with_all: ' :attribute laukums ir nepieciešams, kad :values ir pieejama.',
  required_without: ' :attribute laukums ir nepieciešams, kad :values nav pieejama.',
  required_without_all: ' :attribute laukums ir nepieciešams, kad neviena no :values nav pieejama.',
  same: ' :attribute un :citiem ir jāsakrīt.',
  size: {
    numeric: ' :attribute jābūt :size.',
    file: ' :attribute jābūt :size kilobaiti.',
    string: ' :attribute jābūt :size zīmes.',
    array: ' :attribute jāsatur :size vienības.'
  },
  string: ' :attribute jābūt virknē.',
  timezone: ' :attribute jābūt derīgā zonā.',
  unique: ' :attribute jau ir aizņemts.',
  uploaded: ' :attribute netika augšuplādēts.',
  url: ' :attribute formāts ir nederīgs.'
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/mk.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/mk.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Полето :attribute мора да биде прифатено.',
  active_url: 'Полето :attribute не е валиден URL.',
  after: 'Полето :attribute мора да биде датум после :date.',
  after_or_equal: 'The :attribute must be a date after or equal to :date.',
  alpha: 'Полето :attribute може да содржи само букви.',
  alpha_dash: 'Полето :attribute може да содржи само букви, цифри, долна црта и тире.',
  alpha_num: 'Полето :attribute може да содржи само букви и цифри.',
  attributes: {},
  array: 'Полето :attribute мора да биде низа.',
  before: 'Полето :attribute мора да биде датум пред :date.',
  before_or_equal: 'The :attribute must be a date before or equal to :date.',
  between: {
    numeric: 'Полето :attribute мора да биде помеѓу :min и :max.',
    file: 'Полето :attribute мора да биде помеѓу :min и :max килобајти.',
    string: 'Полето :attribute мора да биде помеѓу :min и :max карактери.',
    array: 'Полето :attribute мора да има помеѓу :min - :max карактери.'
  },
  boolean: 'The :attribute field must be true or false',
  confirmed: 'Полето :attribute не е потврдено.',
  date: 'Полето :attribute не е валиден датум.',
  date_format: 'Полето :attribute не е во формат :format.',
  different: 'Полињата :attribute и :other треба да се различни.',
  digits: 'Полето :attribute треба да има :digits цифри.',
  digits_between: 'Полето :attribute треба да има помеѓу :min и :max цифри.',
  dimensions: 'The :attribute has invalid image dimensions.',
  distinct: 'The :attribute field has a duplicate value.',
  email: 'Полето :attribute не е во валиден формат.',
  exists: 'Избранато поле :attribute веќе постои.',
  file: 'The :attribute must be a file.',
  filled: 'Полето :attribute е задолжително.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.'
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.'
  },
  image: 'Полето :attribute мора да биде слика.',
  in: 'Избраното поле :attribute е невалидно.',
  in_array: 'The :attribute field does not exist in :other.',
  integer: 'Полето :attribute мора да биде цел број.',
  ip: 'Полето :attribute мора да биде IP адреса.',
  ipv4: 'The :attribute must be a valid IPv4 address.',
  ipv6: 'The :attribute must be a valid IPv6 address.',
  json: 'The :attribute must be a valid JSON string.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.'
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.'
  },
  max: {
    numeric: 'Полето :attribute мора да биде помало од :max.',
    file: 'Полето :attribute мора да биде помало од :max килобајти.',
    string: 'Полето :attribute мора да има помалку од :max карактери.',
    array: 'Полето :attribute не може да има повеќе од :max карактери.'
  },
  mimes: 'Полето :attribute мора да биде фајл од типот: :values.',
  mimetypes: 'Полето :attribute мора да биде фајл од типот: :values.',
  min: {
    numeric: 'Полето :attribute мора да биде минимум :min.',
    file: 'Полето :attribute мора да биде минимум :min килобајти.',
    string: 'Полето :attribute мора да има минимум :min карактери.',
    array: 'Полето :attribute мора да има минимум :min карактери.'
  },
  not_in: 'Избраното поле :attribute е невалидно.',
  not_regex: 'The :attribute format is invalid.',
  numeric: 'Полето :attribute мора да биде број.',
  present: 'The :attribute field must be present.',
  regex: 'Полето :attribute е во невалиден формат.',
  required: 'Полето :attribute е задолжително.',
  required_if: 'Полето :attribute е задолжително, кога :other е :value.',
  required_unless: 'The :attribute field is required unless :other is in :values.',
  required_with: 'Полето :attribute е задолжително, кога е внесено :values.',
  required_with_all: 'The :attribute field is required when :values is present.',
  required_without: 'Полето :attribute е задолжително, кога не е внесено :values.',
  required_without_all: 'The :attribute field is required when none of :values are present.',
  same: 'Полињата :attribute и :other треба да совпаѓаат.',
  size: {
    numeric: 'Полето :attribute мора да биде :size.',
    file: 'Полето :attribute мора да биде :size килобајти.',
    string: 'Полето :attribute мора да има :size карактери.',
    array: 'Полето :attribute мора да има :size карактери.'
  },
  string: 'The :attribute must be a string.',
  timezone: 'The :attribute must be a valid zone.',
  unique: 'Полето :attribute веќе постои.',
  uploaded: 'The :attribute failed to upload.',
  url: 'Полето :attribute не е во валиден формат.'
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/mn.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/mn.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':Attribute баталсан байх шаардлагатай.',
  active_url: ':Attribute талбарт зөв URL хаяг оруулна уу.',
  after: ':Attribute талбарт :date-с хойш огноо оруулна уу.',
  after_or_equal: ':Attribute талбарт :date эсвэл түүнээс хойш огноо оруулна уу.',
  alpha: ':Attribute талбарт латин үсэг оруулна уу.',
  alpha_dash: ':Attribute талбарт латин үсэг, тоо болон зураас оруулах боломжтой.',
  alpha_num: ':Attribute талбарт латин үсэг болон тоо оруулах боломжтой.',
  attributes: {},
  array: ':Attribute талбар массив байх шаардлагатай.',
  before: ':Attribute талбарт :date-с өмнөх огноо оруулна уу.',
  before_or_equal: ':attribute талбарт :date эсвэл түүнээс өмнөх огноо оруулна уу.',
  between: {
    numeric: ':Attribute талбарт :min-:max хооронд тоо оруулна уу.',
    file: ':Attribute талбарт :min-:max килобайт хэмжээтэй файл оруулна уу.',
    string: ':Attribute талбарт :min-:max урттай текст оруулна уу.',
    array: ':Attribute массивт :min-:max элемэнт байх шаардлагатай.'
  },
  boolean: ':Attribute талбарын утга үнэн эсвэл худал байх шаардлагатай.',
  confirmed: ':Attribute талбарын баталагажуулалт тохирохгүй байна.',
  date: ':Attribute талбарт оруулсан огноо буруу байна.',
  date_format: ':Attribute талбарт :format хэлбэртэй огноо оруулна уу.',
  different: ':Attribute талбарт :other -с өөр утга оруулах шаардлагатай.',
  digits: ':Attribute талбарт дараах цифрүүдээс оруулах боломжтой. :digits.',
  digits_between: ':Attribute талбарт :min-:max хоорондох цифр оруулах боломжтой.',
  dimensions: ':Attribute талбарийн зургийн хэмжээс буруу байна.',
  distinct: ':Attribute талбарт ялгаатай утга оруулах шаардлагатай.',
  email: ':Attribute талбарт зөв и-мэйл хаяг оруулах шаардлагатай.',
  exists: 'Сонгогдсон :attribute буруу байна.',
  file: ':Attribute талбарт файл оруулах шаардлагатай.',
  filled: ':Attribute талбар шаардлагатай.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.'
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.'
  },
  image: ':Attribute талбарт зураг оруулна уу.',
  in: 'Сонгогдсон :attribute буруу байна.',
  in_array: ':Attribute талбарт оруулсан утга :other -д байхгүй байна.',
  integer: ':Attribute талбарт бүхэл тоо оруулах шаардлагатай.',
  ip: ':Attribute талбарт зөв IP хаяг оруулах шаардлагатай.',
  ipv4: 'The :attribute must be a valid IPv4 address.',
  ipv6: 'The :attribute must be a valid IPv6 address.',
  json: ':Attribute талбарт зөв JSON тэмдэгт мөр оруулах шаардлагатай.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.'
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.'
  },
  max: {
    numeric: ':Attribute талбарт :max буюу түүнээс бага утга оруулна уу.',
    file: ':Attribute талбарт :max килобайтаас бага хэмжээтэй файл оруулна уу.',
    string: ':Attribute талбарт :max-с бага урттай текст оруулна уу.',
    array: ':Attribute талбарт хамгийн ихдээ :max элемэнт оруулах боломжтой.'
  },
  mimes: ':Attribute талбарт дараах төрлийн файл оруулах боломжтой: :values.',
  mimetypes: ':Attribute талбарт дараах төрлийн файл оруулах боломжтой: :values.',
  min: {
    numeric: ':Attribute талбарт :min буюу түүнээс их тоо оруулна уу.',
    file: ':Attribute талбарт :min килобайтаас их хэмжээтэй файл оруулна уу.',
    string: ':Attribute талбарт :min буюу түүнээс их үсэг бүхий текст оруулна уу.',
    array: ':Attribute талбарт хамгийн багадаа :min элемэнт оруулах боломжтой.'
  },
  not_in: 'Буруу :attribute сонгогдсон байна.',
  not_regex: 'The :attribute format is invalid.',
  numeric: ':Attribute талбарт тоон утга оруулна уу.',
  present: ':Attribute талбар байх шаардлагатай.',
  regex: ':Attribute талбарт оруулсан утга буруу байна.',
  required: ':Attribute талбар шаардлагатай.',
  required_if: 'Хэрэв :other :value бол :attribute табларт утга оруулах шаардлагатай.',
  required_unless: ':other :values дотор байхгүй бол :attribute талбарт утга оруулах шаардлагатай.',
  required_with: ':values утгуудийн аль нэг байвал :attribute талбар шаардлагатай.',
  required_with_all: ':values утгууд байвал :attribute талбар шаардлагатай.',
  required_without: 'The :attribute field is required when :values is not present.',
  required_without_all: 'The :attribute field is required when none of :values are present.',
  same: 'The :attribute and :other must match.',
  size: {
    numeric: ':Attribute :size хэмжээтэй байх шаардлагатай.',
    file: ':Attribute :size килобайт хэмжээтэй байх шаардлагатай.',
    string: ':Attribute :size тэмдэгтийн урттай байх шаардлагатай.',
    array: ':Attribute :size элемэнттэй байх шаардлагатай.'
  },
  string: ':Attribute талбарт текст оруулна уу.',
  timezone: ':Attribute талбарт зөв цагийн бүс оруулна уу.',
  unique: 'Оруулсан :attribute аль хэдий нь бүртгэгдсэн байна.',
  uploaded: ':Attribute талбарт оруулсан файлыг хуулхад алдаа гарлаа.',
  url: ':Attribute зөв url хаяг оруулна уу.'
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/ms.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/ms.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute mesti diterima pakai.',
  active_url: ':attribute bukan URL yang sah.',
  after: ':attribute mesti tarikh selepas :date.',
  after_or_equal: ':attribute mesti tarikh selepas atau sama dengan :date.',
  alpha: ':attribute hanya boleh mengandungi huruf.',
  alpha_dash: ':attribute boleh mengandungi huruf, nombor, dan sengkang.',
  alpha_num: ':attribute boleh mengandungi huruf dan nombor.',
  attributes: {},
  array: ':attribute mesti jujukan.',
  before: ':attribute mesti tarikh sebelum :date.',
  before_or_equal: ':attribute mesti tarikh sebelum atau sama dengan :date.',
  between: {
    numeric: ':attribute mesti mengandungi antara :min dan :max.',
    file: ':attribute mesti mengandungi antara :min dan :max kilobait.',
    string: ':attribute mesti mengandungi antara :min dan :max aksara.',
    array: ':attribute mesti mengandungi antara :min dan :max perkara.'
  },
  boolean: ':attribute mesti benar atau salah.',
  confirmed: ':attribute pengesahan yang tidak sepadan.',
  date: ':attribute bukan tarikh yang sah.',
  date_format: ':attribute tidak mengikut format :format.',
  different: ':attribute dan :other mesti berlainan.',
  dimensions: ':attribute tidak sah',
  digits: ':attribute mesti :digits.',
  digits_between: ':attribute mesti mengandungi antara :min dan :max digits.',
  distinct: ':attribute adalah nilai yang berulang',
  email: ':attribute tidak sah.',
  exists: ':attribute tidak sah.',
  file: ':attribute mesti fail yang sah.',
  filled: ':attribute diperlukan.',
  gt: {
    numeric: ':attribute mesti melebihi :value.',
    file: ':attribute mesti melebihi :value kilobait.',
    string: ':attribute mesti melebihi :value aksara.',
    array: ':attribute mesti mengandungi lebih daripada :value perkara.'
  },
  gte: {
    numeric: ':attribute mesti melebihi atau bersamaan :value.',
    file: ':attribute mesti melebihi atau bersamaan :value kilobait.',
    string: ':attribute mesti melebihi atau bersamaan :value aksara.',
    array: ':attribute mesti mengandungi :value perkara atau lebih.'
  },
  image: ':attribute mesti imej.',
  in: ':attribute tidak sah.',
  in_array: ':attribute tidak wujud dalam :other.',
  integer: ':attribute mesti integer.',
  ip: ':attribute mesti alamat IP yang sah.',
  ipv4: ':attribute mesti alamat IPv4 yang sah.',
  ipv6: ':attribute mesti alamat IPv6 yang sah',
  json: ':attribute mesti JSON yang sah.',
  lt: {
    numeric: ':attribute mesti kurang daripada :value.',
    file: ':attribute mesti kurang daripada :value kilobait.',
    string: ':attribute mesti kurang daripada :value aksara.',
    array: ':attribute mesti mengandungi kurang daripada :value perkara.'
  },
  lte: {
    numeric: ':attribute mesti kurang daripada atau bersamaan dengan :value.',
    file: ':attribute mesti kurang daripada atau bersamaan dengan :value kilobait.',
    string: ':attribute mesti kurang daripada atau bersamaan dengan :value aksara.',
    array: ':attribute mesti mengandungi kurang daripada atau bersamaan dengan :value perkara.'
  },
  max: {
    numeric: 'Jumlah :attribute mesti tidak melebihi :max.',
    file: 'Jumlah :attribute mesti tidak melebihi :max kilobait.',
    string: 'Jumlah :attribute mesti tidak melebihi :max aksara.',
    array: 'Jumlah :attribute mesti tidak melebihi :max perkara.'
  },
  mimes: ':attribute mesti fail type: :values.',
  mimetypes: ':attribute mesti fail type: :values.',
  min: {
    numeric: 'Jumlah :attribute mesti sekurang-kurangnya :min.',
    file: 'Jumlah :attribute mesti sekurang-kurangnya :min kilobait.',
    string: 'Jumlah :attribute mesti sekurang-kurangnya :min aksara.',
    array: 'Jumlah :attribute mesti sekurang-kurangnya :min perkara.'
  },
  not_in: ':attribute tidak sah.',
  not_regex: 'Format :attribute adalah tidak sah.',
  numeric: ':attribute mesti nombor.',
  present: ':attribute mesti wujud.',
  regex: 'Format :attribute tidak sah.',
  required: 'Ruangan :attribute diperlukan.',
  required_if: 'Ruangan :attribute diperlukan bila :other sama dengan :value.',
  required_unless: 'Ruangan :attribute diperlukan sekiranya :other ada dalam :values.',
  required_with: 'Ruangan :attribute diperlukan bila :values wujud.',
  required_with_all: 'Ruangan :attribute diperlukan bila :values wujud.',
  required_without: 'Ruangan :attribute diperlukan bila :values tidak wujud.',
  required_without_all: 'Ruangan :attribute diperlukan bila kesemua :values wujud.',
  same: 'Ruangan :attribute dan :other mesti sepadan.',
  size: {
    numeric: 'Saiz :attribute mesti :size.',
    file: 'Saiz :attribute mesti :size kilobait.',
    string: 'Saiz :attribute mesti :size aksara.',
    array: 'Saiz :attribute mesti mengandungi :size perkara.'
  },
  string: ':attribute mesti aksara.',
  timezone: ':attribute mesti zon masa yang sah.',
  unique: ':attribute telah wujud.',
  uploaded: ':attribute gagal dimuat naik.',
  url: ':attribute format tidak sah.'
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/nb_NO.js":
/*!****************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/nb_NO.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute må være akseptert.',
  alpha: ':attribute feltet kan kun inneholde alfabetiske tegn.',
  alpha_dash: ':attribute feltet kan kun inneholde alfanumeriske tegn, i tillegg til bindestreker og understreker.',
  alpha_num: ':attribute feltet må være alfanumerisk.',
  between: ':attribute feltet må være mellom :min og :max.',
  confirmed: ':attribute feltet stemmer ikke overens med bekreftelsen.',
  email: ':attribute formatet er ugyldig.',
  date: ':attribute er et ugyldig datoformat.',
  def: ':attribute attributtet har feil.',
  digits: ':attribute må være på :digits siffer.',
  digits_between: ':attribute må være mellom :min og :max siffer.',
  different: ':attribute og :different må være forskjellige.',
  in: 'Den oppgitte verdien for :attribute er ugyldig.',
  integer: ':attribute må være et heltall.',
  hex: 'The :attribute should have hexadecimal format',
  min: {
    numeric: ':attribute må minst være :min.',
    string: ':attribute må være på minst :min tegn.'
  },
  max: {
    numeric: ':attribute kan ikke være større enn :max.',
    string: ':attribute kan maks ha :max tegn.'
  },
  not_in: 'Den oppgitte verdien for :attribute er ugyldig.',
  numeric: ':attribute må være et tall.',
  present: 'The :attribute field must be present (but can be empty).',
  required: ':attribute feltet er påkrevd.',
  required_if: ':attribute er påkrevd når :other er :value.',
  same: ':attribute og :same må være like.',
  size: {
    numeric: ':attribute må ha størrelsen :size.',
    string: ':attribute må ha :size tegn.'
  },
  string: ':attribute må være tekst.',
  url: ':attribute formatet er ugyldig.',
  regex: ':attribute formatet er ugyldig.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/nl.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/nl.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Het :attribute veld moet geaccepteerd worden.',
  after: ':attribute moet een datum na :after zijn.',
  after_or_equal: 'De :attribute datum moet op of na :after_or_equal zijn.',
  alpha: 'Het :attribute veld mag alleen maar letters bevatten.',
  alpha_dash: 'Het :attribute veld mag alleen maar letters, cijfers en (liggende) streepjes bevatten.',
  alpha_num: 'Het :attribute veld mag alleen maar letters en cijfers bevatten.',
  before: ':attribute moet vòòr :before zijn.',
  before_or_equal: ':attribute moet vòòr of op :before_or_equal zijn.',
  between: 'Het :attribute veld moet tussen :min en :max liggen.',
  confirmed: 'Het :attribute veld komt niet met de bevestiging overeen.',
  email: 'Het :attribute formaat is ongeldig.',
  date: 'Het :attribute veld moet een geldige datum zijn.',
  def: 'Het :attribute veld bevat fouten.',
  digits: 'Het :attribute veld moet :digits cijfers hebben.',
  digits_between: ':attribute moet bestaan uit minimaal :min en maximaal :max cijfers.',
  different: 'Het :attribute en :different veld moeten verschillend zijn.',
  in: 'De gekozen waarde voor :attribute is ongeldig.',
  integer: 'Het :attribute veld moet een geheel getal zijn.',
  hex: 'Het :attribute veld moet hexadecimaal zijn',
  min: {
    numeric: 'Het :attribute veld moet minstens :min zijn.',
    string: 'Het :attribute veld moet minstens :min karakters bevatten.'
  },
  max: {
    numeric: 'Het :attribute veld mag maximaal :max zijn.',
    string: 'Het :attribute veld mag niet meer dan :max karakters bevatten.'
  },
  not_in: 'De gekozen waarde voor :attribute is ongeldig.',
  numeric: 'Het :attribute veld moet een getal zijn.',
  present: 'Het :attribute veld moet aanwezig zijn (maar mag leeg zijn).',
  required: 'Het :attribute veld moet ingevuld zijn.',
  required_if: 'Het :attribute veld moet ingevuld zijn, wanneer :other :value is.',
  required_unless: 'Het :attribute veld moet ingevuld zijn, wanneer :other niet :value is.',
  required_with: 'Het :attribute veld moet ingevuld zijn, wanneer :field niet leeg is.',
  required_with_all: 'Het :attribute veld moet ingevuld zijn, wanneer :fields niet leeg zijn.',
  required_without: 'Het :attribute veld moet ingevuld zijn, wanneer :field leeg is.',
  required_without_all: 'Het :attribute veld moet ingevuld zijn, wanneer :fields leeg zijn.',
  same: 'De :attribute en :same velden moeten overeenkomen.',
  size: {
    numeric: 'Het :attribute veld moet :size zijn.',
    string: 'Het :attribute veld moet :size karakters bevatten.'
  },
  string: 'Het :attribute veld moet een woord of zin zijn.',
  url: 'Het :attribute veld heeft een ongeldig formaat.',
  regex: 'Het :attribute veld heeft een ongeldig formaat.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/pl.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/pl.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Pole :attribute musi być zaakceptowane.',
  alpha: 'Pole :attribute może zawierać tylko litery.',
  alpha_dash: 'Pole :attribute moze zawierać tylko litery, myślnik i podrkeślenie.',
  alpha_num: 'Pole :attribute moze zawierac tylko znaki alfanumeryczne.',
  between: 'Pole :attribute musi mieć długość od :min do :max.',
  confirmed: 'Pole :attribute nie spełnia warunku potwierdzenia.',
  email: 'Pole :attribute ma niepoprawny format adresu email.',
  date: 'Pole :attribute musi mieć poprawny format daty.',
  def: 'Pole :attribute zawiera błędy.',
  digits: 'Pole :attribute może zawierać tylko cyfry ze zbioru :digits.',
  digits_between: 'Pole :attribute musi mieć od :min do :max cyfr.',
  different: 'Pola :attribute i :different muszą się różnić.',
  in: 'Pole :attribute musi należeć do zbioru :in.',
  integer: 'Pole :attribute musi być liczbą całkowitą.',
  hex: 'The :attribute should have hexadecimal format',
  min: {
    numeric: 'Pole :attribute musi być równe conajmniej :min.',
    string: 'Pole :attribute musi zawierać conajmniej :min znaków.'
  },
  max: {
    numeric: 'Pole :attribute nie moze być większe :max.',
    string: 'Pole :attribute nie moze być dłuższe niż :max znaków.'
  },
  not_in: 'Pole :attribute nie może należeć do zbioru :not_in.',
  numeric: 'Pole :attribute musi być liczbą.',
  present: 'Polu :attribute musi być obecny (ale może być pusta).',
  required: 'Pole :attribute jest wymagane.',
  required_if: 'Pole :attribute jest wymagane jeśli pole :other jest równe :value.',
  same: 'Pola :attribute i :same muszą być takie same.',
  size: {
    numeric: 'Pole :attribute musi być równe :size.',
    string: 'Pole :attribute musi zawierać :size znaków.'
  },
  string: 'Pole :attribute musi być ciągiem znaków.',
  url: 'Pole :attribute musi być poprawnym adresem URL.',
  regex: 'Pole :attribute nie spełnia warunku.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/pt.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/pt.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'O campo :attribute deverá ser aceite.',
  active_url: 'O campo :attribute não contém um URL válido.',
  after: 'O campo :attribute deverá conter uma data posterior a :date.',
  after_or_equal: 'O campo :attribute deverá conter uma data posterior ou igual a :date.',
  alpha: 'O campo :attribute deverá conter apenas letras.',
  alpha_dash: 'O campo :attribute deverá conter apenas letras, números e traços.',
  alpha_num: 'O campo :attribute deverá conter apenas letras e números .',
  attributes: {},
  array: 'O campo :attribute deverá conter uma coleção de elementos.',
  before: 'O campo :attribute deverá conter uma data anterior a :date.',
  before_or_equal: 'O Campo :attribute deverá conter uma data anterior ou igual a :date.',
  between: {
    numeric: 'O campo :attribute deverá ter um valor entre :min - :max.',
    file: 'O campo :attribute deverá ter um tamanho entre :min - :max kilobytes.',
    string: 'O campo :attribute deverá conter entre :min - :max caracteres.',
    array: 'O campo :attribute deverá conter entre :min - :max elementos.'
  },
  boolean: 'O campo :attribute deverá conter o valor verdadeiro ou falso.',
  confirmed: 'A confirmação para o campo :attribute não coincide.',
  date: 'O campo :attribute não contém uma data válida.',
  date_format: 'A data indicada para o campo :attribute não respeita o formato :format.',
  different: 'Os campos :attribute e :other deverão conter valores diferentes.',
  digits: 'O campo :attribute deverá conter :digits caracteres.',
  digits_between: 'O campo :attribute deverá conter entre :min a :max caracteres.',
  dimensions: 'O campo :attribute deverá conter uma dimensão de imagem válida.',
  distinct: 'O campo :attribute contém um valor duplicado.',
  email: 'O campo :attribute não contém um endereço de correio eletrónico válido.',
  exists: 'O valor selecionado para o campo :attribute é inválido.',
  file: 'O campo :attribute deverá conter um ficheiro.',
  filled: 'É obrigatória a indicação de um valor para o campo :attribute.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.'
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.'
  },
  image: 'O campo :attribute deverá conter uma imagem.',
  in: 'O campo :attribute não contém um valor válido.',
  in_array: 'O campo :attribute não existe em :other.',
  integer: 'O campo :attribute deverá conter um número inteiro.',
  ip: 'O campo :attribute deverá conter um IP válido.',
  ipv4: 'O campo :attribute deverá conter um IPv4 válido.',
  ipv6: 'O campo :attribute deverá conter um IPv6 válido.',
  json: 'O campo :attribute deverá conter um texto JSON válido.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.'
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.'
  },
  max: {
    numeric: 'O campo :attribute não deverá conter um valor superior a :max.',
    file: 'O campo :attribute não deverá ter um tamanho superior a :max kilobytes.',
    string: 'O campo :attribute não deverá conter mais de :max caracteres.',
    array: 'O campo :attribute não deverá conter mais de :max elementos.'
  },
  mimes: 'O campo :attribute deverá conter um ficheiro do tipo: :values.',
  mimetypes: 'O campo :attribute deverá conter um ficheiro do tipo: :values.',
  min: {
    numeric: 'O campo :attribute deverá ter um valor superior ou igual a :min.',
    file: 'O campo :attribute deverá ter no mínimo :min kilobytes.',
    string: 'O campo :attribute deverá conter no mínimo :min caracteres.',
    array: 'O campo :attribute deverá conter no mínimo :min elementos.'
  },
  not_in: 'O campo :attribute contém um valor inválido.',
  not_regex: 'The :attribute format is invalid.',
  numeric: 'O campo :attribute deverá conter um valor numérico.',
  present: 'O campo :attribute deverá estar presente.',
  regex: 'O formato do valor para o campo :attribute é inválido.',
  required: 'É obrigatória a indicação de um valor para o campo :attribute.',
  required_if:
    'É obrigatória a indicação de um valor para o campo :attribute quando o valor do campo :other é igual a :value.',
  required_unless:
    'É obrigatória a indicação de um valor para o campo :attribute a menos que :other esteja presente em :values.',
  required_with: 'É obrigatória a indicação de um valor para o campo :attribute quando :values está presente.',
  required_with_all:
    'É obrigatória a indicação de um valor para o campo :attribute quando um dos :values está presente.',
  required_without: 'É obrigatória a indicação de um valor para o campo :attribute quando :values não está presente.',
  required_without_all:
    'É obrigatória a indicação de um valor para o campo :attribute quando nenhum dos :values está presente.',
  same: 'Os campos :attribute e :other deverão conter valores iguais.',
  size: {
    numeric: 'O campo :attribute deverá conter o valor :size.',
    file: 'O campo :attribute deverá ter o tamanho de :size kilobytes.',
    string: 'O campo :attribute deverá conter :size caracteres.',
    array: 'O campo :attribute deverá conter :size elementos.'
  },
  string: 'O campo :attribute deverá conter texto.',
  timezone: 'O campo :attribute deverá ter um fuso horário válido.',
  unique: 'O valor indicado para o campo :attribute já se encontra registado.',
  uploaded: 'O upload do ficheiro :attribute falhou.',
  url: 'O formato do URL indicado para o campo :attribute é inválido.'
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/pt_BR.js":
/*!****************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/pt_BR.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'O campo :attribute deve ser aceito.',
  active_url: 'O campo :attribute deve conter uma URL válida.',
  after: 'O campo :attribute deve conter uma data posterior a :date.',
  after_or_equal: 'O campo :attribute deve conter uma data superior ou igual a :date.',
  alpha: 'O campo :attribute deve conter apenas letras.',
  alpha_dash: 'O campo :attribute deve conter apenas letras, números e traços.',
  alpha_num: 'O campo :attribute deve conter apenas letras e números .',
  array: 'O campo :attribute deve conter um array.',
  before: 'O campo :attribute deve conter uma data anterior a :date.',
  before_or_equal: 'O campo :attribute deve conter uma data inferior ou igual a :date.',
  between: {
    numeric: 'O campo :attribute deve conter um número entre :min e :max.',
    file: 'O campo :attribute deve conter um arquivo de :min a :max kilobytes.',
    string: 'O campo :attribute deve conter entre :min a :max caracteres.',
    array: 'O campo :attribute deve conter de :min a :max itens.'
  },
  boolean: 'O campo :attribute deve conter o valor verdadeiro ou falso.',
  confirmed: 'A confirmação para o campo :attribute não coincide.',
  date: 'O campo :attribute não contém uma data válida.',
  date_format: 'A data informada para o campo :attribute não respeita o formato :format.',
  different: 'Os campos :attribute e :other devem conter valores diferentes.',
  digits: 'O campo :attribute deve conter :digits dígitos.',
  digits_between: 'O campo :attribute deve conter entre :min a :max dígitos.',
  dimensions: 'O valor informado para o campo :attribute não é uma dimensão de imagem válida.',
  distinct: 'O campo :attribute contém um valor duplicado.',
  email: 'O campo :attribute não contém um endereço de email válido.',
  exists: 'O valor selecionado para o campo :attribute é inválido.',
  file: 'O campo :attribute deve conter um arquivo.',
  filled: 'O campo :attribute é obrigatório.',
  gt: {
    numeric: 'O campo :attribute deve ser maior que :value.',
    file: 'O arquivo :attribute deve ser maior que :value kilobytes.',
    string: 'O campo :attribute deve ser maior que :value caracteres.',
    array: 'O campo :attribute deve ter mais que :value itens.'
  },
  gte: {
    numeric: 'O campo :attribute deve ser maior ou igual a :value.',
    file: 'O arquivo :attribute deve ser maior ou igual a :value kilobytes.',
    string: 'O campo :attribute deve ser maior ou igual a :value caracteres.',
    array: 'O campo :attribute deve ter :value itens ou mais.'
  },
  image: 'O campo :attribute deve conter uma imagem.',
  in: 'O campo :attribute não contém um valor válido.',
  in_array: 'O campo :attribute não existe em :other.',
  integer: 'O campo :attribute deve conter um número inteiro.',
  ip: 'O campo :attribute deve conter um IP válido.',
  ipv4: 'O campo :attribute deve conter um IPv4 válido.',
  ipv6: 'O campo :attribute deve conter um IPv6 válido.',
  json: 'O campo :attribute deve conter uma string JSON válida.',
  lt: {
    numeric: 'O campo :attribute deve ser menor que :value.',
    file: 'O arquivo :attribute ser menor que :value kilobytes.',
    string: 'O campo :attribute deve ser menor que :value caracteres.',
    array: 'O campo :attribute deve ter menos que :value itens.'
  },
  lte: {
    numeric: 'O campo :attribute deve ser menor ou igual a :value.',
    file: 'O arquivo :attribute ser menor ou igual a :value kilobytes.',
    string: 'O campo :attribute deve ser menor ou igual a :value caracteres.',
    array: 'O campo :attribute não deve ter mais que :value itens.'
  },
  max: {
    numeric: 'O campo :attribute não pode conter um valor superior a :max.',
    file: 'O campo :attribute não pode conter um arquivo com mais de :max kilobytes.',
    string: 'O campo :attribute não pode conter mais de :max caracteres.',
    array: 'O campo :attribute deve conter no máximo :max itens.'
  },
  mimes: 'O campo :attribute deve conter um arquivo do tipo: :values.',
  mimetypes: 'O campo :attribute deve conter um arquivo do tipo: :values.',
  min: {
    numeric: 'O campo :attribute deve conter um número superior ou igual a :min.',
    file: 'O campo :attribute deve conter um arquivo com no mínimo :min kilobytes.',
    string: 'O campo :attribute deve conter no mínimo :min caracteres.',
    array: 'O campo :attribute deve conter no mínimo :min itens.'
  },
  not_in: 'O campo :attribute contém um valor inválido.',
  not_regex: 'O formato do valor :attribute é inválido.',
  numeric: 'O campo :attribute deve conter um valor numérico.',
  present: 'O campo :attribute deve estar presente.',
  regex: 'O formato do valor informado no campo :attribute é inválido.',
  required: 'O campo :attribute é obrigatório.',
  required_if: 'O campo :attribute é obrigatório quando o valor do campo :other é igual a :value.',
  required_unless: 'O campo :attribute é obrigatório a menos que :other esteja presente em :values.',
  required_with: 'O campo :attribute é obrigatório quando :values está presente.',
  required_with_all: 'O campo :attribute é obrigatório quando um dos :values está presente.',
  required_without: 'O campo :attribute é obrigatório quando :values não está presente.',
  required_without_all: 'O campo :attribute é obrigatório quando nenhum dos :values está presente.',
  same: 'Os campos :attribute e :other devem conter valores iguais.',
  size: {
    numeric: 'O campo :attribute deve conter o número :size.',
    file: 'O campo :attribute deve conter um arquivo com o tamanho de :size kilobytes.',
    string: 'O campo :attribute deve conter :size caracteres.',
    array: 'O campo :attribute deve conter :size itens.'
  },
  string: 'O campo :attribute deve ser uma string.',
  timezone: 'O campo :attribute deve conter um fuso horário válido.',
  unique: 'O valor informado para o campo :attribute já está em uso.',
  uploaded: 'Falha no Upload do arquivo :attribute.',
  url: 'O formato da URL informada para o campo :attribute é inválido.'
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/ro.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/ro.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute trebuie acceptat.',
  after: ':attribute trebuie să fie după :after.',
  after_or_equal: ':attribute trebuie să fie egal sau după :after_or_equal.',
  alpha: 'Câmpul :attribute rebuie să conțină numai caractere alfabetice.',
  alpha_dash: 'Câmpul:attribute poate conține numai caractere alfanumerice, precum și liniuțe și subliniere.',
  alpha_num: 'Câmpul :attribute trebuie să fie alfanumeric.',
  before: ':attribute trebuie să fie înainte :before.',
  before_or_equal: ':attribute trebuie să fie egal sau înainte :before_or_equal.',
  between: ':attribute trebuie să fie între :min și :max.',
  confirmed: 'Confirmarea :attribute nu se potrivește.',
  email: 'Formatul :attribute nu este valid.',
  date: ':attribute nu este un format de dată valid.',
  def: 'Atributul :attribute are erori.',
  digits: ':attribute trebuie să aibă  :digits cifre.',
  digits_between: 'Câmpul :attribute trebuie să aibă între :min și :max cifre.',
  different: ':attribute și :different trebuie sa fie diferite.',
  in: 'Atributul selectat :attribute nu este valid.',
  integer: ':attribute trebuie să fie un număr întreg.',
  hex: 'Câmpul :attribute trebuie să aibă format hexazecimal.',
  min: {
    numeric: ':attribute trebuie să fie mai mare de :min.',
    string: ':attribute trebuie să contină cel puțin :min caractere.'
  },
  max: {
    numeric: ':attribute nu trebuie să fie mai mare de :max.',
    string: ':attribute poate să contină maxim :max caractere.'
  },
  not_in: ':attribute selectat nu este valid.',
  numeric: ':attribute trebuie sa fie un număr.',
  present: ':attribute trebuie sa fie prezent(dar poate fi gol).',
  required: ' Câmpul :attribute este obligatoriu.',
  required_if: 'Câmpul :attribute este obligatoriu cănd :other este :value.',
  required_unless: 'Câmpul :attribute este obligatoriu cănd :other nu este :value.',
  required_with: 'Câmpul :attribute este obligatoriu cănd :field este completat.',
  required_with_all: 'Câmpul :attribute este obligatoriu cănd :fields sunt completate.',
  required_without: 'Câmpul :attribute este obligatoriu cănd :field nu este completat.',
  required_without_all: 'Câmpul :attribute este obligatoriu cănd :fields nu sunt completate.',
  same: 'Câmpurile :attribute și :same trebuie să fie egale.',
  size: {
    numeric: ':attribute trebuie să fie :size.',
    string: ':attribute trebuie să contina :size caractere.'
  },
  string: ':attribute trebuie să fie un contina doar caractere alfabetice.',
  url: 'Formatul :attribute nu este valid.',
  regex: 'Formatul :attribute nu este valid.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/ru.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/ru.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Вы должны принять :attribute.',
  alpha: 'Поле :attribute может содержать только буквы.',
  alpha_dash: 'Поле :attribute может содержать только буквы, цифры, дефисы и символы подчёркивания.',
  alpha_num: 'Поле :attribute может содержать только буквы и цифры.',
  between: 'Поле :attribute должно быть между :min и :max.',
  confirmed: 'Поле :attribute не совпадает с подтверждением.',
  email: 'Поле :attribute должно быть действительным электронным адресом.',
  def: 'Поле :attribute содержит ошибки.',
  digits: 'Длина цифрового поля :attribute должна быть :digits.',
  digits_between: 'Длинна цифрового поля :attribute должна быть от :min до :max знаков.',
  different: 'Поля :attribute и :different должны различаться.',
  in: 'Выбранное значение для :attribute ошибочно.',
  integer: 'Поле :attribute должно быть целым числом.',
  hex: 'Поле :attribute должно иметь шестнадцатеричный формат',
  min: {
    numeric: 'Значение поля :attribute должно быть больше или равно :min.',
    string: 'Количество символов в поле :attribute должно быть не менее :min.'
  },
  max: {
    numeric: 'Значение поля :attribute должно быть меньше или равно :max.',
    string: 'Количество символов в поле :attribute не может превышать :max.'
  },
  not_in: 'Выбранное значение для :attribute ошибочно.',
  numeric: 'Поле :attribute должно быть числом.',
  present: 'Поле :attribute должно присутствовать (но может быть пустым).',
  required: 'Поле :attribute обязательно для заполнения.',
  required_if: 'Поле :attribute требуется когда значения поля :other равно :value.',
  same: 'Значение :attribute должно совпадать с :same.',
  size: {
    numeric: 'Значение поля :attribute должно быть равным :size.',
    string: 'Количество символов в поле :attribute должно быть равно :size.'
  },
  url: 'Поле :attribute должно содержать валидный URL.',
  regex: 'Неверный формат поля :attribute.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/se.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/se.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute måste vara accepterat.',
  after: ':attribute måste vara efter :after.',
  after_or_equal: ':attribute måste vara samtidigt eller efter :after_or_equal.',
  alpha: ':attribute får bara bestå av bokstäver.',
  alpha_dash: ':attribute får bara bestå av alfanumeriska tecken, bindestreck och understreck.',
  alpha_num: ':attribute får bara bestå av alfanumeriska tecken',
  before: ':attribute måste vara före :before.',
  before_or_equal: ':attribute måste vara samtidigt eller före :before_or_equal.',
  between: ':attribute måste vara mellan :min och :max.',
  confirmed: ':attribute stämmer inte överens med bekräftelsefältet.',
  email: 'Felaktigt format för :attribute.',
  date: ':attribute är inte ett giltigt datum.',
  def: 'Attributet :attribute innehåller fel.',
  digits: ':attribute ska innehålla :digits siffror.',
  different: ':attribute och :different måste vara olika.',
  in: 'Det valda :attribute är ogiltigt.',
  integer: ':attribute måste vara ett heltal.',
  hex: ':attribute måste vara i hexadecimalt format',
  min: {
    numeric: ':attribute måste vara minst :min.',
    string: ':attribute måste vara minst :min tecken.'
  },
  max: {
    numeric: ':attribute får inte vara högre än :max.',
    string: ':attribute får inte innehålla fler än :max tecken.'
  },
  not_in: 'Det valda attributet :attribute är ogiltigt',
  numeric: ':attribute måste vara en siffra.',
  present: ':attribute måste vara tillgängligt.',
  required: ':attribute måste vara ifyllt.',
  required_if: ':attribute måste vara ifyllt när :other är :value.',
  required_unless: ':attribute måste vara ifyllt när :other inte är :value.',
  required_with: ':attribute måste vara ifyllt när :field är ifyllt.',
  required_with_all: ':attribute måste vara ifyllt när :fields är ifyllda.',
  required_without: ':attribute måste vara ifyllt när :field inte är ifyllt.',
  required_without_all: ':attribute måste vara ifyllt när ingen av :fields är ifyllda.',
  same: ':attribute och :same måste matcha.',
  size: {
    numeric: ':attribute måste vara :size.',
    string: ':attribute måste vara :size tecken lång.'
  },
  string: ':attribute måste vara en sträng.',
  url: ':attribute formatet är ogiltigt.',
  regex: ':attribute formatet är ogiltigt.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/sl.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/sl.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute mora biti sprejet.',
  active_url: ':attribute ni pravilen.',
  after: ':attribute mora biti za datumom :date.',
  after_or_equal: ':attribute mora biti za ali enak :date.',
  alpha: ':attribute lahko vsebuje samo črke.',
  alpha_dash: ':attribute lahko vsebuje samo črke, številke in črtice.',
  alpha_num: ':attribute lahko vsebuje samo črke in številke.',
  attributes: {},
  array: ':attribute mora biti polje.',
  before: ':attribute mora biti pred datumom :date.',
  before_or_equal: ':attribute mora biti pred ali enak :date.',
  between: {
    numeric: ':attribute mora biti med :min in :max.',
    file: ':attribute mora biti med :min in :max kilobajti.',
    string: ':attribute mora biti med :min in :max znaki.',
    array: ':attribute mora imeti med :min in :max elementov.'
  },
  boolean: ':attribute polje mora biti 1 ali 0',
  confirmed: ':attribute potrditev se ne ujema.',
  date: ':attribute ni veljaven datum.',
  date_format: ':attribute se ne ujema z obliko :format.',
  different: ':attribute in :other mora biti drugačen.',
  digits: ':attribute mora imeti :digits cifer.',
  digits_between: ':attribute mora biti med :min in :max ciframi.',
  dimensions: ':attribute ima napačne dimenzije slike.',
  distinct: ':attribute je duplikat.',
  email: ':attribute mora biti veljaven e-poštni naslov.',
  exists: 'izbran :attribute je neveljaven.',
  file: ':attribute mora biti datoteka.',
  filled: ':attribute mora biti izpolnjen.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.'
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.'
  },
  image: ':attribute mora biti slika.',
  in: 'izbran :attribute je neveljaven.',
  in_array: ':attribute ne obstaja v :other.',
  integer: ':attribute mora biti število.',
  ip: ':attribute mora biti veljaven IP naslov.',
  ipv4: ':attribute mora biti veljaven IPv4 naslov.',
  ipv6: ':attribute mora biti veljaven IPv6 naslov.',
  json: ':attribute mora biti veljaven JSON tekst.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.'
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.'
  },
  max: {
    numeric: ':attribute ne sme biti večje od :max.',
    file: ':attribute ne sme biti večje :max kilobajtov.',
    string: ':attribute ne sme biti večje :max znakov.',
    array: ':attribute ne smejo imeti več kot :max elementov.'
  },
  mimes: ':attribute mora biti datoteka tipa: :values.',
  mimetypes: ':attribute mora biti datoteka tipa: :values.',
  min: {
    numeric: ':attribute mora biti vsaj dolžine :min.',
    file: ':attribute mora imeti vsaj :min kilobajtov.',
    string: ':attribute mora imeti vsaj :min znakov.',
    array: ':attribute mora imeti vsaj :min elementov.'
  },
  not_in: 'izbran :attribute je neveljaven.',
  not_regex: 'The :attribute format is invalid.',
  numeric: ':attribute mora biti število.',
  present: 'Polje :attribute mora biti prisotno.',
  regex: 'Format polja :attribute je neveljaven.',
  required: 'Polje :attribute je obvezno.',
  required_if: 'Polje :attribute je obvezno, če je :other enak :value.',
  required_unless: 'Polje :attribute je obvezno, razen če je :other v :values.',
  required_with: 'Polje :attribute je obvezno, če je :values prisoten.',
  required_with_all: 'Polje :attribute je obvezno, če so :values prisoten.',
  required_without: 'Polje :attribute je obvezno, če :values ni prisoten.',
  required_without_all: 'Polje :attribute je obvezno, če :values niso prisotni.',
  same: 'Polje :attribute in :other se morata ujemati.',
  size: {
    numeric: ':attribute mora biti :size.',
    file: ':attribute mora biti :size kilobajtov.',
    string: ':attribute mora biti :size znakov.',
    array: ':attribute mora vsebovati :size elementov.'
  },
  string: ':attribute mora biti tekst.',
  timezone: ':attribute mora biti časovna cona.',
  unique: ':attribute je že zaseden.',
  uploaded: 'Nalaganje :attribute ni uspelo.',
  url: ':attribute format je neveljaven.'
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/sq.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/sq.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute duhet të pranohet.',
  active_url: ':attribute nuk është adresë e saktë.',
  after: ':attribute duhet të jetë datë pas :date.',
  after_or_equal: 'The :attribute must be a date after or equal to :date.',
  alpha: ':attribute mund të përmbajë vetëm shkronja.',
  alpha_dash: ':attribute mund të përmbajë vetëm shkronja, numra, dhe viza.',
  alpha_num: ':attribute mund të përmbajë vetëm shkronja dhe numra.',
  attributes: {},
  array: ':attribute duhet të jetë një bashkësi (array).',
  before: ':attribute duhet të jetë datë para :date.',
  before_or_equal: 'The :attribute must be a date before or equal to :date.',
  between: {
    numeric: ':attribute duhet të jetë midis :min - :max.',
    file: ':attribute duhet të jetë midis :min - :max kilobajtëve.',
    string: ':attribute duhet të jetë midis :min - :max karaktereve.',
    array: ':attribute duhet të jetë midis :min - :max elementëve.'
  },
  boolean: 'Fusha :attribute duhet të jetë e vërtetë ose e gabuar',
  confirmed: ':attribute konfirmimi nuk përputhet.',
  date: ':attribute nuk është një datë e saktë.',
  date_format: ':attribute nuk i përshtatet formatit :format.',
  different: ':attribute dhe :other duhet të jenë të ndryshme.',
  digits: ':attribute duhet të jetë :digits shifra.',
  digits_between: ':attribute duhet të jetë midis :min dhe :max shifra.',
  dimensions: 'The :attribute has invalid image dimensions.',
  distinct: 'The :attribute field has a duplicate value.',
  email: ':attribute formati është i pasaktë.',
  exists: ':attribute përzgjedhur është i/e pasaktë.',
  file: 'The :attribute must be a file.',
  filled: 'Fusha :attribute është e kërkuar.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.'
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.'
  },
  image: ':attribute duhet të jetë imazh.',
  in: ':attribute përzgjedhur është i/e pasaktë.',
  in_array: 'The :attribute field does not exist in :other.',
  integer: ':attribute duhet të jetë numër i plotë.',
  ip: ':attribute duhet të jetë një IP adresë e saktë.',
  ipv4: 'The :attribute must be a valid IPv4 address.',
  ipv6: 'The :attribute must be a valid IPv6 address.',
  json: 'The :attribute must be a valid JSON string.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.'
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.'
  },
  max: {
    numeric: ':attribute nuk mund të jetë më tepër se :max.',
    file: ':attribute nuk mund të jetë më tepër se :max kilobajtë.',
    string: ':attribute nuk mund të jetë më tepër se :max karaktere.',
    array: ':attribute nuk mund të ketë më tepër se :max elemente.'
  },
  mimes: ':attribute duhet të jetë një dokument i tipit: :values.',
  mimetypes: ':attribute duhet të jetë një dokument i tipit: :values.',
  min: {
    numeric: ':attribute nuk mund të jetë më pak se :min.',
    file: ':attribute nuk mund të jetë më pak se :min kilobajtë.',
    string: ':attribute nuk mund të jetë më pak se :min karaktere.',
    array: ':attribute nuk mund të ketë më pak se :min elemente.'
  },
  not_in: ':attribute përzgjedhur është i/e pasaktë.',
  not_regex: 'The :attribute format is invalid.',
  numeric: ':attribute duhet të jetë një numër.',
  present: 'The :attribute field must be present.',
  regex: 'Formati i :attribute është i pasaktë.',
  required: 'Fusha :attribute është e kërkuar.',
  required_if: 'Fusha :attribute është e kërkuar kur :other është :value.',
  required_unless: 'The :attribute field is required unless :other is in :values.',
  required_with: 'Fusha :attribute është e kërkuar kur :values ekziston.',
  required_with_all: 'Fusha :attribute është e kërkuar kur :values ekziston.',
  required_without: 'Fusha :attribute është e kërkuar kur :values nuk ekziston.',
  required_without_all: 'Fusha :attribute është e kërkuar kur nuk ekziston asnjë nga :values.',
  same: ':attribute dhe :other duhet të përputhen.',
  size: {
    numeric: ':attribute duhet të jetë :size.',
    file: ':attribute duhet të jetë :size kilobajtë.',
    string: ':attribute duhet të jetë :size karaktere.',
    array: ':attribute duhet të ketë :size elemente.'
  },
  string: ':attribute duhet të jetë varg.',
  timezone: ':attribute duhet të jetë zonë e saktë.',
  unique: ':attribute është marrë tashmë.',
  uploaded: 'The :attribute failed to upload.',
  url: 'Formati i :attribute është i pasaktë.'
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/sr.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/sr.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Polje :attribute mora biti prihvaćeno.',
  active_url: 'Polje :attribute nije validan URL.',
  after: 'Polje :attribute mora biti datum posle :date.',
  after_or_equal: 'The :attribute must be a date after or equal to :date.',
  alpha: 'Polje :attribute može sadržati samo slova.',
  alpha_dash: 'Polje :attribute može sadržati samo slova, brojeve i povlake.',
  alpha_num: 'Polje :attribute može sadržati samo slova i brojeve.',
  attributes: {},
  array: 'Polje :attribute mora sadržati nekih niz stavki.',
  before: 'Polje :attribute mora biti datum pre :date.',
  before_or_equal: 'The :attribute must be a date before or equal to :date.',
  between: {
    numeric: 'Polje :attribute mora biti između :min - :max.',
    file: 'Fajl :attribute mora biti između :min - :max kilobajta.',
    string: 'Polje :attribute mora biti između :min - :max karaktera.',
    array: 'Polje :attribute mora biti između :min - :max stavki.'
  },
  boolean: 'Polje :attribute mora biti tačno ili netačno',
  confirmed: 'Potvrda polja :attribute se ne poklapa.',
  date: 'Polje :attribute nije važeći datum.',
  date_format: 'Polje :attribute ne odgovora prema formatu :format.',
  different: 'Polja :attribute i :other moraju biti različita.',
  digits: 'Polje :attribute mora sadržati :digits šifri.',
  digits_between: 'Polje :attribute mora biti izemđu :min i :max šifri.',
  dimensions: 'The :attribute has invalid image dimensions.',
  distinct: 'The :attribute field has a duplicate value.',
  email: 'Format polja :attribute nije validan.',
  exists: 'Odabrano polje :attribute nije validno.',
  file: 'The :attribute must be a file.',
  filled: 'Polje :attribute je obavezno.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.'
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.'
  },
  image: 'Polje :attribute mora biti slika.',
  in: 'Odabrano polje :attribute nije validno.',
  in_array: 'The :attribute field does not exist in :other.',
  integer: 'Polje :attribute mora biti broj.',
  ip: 'Polje :attribute mora biti validna IP adresa.',
  ipv4: 'The :attribute must be a valid IPv4 address.',
  ipv6: 'The :attribute must be a valid IPv6 address.',
  json: 'The :attribute must be a valid JSON string.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.'
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.'
  },
  max: {
    numeric: 'Polje :attribute mora biti manje od :max.',
    file: 'Polje :attribute mora biti manje od :max kilobajta.',
    string: 'Polje :attribute mora sadržati manje od :max karaktera.',
    array: 'Polje :attribute ne smije da image više od :max stavki.'
  },
  mimes: 'Polje :attribute mora biti fajl tipa: :values.',
  mimetypes: 'Polje :attribute mora biti fajl tipa: :values.',
  min: {
    numeric: 'Polje :attribute mora biti najmanje :min.',
    file: 'Fajl :attribute mora biti najmanje :min kilobajta.',
    string: 'Polje :attribute mora sadržati najmanje :min karaktera.',
    array: 'Polje :attribute mora sadrzati najmanje :min stavku.'
  },
  not_in: 'Odabrani element polja :attribute nije validan.',
  not_regex: 'The :attribute format is invalid.',
  numeric: 'Polje :attribute mora biti broj.',
  present: 'The :attribute field must be present.',
  regex: 'Format polja :attribute nije validan.',
  required: 'Polje :attribute je obavezno.',
  required_if: 'Polje :attribute je potrebno kada polje :other sadrži :value.',
  required_unless: 'The :attribute field is required unless :other is in :values.',
  required_with: 'Polje :attribute je potrebno kada polje :values je prisutan.',
  required_with_all: 'Polje :attribute je obavezno kada je :values prikazano.',
  required_without: 'Polje :attribute je potrebno kada polje :values nije prisutan.',
  required_without_all: 'Polje :attribute je potrebno kada nijedan od sledeći polja :values nisu prisutni.',
  same: 'Polja :attribute i :other se moraju poklapati.',
  size: {
    numeric: 'Polje :attribute mora biti :size.',
    file: 'Fajl :attribute mora biti :size kilobajta.',
    string: 'Polje :attribute mora biti :size karaktera.',
    array: 'Polje :attribute mora sadržati :size stavki.'
  },
  string: 'Polje :attribute mora sadržati slova.',
  timezone: 'Polje :attribute mora biti ispravna vremenska zona.',
  unique: 'Polje :attribute već postoji.',
  uploaded: 'The :attribute failed to upload.',
  url: 'Format polja :attribute ne važi.'
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/sv.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/sv.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute måste accepteras.',
  active_url: ':attribute är inte en giltig webbadress.',
  after: ':attribute måste vara ett datum efter den :date.',
  after_or_equal: ':attribute måste vara ett datum senare eller samma dag som :date.',
  alpha: ':attribute får endast innehålla bokstäver.',
  alpha_dash: ':attribute får endast innehålla bokstäver, siffror och bindestreck.',
  alpha_num: ':attribute får endast innehålla bokstäver och siffror.',
  array: ':attribute måste vara en array.',
  before: ':attribute måste vara ett datum innan den :date.',
  before_or_equal: ':attribute måste vara ett datum före eller samma dag som :date.',
  between: {
    numeric: ':attribute måste vara en siffra mellan :min och :max.',
    file: ':attribute måste vara mellan :min till :max kilobyte stor.',
    string: ':attribute måste innehålla :min till :max tecken.',
    array: ':attribute måste innehålla mellan :min - :max objekt.'
  },
  boolean: ':attribute måste vara sant eller falskt.',
  confirmed: ':attribute bekräftelsen matchar inte.',
  date: ':attribute är inte ett giltigt datum.',
  date_format: ':attribute matchar inte formatet :format.',
  different: ':attribute och :other får inte vara lika.',
  digits: ':attribute måste vara :digits tecken.',
  digits_between: ':attribute måste vara mellan :min och :max tecken.',
  dimensions: ':attribute har felaktiga bilddimensioner.',
  distinct: ':attribute innehåller fler än en repetition av samma element.',
  email: ':attribute måste innehålla en korrekt e-postadress.',
  exists: ':attribute är ogiltigt.',
  file: ':attribute måste vara en fil.',
  filled: ':attribute är obligatoriskt.',
  gt: {
    numeric: ':attribute måste vara större än :value.',
    file: ':attribute måste vara större än :value kilobyte stor.',
    string: ':attribute måste vara längre än :value tecken.',
    array: ':attribute måste innehålla fler än :value objekt.'
  },
  gte: {
    numeric: ':attribute måste vara lika med eller större än :value.',
    file: ':attribute måste vara lika med eller större än :value kilobyte stor.',
    string: ':attribute måste vara lika med eller längre än :value tecken.',
    array: ':attribute måste innehålla lika många eller fler än :value objekt.'
  },
  image: ':attribute måste vara en bild.',
  in: ':attribute är ogiltigt.',
  in_array: ':attribute finns inte i :other.',
  integer: ':attribute måste vara en siffra.',
  ip: ':attribute måste vara en giltig IP-adress.',
  ipv4: ':attribute måste vara en giltig IPv4-adress.',
  ipv6: ':attribute måste vara en giltig IPv6-adress.',
  json: ':attribute måste vara en giltig JSON-sträng.',
  lt: {
    numeric: ':attribute måste vara mindre än :value.',
    file: ':attribute måste vara mindre än :value kilobyte stor.',
    string: ':attribute måste vara kortare än :value tecken.',
    array: ':attribute måste innehålla färre än :value objekt.'
  },
  lte: {
    numeric: ':attribute måste vara lika med eller mindre än :value.',
    file: ':attribute måste vara lika med eller mindre än :value kilobyte stor.',
    string: ':attribute måste vara lika med eller kortare än :value tecken.',
    array: ':attribute måste innehålla lika många eller färre än :value objekt.'
  },
  max: {
    numeric: ':attribute får inte vara större än :max.',
    file: ':attribute får max vara :max kilobyte stor.',
    string: ':attribute får max innehålla :max tecken.',
    array: ':attribute får inte innehålla mer än :max objekt.'
  },
  mimes: ':attribute måste vara en fil av typen: :values.',
  mimetypes: ':attribute måste vara en fil av typen: :values.',
  min: {
    numeric: ':attribute måste vara större än :min.',
    file: ':attribute måste vara minst :min kilobyte stor.',
    string: ':attribute måste innehålla minst :min tecken.',
    array: ':attribute måste innehålla minst :min objekt.'
  },
  not_in: ':attribute är ogiltigt.',
  not_regex: 'Formatet för :attribute är ogiltigt.',
  numeric: ':attribute måste vara en siffra.',
  present: ':attribute måste finnas med.',
  regex: ':attribute har ogiltigt format.',
  required: ':attribute är obligatoriskt.',
  required_if: ':attribute är obligatoriskt när :other är :value.',
  required_unless: ':attribute är obligatoriskt när inte :other finns bland :values.',
  required_with: ':attribute är obligatoriskt när :values är ifyllt.',
  required_with_all: ':attribute är obligatoriskt när :values är ifyllt.',
  required_without: ':attribute är obligatoriskt när :values ej är ifyllt.',
  required_without_all: ':attribute är obligatoriskt när ingen av :values är ifyllt.',
  same: ':attribute och :other måste vara lika.',
  size: {
    numeric: ':attribute måste vara :size.',
    file: ':attribute får endast vara :size kilobyte stor.',
    string: ':attribute måste innehålla :size tecken.',
    array: ':attribute måste innehålla :size objekt.'
  },
  string: ':attribute måste vara en sträng.',
  timezone: ':attribute måste vara en giltig tidszon.',
  unique: ':attribute används redan.',
  uploaded: ':attribute kunde inte laddas upp.',
  url: ':attribute har ett ogiltigt format.'
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/tr.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/tr.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute kabul edilmeli.',
  alpha: ':attribute alanı sadece harflerden oluşabilir.',
  alpha_dash: ':attribute alanı sadece alfa-nümerik, tire ve alt çizgi karakterlerden oluşabilir.',
  alpha_num: ':attribute alanı alfa-nümerik olmalıdır.',
  between: ':attribute alanı :min ile :max arasında olabilir.',
  confirmed: ':attribute uyuşmuyor.',
  email: ':attribute formatı geçersiz.',
  date: ':attribute geöerli bir tarih alanı değil.',
  def: ':attribute hatalar içeriyor.',
  digits: ':attribute sadece rakamlardan oluşabilir.',
  digits_between: ':attribute :min ile :max arasında rakam olmalıdır.',
  different: ':attribute ve :different farklı olmalı.',
  in: 'Seçilen :attribute geçerli değil.',
  integer: ':attribute tam sayı olmalı.',
  hex: 'The :attribute should have hexadecimal format',
  min: {
    numeric: ':attribute en az :min olmalı.',
    string: ':attribute en az :min karakter uzunluğunda olmalı.'
  },
  max: {
    numeric: ':attribute en çok :max olabilir.',
    string: ':attribute uzunluğu en çok :max karakter uzunluğunda olabilir.'
  },
  not_in: 'Seçilen :attribute geçerli değil.',
  numeric: ':attribute sayı olmalı.',
  present: ':attribute alanı bulunmalıdır (ancak boş olabilir).',
  required: ':attribute alanı gerekli.',
  required_if: ':attribute alanı :other alanı :value olduğunda gerekli.',
  same: ':attribute ve :same aynı olmalı.',
  size: {
    numeric: ':attribute :size olmalı.',
    string: ':attribute :size karakter uzunluğunda olmalı.'
  },
  string: ':attribute alfa-numerik olmalı.',
  url: ':attribute formatı geçersiz.',
  regex: ':attribute formatı geçersiz.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/ua.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/ua.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute повиннен бути прийнятий.',
  alpha: 'Поле :attribute може складатись тільки з літер.',
  alpha_dash: 'Поле :attribute може складатись тільки з літер, чисел, дефісів та символів підкреслення.',
  alpha_num: 'Поле :attribute може складатись тільки з літер та чисел.',
  between: 'Значення поля :attribute повинно знаходитись між :min і :max.',
  confirmed: 'Поле :attribute не співпадає з підтвердженням.',
  email: 'Значення поля :attribute повинно бути існуючою електронною адресою.',
  def: 'Поле :attribute містить помилки.',
  digits: 'Довжина числового поля :attribute повинна бути :digits.',
  digits_between: 'Довжина цифрового поля :attribute повинна бути від :min до :max.',
  different: 'Поля :attribute і :different повинні відрізнятись.',
  in: 'Обране значення для :attribute помилкове.',
  integer: 'Значення поля :attribute повинно бути цілим числом.',
  hex: 'Значення поля :attribute повинно бути шістнадцяткового формату',
  min: {
    numeric: 'Значення поля :attribute повинно бути більшим або рівним :min.',
    string: 'Кількість символів в полі :attribute повинна бути не менше :min.'
  },
  max: {
    numeric: 'Значення поля :attribute повинно бути менше або рівне :max.',
    string: 'Кількість символів в полі :attribute не може превищувати :max.'
  },
  not_in: 'Обране значення для :attribute помилкове.',
  numeric: 'Значення поля :attribute повинно бути числом.',
  present: 'Поле :attribute повинно бути присутнім (але може бути пустим).',
  required: 'Поле :attribute обов\'язкове для заповнення.',
  required_if: 'Поле :attribute потрібне у випадку коли значення поля :other рівне :value.',
  same: 'Значеня поля :attribute повинно співпадати з :same.',
  size: {
    numeric: 'Значення поля :attribute повинно бути рівним :size.',
    string: 'Кількість символів в полі :attribute повинна бути рівною :size.'
  },
  url: 'Поле :attribute повинне містити валідний URL.',
  regex: 'Неправильний формат значення :attribute.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/uk.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/uk.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: 'Ви повинні прийняти :attribute.',
  active_url: 'Поле :attribute не є правильним URL.',
  after: 'Поле :attribute має містити дату не раніше :date.',
  after_or_equal: 'Поле :attribute має містити дату не раніше або дорівнюватися :date.',
  alpha: 'Поле :attribute має містити лише літери.',
  alpha_dash: 'Поле :attribute має містити лише літери, цифри та підкреслення.',
  alpha_num: 'Поле :attribute має містити лише літери та цифри.',
  attributes: {},
  array: 'Поле :attribute має бути масивом.',
  before: 'Поле :attribute має містити дату не пізніше :date.',
  before_or_equal: 'Поле :attribute має містити дату не пізніше або дорівнюватися :date.',
  between: {
    numeric: 'Поле :attribute має бути між :min та :max.',
    file: 'Розмір файлу в полі :attribute має бути не менше :min та не більше :max кілобайт.',
    string: 'Текст в полі :attribute має бути не менше :min та не більше :max символів.',
    array: 'Поле :attribute має містити від :min до :max елементів.'
  },
  boolean: 'Поле :attribute повинне містити логічний тип.',
  confirmed: 'Поле :attribute не збігається з підтвердженням.',
  date: 'Поле :attribute не є датою.',
  date_format: 'Поле :attribute не відповідає формату :format.',
  different: 'Поля :attribute та :other повинні бути різними.',
  digits: 'Довжина цифрового поля :attribute повинна дорівнювати :digits.',
  digits_between: 'Довжина цифрового поля :attribute повинна бути від :min до :max.',
  dimensions: 'Поле :attribute містіть неприпустимі розміри зображення.',
  distinct: 'Поле :attribute містить значення, яке дублюється.',
  email: 'Поле :attribute повинне містити коректну електронну адресу.',
  file: 'Поле :attribute має містити файл.',
  filled: 'Поле :attribute є обов\'язковим для заповнення.',
  exists: 'Вибране для :attribute значення не коректне.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.'
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.'
  },
  image: 'Поле :attribute має містити зображення.',
  in: 'Вибране для :attribute значення не коректне.',
  in_array: 'Значення поля :attribute не міститься в :other.',
  integer: 'Поле :attribute має містити ціле число.',
  ip: 'Поле :attribute має містити IP адресу.',
  ipv4: 'Поле :attribute має містити IPv4 адресу.',
  ipv6: 'Поле :attribute має містити IPv6 адресу.',
  json: 'Дані поля :attribute мають бути в форматі JSON.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.'
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.'
  },
  max: {
    numeric: 'Поле :attribute має бути не більше :max.',
    file: 'Файл в полі :attribute має бути не більше :max кілобайт.',
    string: 'Текст в полі :attribute повинен мати довжину не більшу за :max.',
    array: 'Поле :attribute повинне містити не більше :max елементів.'
  },
  mimes: 'Поле :attribute повинне містити файл одного з типів: :values.',
  mimetypes: 'Поле :attribute повинне містити файл одного з типів: :values.',
  min: {
    numeric: 'Поле :attribute повинне бути не менше :min.',
    file: 'Розмір файлу в полі :attribute має бути не меншим :min кілобайт.',
    string: 'Текст в полі :attribute повинен містити не менше :min символів.',
    array: 'Поле :attribute повинне містити не менше :min елементів.'
  },
  not_in: 'Вибране для :attribute значення не коректне.',
  not_regex: 'The :attribute format is invalid.',
  numeric: 'Поле :attribute повинно містити число.',
  present: 'Поле :attribute повинне бути присутнє.',
  regex: 'Поле :attribute має хибний формат.',
  required: 'Поле :attribute є обов\'язковим для заповнення.',
  required_if: 'Поле :attribute є обов\'язковим для заповнення, коли :other є рівним :value.',
  required_unless: 'Поле :attribute є обов\'язковим для заповнення, коли :other відрізняється від :values',
  required_with: 'Поле :attribute є обов\'язковим для заповнення, коли :values вказано.',
  required_with_all: 'Поле :attribute є обов\'язковим для заповнення, коли :values вказано.',
  required_without: 'Поле :attribute є обов\'язковим для заповнення, коли :values не вказано.',
  required_without_all: 'Поле :attribute є обов\'язковим для заповнення, коли :values не вказано.',
  same: 'Поля :attribute та :other мають співпадати.',
  size: {
    numeric: 'Поле :attribute має бути довжини :size.',
    file: 'Файл в полі :attribute має бути розміром :size кілобайт.',
    string: 'Текст в полі :attribute повинен містити :size символів.',
    array: 'Поле :attribute повинне містити :size елементів.'
  },
  string: 'Поле :attribute повинне містити текст.',
  timezone: 'Поле :attribute повинне містити коректну часову зону.',
  unique: 'Таке значення поля :attribute вже існує.',
  uploaded: 'Завантаження поля :attribute не вдалося.',
  url: 'Формат поля :attribute неправильний.'
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/vi.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/vi.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute phải được chấp nhận.',
  alpha: 'Trường :attribute phải là ký tự',
  alpha_dash: ':attribute chỉ chấp nhận ký tự chữ cái, số, dấu gạch chéo và gạch dưới.',
  alpha_num: ':attribute phải là ký tự chữ cái hoặc chữ số.',
  between: ':attribute phải nằm trong khoảng :min và :max.',
  confirmed: ':attribute xác nhận không trùng khớp.',
  email: ':attribute không phải là email.',
  date: ':attribute không phải là ngày hợp lệ',
  def: 'Thuộc tính :attribute có lỗi.',
  digits: ':attribute phải là số và có chiều dài bằng :digits.',
  digits_between: 'Độ dài của trường :attribute phải nằm trong khoảng :min and :max chữ số.',
  different: 'Giá trị của hai trường :attribute và :different phải khác nhau.',
  in: 'Giá trị được chọn của :attribute không hợp lệ.',
  integer: ':attribute phải là số nguyên.',
  hex: 'The :attribute should have hexadecimal format',
  min: {
    numeric: ':attribute phải lớn hơn hoặc bằng :min.',
    string: ':attribute phải có ít nhất :min ký tự.'
  },
  max: {
    numeric: ':attribute phải nhỏ hơn hoặc bằng :max.',
    string: ':attribute phải có ít hơn :max ký tự.'
  },
  not_in: 'Giá trị được chọn của trường :attribute không hợp lệ.',
  numeric: ':attribute phải là số.',
  present: 'Trường :attribute phải có mặt (nhưng có thể để trống).',
  required: ':attribute bắt buộc nhập.',
  required_if: ':attribute là bắt buộc khi :other có giá trị :value.',
  same: 'Giá trị của :attribute và :same phải như nhau.',
  size: {
    numeric: ':attribute phải có chiều dài của bằng :size.',
    string: 'Số ký tự của :attribute phải là :size ký tự.'
  },
  string: ':attribute không phải là một chuỗi',
  url: ':attribute không phải là một Url hợp lệ.',
  regex: ':attribute không đúng định dạng',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/zh.js":
/*!*************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/zh.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute必须是可接受的.',
  alpha: ':attribute只能包含字母.',
  alpha_dash: ':attribute只能包含字母,连字符和下划线.',
  alpha_num: ':attribute只能包含字母和数字.',
  between: ':attribute的(大小,长度等)只能在:min和:max之间.',
  confirmed: ':attribute确认不一致.',
  email: ':attribute格式不正确.',
  date: ':attribute日期格式错误.',
  def: ':attribute属性错误.',
  digits: ':attribute必须是:digits位小数.',
  digits_between: ':attribute 必须是介于 :min 和 :max 位的数字。',
  different: ':attribute和:different必须不同.',
  in: '选择的:attribute无效',
  integer: ':attribute必须是一个整数.',
  hex: 'The :attribute should have hexadecimal format',
  min: {
    numeric: ':attribute不能小于:min.',
    string: ':attribute长度不能小于:min.'
  },
  max: {
    numeric: ':attribute不能大于:max.',
    string: ':attribute长度不能大于:max.'
  },
  not_in: '所选的:attribute无效.',
  numeric: ':attribute必须是一个数字.',
  present: 'The :attribute field must be present (but can be empty).',
  required: ':attribute不能为空.',
  required_if: '当:other是:value时,:attribute不能为空.',
  same: ':attribute和:same必须一致.',
  size: {
    numeric: ':attribute必须等于:size.',
    string: ':attribute的长度必须等于:size.'
  },
  string: ':attribute必须是一个字符串.',
  url: ':attribute格式不正确.',
  regex: ':attribute格式不正确.',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/lang/zh_TW.js":
/*!****************************************************!*\
  !*** ./node_modules/validatorjs/src/lang/zh_TW.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  accepted: ':attribute必須接受。',
  alpha: ':attribute只能包含字母。',
  alpha_dash: ':attribute只能包含字母，連字符和下划線。',
  alpha_num: ':attribute只能包含字母和數字。',
  between: ':attribute的值只能在:min和:max之間。',
  confirmed: ':attribute與確認輸入不一致。',
  email: ':attribute的格式錯誤。',
  date: ':attribute的日期格式錯誤。',
  def: ':attribute屬性錯誤。',
  digits: ':attribute必須是:digits位小數。',
  digits_between: ':attribute 必須介於 :min 至 :max 位數字。',
  different: ':attribute和:different必須不同。',
  in: '選擇的:attribute無效',
  integer: ':attribute必須是一個整數。',
  hex: ':attribute 必須是十六進位格式',
  min: {
    numeric: ':attribute不能小於:min。',
    string: ':attribute的長度不能小於:min.'
  },
  max: {
    numeric: ':attribute不能大於:max。',
    string: ':attribute的長度不能大於:max.'
  },
  not_in: '所選的:attribute無效。',
  numeric: ':attribute必須是一個數字。',
  present: ':attribute 一定要有值 (可以是空值)。',
  required: ':attribute不能空白。',
  required_if: '當:other是:value時,:attribute不能空白。',
  same: ':attribute和:same必須一致。',
  size: {
    numeric: ':attribute必須等於:size。',
    string: ':attribute的長度必須等於:size.'
  },
  string: ':attribute必須是一個字串。',
  url: ':attribute格式不正確。',
  regex: ':attribute格式不正確。',
  attributes: {}
};


/***/ }),

/***/ "./node_modules/validatorjs/src/messages.js":
/*!**************************************************!*\
  !*** ./node_modules/validatorjs/src/messages.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Attributes = __webpack_require__(/*! ./attributes */ "./node_modules/validatorjs/src/attributes.js");

var Messages = function(lang, messages) {
  this.lang = lang;
  this.messages = messages;
  this.customMessages = {};
  this.attributeNames = {};
};

Messages.prototype = {
  constructor: Messages,

  /**
   * Set custom messages
   *
   * @param {object} customMessages
   * @return {void}
   */
  _setCustom: function(customMessages) {
    this.customMessages = customMessages || {};
  },

  /**
   * Set custom attribute names.
   *
   * @param {object} attributes
   */
  _setAttributeNames: function(attributes) {
    this.attributeNames = attributes;
  },

  /**
   * Set the attribute formatter.
   *
   * @param {fuction} func
   * @return {void}
   */
  _setAttributeFormatter: function(func) {
    this.attributeFormatter = func;
  },

  /**
   * Get attribute name to display.
   *
   * @param  {string} attribute
   * @return {string}
   */
  _getAttributeName: function(attribute) {
    var name = attribute;
    if (this.attributeNames.hasOwnProperty(attribute)) {
      return this.attributeNames[attribute];
    } else if (this.messages.attributes.hasOwnProperty(attribute)) {
      name = this.messages.attributes[attribute];
    }

    if (this.attributeFormatter) {
      name = this.attributeFormatter(name);
    }

    return name;
  },

  /**
   * Get all messages
   *
   * @return {object}
   */
  all: function() {
    return this.messages;
  },

  /**
   * Render message
   *
   * @param  {Rule} rule
   * @return {string}
   */
  render: function(rule) {
    if (rule.customMessage) {
      return rule.customMessage;
    }
    var template = this._getTemplate(rule);

    var message;
    if (Attributes.replacements[rule.name]) {
      message = Attributes.replacements[rule.name].apply(this, [template, rule]);
    } else {
      message = this._replacePlaceholders(rule, template, {});
    }

    return message;
  },

  /**
   * Get the template to use for given rule
   *
   * @param  {Rule} rule
   * @return {string}
   */
  _getTemplate: function(rule) {

    var messages = this.messages;
    var template = messages.def;
    var customMessages = this.customMessages;
    var formats = [rule.name + '.' + rule.attribute, rule.name];

    for (var i = 0, format; i < formats.length; i++) {
      format = formats[i];
      if (customMessages.hasOwnProperty(format)) {
        template = customMessages[format];
        break;
      } else if (messages.hasOwnProperty(format)) {
        template = messages[format];
        break;
      }
    }

    if (typeof template === 'object') {
      template = template[rule._getValueType()];
    }

    return template;
  },

  /**
   * Replace placeholders in the template using the data object
   *
   * @param  {Rule} rule
   * @param  {string} template
   * @param  {object} data
   * @return {string}
   */
  _replacePlaceholders: function(rule, template, data) {
    var message, attribute;

    data.attribute = this._getAttributeName(rule.attribute);
    data[rule.name] = data[rule.name] || rule.getParameters().join(',');

    if (typeof template === 'string' && typeof data === 'object') {
      message = template;

      for (attribute in data) {
        message = message.replace(new RegExp(':' + attribute, 'g'), data[attribute]);
      }
    }

    return message;
  }

};

module.exports = Messages;


/***/ }),

/***/ "./node_modules/validatorjs/src/rules.js":
/*!***********************************************!*\
  !*** ./node_modules/validatorjs/src/rules.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isValid = __webpack_require__(/*! date-fns/isValid */ "./node_modules/date-fns/esm/isValid/index.js");
var parseISO = __webpack_require__(/*! date-fns/parseISO */ "./node_modules/date-fns/esm/parseISO/index.js");

function leapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function isValidDate(inDate) {
  if (inDate instanceof Date) {
    return !isNaN(inDate);
  }

  // reformat if supplied as mm.dd.yyyy (period delimiter)
  if (typeof inDate === 'string') {
    var pos = inDate.indexOf('.');
    if (pos > 0 && pos <= 6) {
      inDate = inDate.replace(/\./g, '-');
    }

    // if date is mm-dd-yyyy or yyyy-mm-dd
    if (inDate.length === 10) {
      return isValid(parseISO(inDate));
    }
  }

  var testDate = new Date(inDate);
  var yr = testDate.getFullYear();
  var mo = testDate.getMonth();
  var day = testDate.getDate();

  var daysInMonth = [31, leapYear(yr) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (yr < 1000) {
    return false;
  }
  if (isNaN(mo)) {
    return false;
  }
  if (mo + 1 > 12) {
    return false;
  }
  if (isNaN(day)) {
    return false;
  }
  if (day > daysInMonth[mo]) {
    return false;
  }

  return true;
}

var rules = {
  required: function(val) {
    var str;

    if (val === undefined || val === null) {
      return false;
    }

    str = String(val).replace(/\s/g, '');
    return str.length > 0 ? true : false;
  },

  required_if: function(val, req, attribute) {
    req = this.getParameters();
    if (this.validator._objectPath(this.validator.input, req[0]) === req[1]) {
      return this.validator.getRule('required').validate(val);
    }

    return true;
  },

  required_unless: function(val, req, attribute) {
    req = this.getParameters();
    if (this.validator._objectPath(this.validator.input, req[0]) !== req[1]) {
      return this.validator.getRule('required').validate(val);
    }

    return true;
  },

  required_with: function(val, req, attribute) {
    if (this.validator._objectPath(this.validator.input, req)) {
      return this.validator.getRule('required').validate(val);
    }

    return true;
  },

  required_with_all: function(val, req, attribute) {
    req = this.getParameters();

    for (var i = 0; i < req.length; i++) {
      if (!this.validator._objectPath(this.validator.input, req[i])) {
        return true;
      }
    }

    return this.validator.getRule('required').validate(val);
  },

  required_without: function(val, req, attribute) {
    if (this.validator._objectPath(this.validator.input, req)) {
      return true;
    }

    return this.validator.getRule('required').validate(val);
  },

  required_without_all: function(val, req, attribute) {
    req = this.getParameters();

    for (var i = 0; i < req.length; i++) {
      if (this.validator._objectPath(this.validator.input, req[i])) {
        return true;
      }
    }

    return this.validator.getRule('required').validate(val);
  },

  boolean: function(val) {
    return (
      val === true ||
      val === false ||
      val === 0 ||
      val === 1 ||
      val === '0' ||
      val === '1' ||
      val === 'true' ||
      val === 'false'
    );
  },

  // compares the size of strings
  // with numbers, compares the value
  size: function(val, req, attribute) {
    if (val) {
      req = parseFloat(req);

      var size = this.getSize();

      return size === req;
    }

    return true;
  },

  string: function(val, req, attribute) {
    return typeof val === 'string';
  },

  sometimes: function(val) {
    return true;
  },

  /**
   * Compares the size of strings or the value of numbers if there is a truthy value
   */
  min: function(val, req, attribute) {
    var size = this.getSize();
    return size >= req;
  },

  /**
   * Compares the size of strings or the value of numbers if there is a truthy value
   */
  max: function(val, req, attribute) {
    var size = this.getSize();
    return size <= req;
  },

  between: function(val, req, attribute) {
    req = this.getParameters();
    var size = this.getSize();
    var min = parseFloat(req[0], 10);
    var max = parseFloat(req[1], 10);
    return size >= min && size <= max;
  },

  email: function(val) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(val);
  },

  numeric: function(val) {
    var num;

    num = Number(val); // tries to convert value to a number. useful if value is coming from form element

    if (typeof num === 'number' && !isNaN(num) && typeof val !== 'boolean') {
      return true;
    } else {
      return false;
    }
  },

  array: function(val) {
    return val instanceof Array;
  },

  url: function(url) {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_\+.~#?&/=]*)/i.test(url);
  },

  alpha: function(val) {
    return /^[a-zA-Z]+$/.test(val);
  },

  alpha_dash: function(val) {
    return /^[a-zA-Z0-9_\-]+$/.test(val);
  },

  alpha_num: function(val) {
    return /^[a-zA-Z0-9]+$/.test(val);
  },

  same: function(val, req) {
    var val1 = this.validator._flattenObject(this.validator.input)[req];
    var val2 = val;

    if (val1 === val2) {
      return true;
    }

    return false;
  },

  different: function(val, req) {
    var val1 = this.validator._flattenObject(this.validator.input)[req];
    var val2 = val;

    if (val1 !== val2) {
      return true;
    }

    return false;
  },

  in: function(val, req) {
    var list, i;

    if (val) {
      list = this.getParameters();
    }

    if (val && !(val instanceof Array)) {
      var localValue = val;

      for (i = 0; i < list.length; i++) {
        if (typeof list[i] === 'string') {
          localValue = String(val);
        }

        if (localValue === list[i]) {
          return true;
        }
      }

      return false;
    }

    if (val && val instanceof Array) {
      for (i = 0; i < val.length; i++) {
        if (list.indexOf(val[i]) < 0) {
          return false;
        }
      }
    }

    return true;
  },

  not_in: function(val, req) {
    var list = this.getParameters();
    var len = list.length;
    var returnVal = true;

    for (var i = 0; i < len; i++) {
      var localValue = val;

      if (typeof list[i] === 'string') {
        localValue = String(val);
      }

      if (localValue === list[i]) {
        returnVal = false;
        break;
      }
    }

    return returnVal;
  },

  accepted: function(val) {
    if (val === 'on' || val === 'yes' || val === 1 || val === '1' || val === true) {
      return true;
    }

    return false;
  },

  confirmed: function(val, req, key) {
    var confirmedKey = key + '_confirmation';

    if (this.validator.input[confirmedKey] === val) {
      return true;
    }

    return false;
  },

  integer: function(val) {
    return String(parseInt(val, 10)) === String(val);
  },

  digits: function(val, req) {
    var numericRule = this.validator.getRule('numeric');
    if (numericRule.validate(val) && String(val).length === parseInt(req)) {
      return true;
    }

    return false;
  },

  digits_between: function(val) {
    var numericRule = this.validator.getRule('numeric');
    var req = this.getParameters();
    var valueDigitsCount = String(val).length;
    var min = parseFloat(req[0], 10);
    var max = parseFloat(req[1], 10);

    if (numericRule.validate(val) && valueDigitsCount >= min && valueDigitsCount <= max) {
      return true;
    }

    return false;
  },

  regex: function(val, req) {
    var mod = /[g|i|m]{1,3}$/;
    var flag = req.match(mod);
    flag = flag ? flag[0] : '';
    req = req.replace(mod, '').slice(1, -1);
    req = new RegExp(req, flag);
    return !!req.test(val);
  },

  date: function(val, format) {
    return isValidDate(val);
  },

  present: function(val) {
    return typeof val !== 'undefined';
  },

  after: function(val, req) {
    var val1 = this.validator.input[req];
    var val2 = val;

    if (!isValidDate(val1)) {
      return false;
    }
    if (!isValidDate(val2)) {
      return false;
    }

    if (new Date(val1).getTime() < new Date(val2).getTime()) {
      return true;
    }

    return false;
  },

  after_or_equal: function(val, req) {
    var val1 = this.validator.input[req];
    var val2 = val;

    if (!isValidDate(val1)) {
      return false;
    }
    if (!isValidDate(val2)) {
      return false;
    }

    if (new Date(val1).getTime() <= new Date(val2).getTime()) {
      return true;
    }

    return false;
  },

  before: function(val, req) {
    var val1 = this.validator.input[req];
    var val2 = val;

    if (!isValidDate(val1)) {
      return false;
    }
    if (!isValidDate(val2)) {
      return false;
    }

    if (new Date(val1).getTime() > new Date(val2).getTime()) {
      return true;
    }

    return false;
  },

  before_or_equal: function(val, req) {
    var val1 = this.validator.input[req];
    var val2 = val;

    if (!isValidDate(val1)) {
      return false;
    }
    if (!isValidDate(val2)) {
      return false;
    }

    if (new Date(val1).getTime() >= new Date(val2).getTime()) {
      return true;
    }

    return false;
  },

  hex: function(val) {
    return /^[0-9a-f]+$/i.test(val);
  }
};

var missedRuleValidator = function() {
  throw new Error('Validator `' + this.name + '` is not defined!');
};
var missedRuleMessage;

function Rule(name, fn, async) {
  this.name = name;
  this.fn = fn;
  this.passes = null;
  this._customMessage = undefined;
  this.async = async;
}

Rule.prototype = {
  /**
   * Validate rule
   *
   * @param  {mixed} inputValue
   * @param  {mixed} ruleValue
   * @param  {string} attribute
   * @param  {function} callback
   * @return {boolean|undefined}
   */
  validate: function(inputValue, ruleValue, attribute, callback) {
    var _this = this;
    this._setValidatingData(attribute, inputValue, ruleValue);
    if (typeof callback === 'function') {
      this.callback = callback;
      var handleResponse = function(passes, message) {
        _this.response(passes, message);
      };

      if (this.async) {
        return this._apply(inputValue, ruleValue, attribute, handleResponse);
      } else {
        return handleResponse(this._apply(inputValue, ruleValue, attribute));
      }
    }
    return this._apply(inputValue, ruleValue, attribute);
  },

  /**
   * Apply validation function
   *
   * @param  {mixed} inputValue
   * @param  {mixed} ruleValue
   * @param  {string} attribute
   * @param  {function} callback
   * @return {boolean|undefined}
   */
  _apply: function(inputValue, ruleValue, attribute, callback) {
    var fn = this.isMissed() ? missedRuleValidator : this.fn;

    return fn.apply(this, [inputValue, ruleValue, attribute, callback]);
  },

  /**
   * Set validating data
   *
   * @param {string} attribute
   * @param {mixed} inputValue
   * @param {mixed} ruleValue
   * @return {void}
   */
  _setValidatingData: function(attribute, inputValue, ruleValue) {
    this.attribute = attribute;
    this.inputValue = inputValue;
    this.ruleValue = ruleValue;
  },

  /**
   * Get parameters
   *
   * @return {array}
   */
  getParameters: function() {
    var value = [];

    if (typeof this.ruleValue === 'string') {
      value = this.ruleValue.split(',');
    }

    if (typeof this.ruleValue === 'number') {
      value.push(this.ruleValue);
    }

    if (this.ruleValue instanceof Array) {
      value = this.ruleValue;
    }

    return value;
  },

  /**
   * Get true size of value
   *
   * @return {integer|float}
   */
  getSize: function() {
    var value = this.inputValue;

    if (value instanceof Array) {
      return value.length;
    }

    if (typeof value === 'number') {
      return value;
    }

    if (this.validator._hasNumericRule(this.attribute)) {
      return parseFloat(value, 10);
    }

    return value.length;
  },

  /**
   * Get the type of value being checked; numeric or string.
   *
   * @return {string}
   */
  _getValueType: function() {
    if (typeof this.inputValue === 'number' || this.validator._hasNumericRule(this.attribute)) {
      return 'numeric';
    }

    return 'string';
  },

  /**
   * Set the async callback response
   *
   * @param  {boolean|undefined} passes  Whether validation passed
   * @param  {string|undefined} message Custom error message
   * @return {void}
   */
  response: function(passes, message) {
    this.passes = passes === undefined || passes === true;
    this._customMessage = message;
    this.callback(this.passes, message);
  },

  /**
   * Set validator instance
   *
   * @param {Validator} validator
   * @return {void}
   */
  setValidator: function(validator) {
    this.validator = validator;
  },

  /**
   * Check if rule is missed
   *
   * @return {boolean}
   */
  isMissed: function() {
    return typeof this.fn !== 'function';
  },

  get customMessage() {
    return this.isMissed() ? missedRuleMessage : this._customMessage;
  }
};

var manager = {
  /**
   * List of async rule names
   *
   * @type {Array}
   */
  asyncRules: [],

  /**
   * Implicit rules (rules to always validate)
   *
   * @type {Array}
   */
  implicitRules: [
    'required',
    'required_if',
    'required_unless',
    'required_with',
    'required_with_all',
    'required_without',
    'required_without_all',
    'accepted',
    'present'
  ],

  /**
   * Get rule by name
   *
   * @param  {string} name
   * @param {Validator}
   * @return {Rule}
   */
  make: function(name, validator) {
    var async = this.isAsync(name);
    var rule = new Rule(name, rules[name], async);
    rule.setValidator(validator);
    return rule;
  },

  /**
   * Determine if given rule is async
   *
   * @param  {string}  name
   * @return {boolean}
   */
  isAsync: function(name) {
    for (var i = 0, len = this.asyncRules.length; i < len; i++) {
      if (this.asyncRules[i] === name) {
        return true;
      }
    }
    return false;
  },

  /**
   * Determine if rule is implicit (should always validate)
   *
   * @param {string} name
   * @return {boolean}
   */
  isImplicit: function(name) {
    return this.implicitRules.indexOf(name) > -1;
  },

  /**
   * Register new rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @return {void}
   */
  register: function(name, fn) {
    rules[name] = fn;
  },

  /**
   * Register new implicit rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @return {void}
   */
  registerImplicit: function(name, fn) {
    this.register(name, fn);
    this.implicitRules.push(name);
  },

  /**
   * Register async rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @return {void}
   */
  registerAsync: function(name, fn) {
    this.register(name, fn);
    this.asyncRules.push(name);
  },

  /**
   * Register implicit async rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @return {void}
   */
  registerAsyncImplicit: function(name, fn) {
    this.registerImplicit(name, fn);
    this.asyncRules.push(name);
  },

  registerMissedRuleValidator: function(fn, message) {
    missedRuleValidator = fn;
    missedRuleMessage = message;
  }
};

module.exports = manager;


/***/ }),

/***/ "./node_modules/validatorjs/src/validator.js":
/*!***************************************************!*\
  !*** ./node_modules/validatorjs/src/validator.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Rules = __webpack_require__(/*! ./rules */ "./node_modules/validatorjs/src/rules.js");
var Lang = __webpack_require__(/*! ./lang */ "./node_modules/validatorjs/src/lang.js");
var Errors = __webpack_require__(/*! ./errors */ "./node_modules/validatorjs/src/errors.js");
var Attributes = __webpack_require__(/*! ./attributes */ "./node_modules/validatorjs/src/attributes.js");
var AsyncResolvers = __webpack_require__(/*! ./async */ "./node_modules/validatorjs/src/async.js");

var Validator = function (input, rules, customMessages) {
  var lang = Validator.getDefaultLang();
  this.input = input || {};

  this.messages = Lang._make(lang);
  this.messages._setCustom(customMessages);
  this.setAttributeFormatter(Validator.prototype.attributeFormatter);

  this.errors = new Errors();
  this.errorCount = 0;

  this.hasAsync = false;
  this.rules = this._parseRules(rules);
};

Validator.prototype = {

  constructor: Validator,

  /**
   * Default language
   *
   * @type {string}
   */
  lang: 'en',

  /**
   * Numeric based rules
   *
   * @type {array}
   */
  numericRules: ['integer', 'numeric'],

  /**
   * Attribute formatter.
   *
   * @type {function}
   */
  attributeFormatter: Attributes.formatter,

  /**
   * Run validator
   *
   * @return {boolean} Whether it passes; true = passes, false = fails
   */
  check: function () {
    var self = this;

    for (var attribute in this.rules) {
      var attributeRules = this.rules[attribute];
      var inputValue = this._objectPath(this.input, attribute);

      if (this._hasRule(attribute, ['sometimes']) && !this._suppliedWithData(attribute)) {
        continue;
      }

      for (var i = 0, len = attributeRules.length, rule, ruleOptions, rulePassed; i < len; i++) {
        ruleOptions = attributeRules[i];
        rule = this.getRule(ruleOptions.name);

        if (!this._isValidatable(rule, inputValue)) {
          continue;
        }

        rulePassed = rule.validate(inputValue, ruleOptions.value, attribute);
        if (!rulePassed) {
          this._addFailure(rule);
        }

        if (this._shouldStopValidating(attribute, rulePassed)) {
          break;
        }
      }
    }

    return this.errorCount === 0;
  },

  /**
   * Run async validator
   *
   * @param {function} passes
   * @param {function} fails
   * @return {void}
   */
  checkAsync: function (passes, fails) {
    var _this = this;
    passes = passes || function () {};
    fails = fails || function () {};

    var failsOne = function (rule, message) {
      _this._addFailure(rule, message);
    };

    var resolvedAll = function (allPassed) {
      if (allPassed) {
        passes();
      } else {
        fails();
      }
    };

    var asyncResolvers = new AsyncResolvers(failsOne, resolvedAll);

    var validateRule = function (inputValue, ruleOptions, attribute, rule) {
      return function () {
        var resolverIndex = asyncResolvers.add(rule);
        rule.validate(inputValue, ruleOptions.value, attribute, function () {
          asyncResolvers.resolve(resolverIndex);
        });
      };
    };

    for (var attribute in this.rules) {
      var attributeRules = this.rules[attribute];
      var inputValue = this._objectPath(this.input, attribute);

      if (this._hasRule(attribute, ['sometimes']) && !this._suppliedWithData(attribute)) {
        continue;
      }

      for (var i = 0, len = attributeRules.length, rule, ruleOptions; i < len; i++) {
        ruleOptions = attributeRules[i];

        rule = this.getRule(ruleOptions.name);

        if (!this._isValidatable(rule, inputValue)) {
          continue;
        }

        validateRule(inputValue, ruleOptions, attribute, rule)();
      }
    }

    asyncResolvers.enableFiring();
    asyncResolvers.fire();
  },

  /**
   * Add failure and error message for given rule
   *
   * @param {Rule} rule
   */
  _addFailure: function (rule) {
    var msg = this.messages.render(rule);
    this.errors.add(rule.attribute, msg);
    this.errorCount++;
  },

  /**
   * Flatten nested object, normalizing { foo: { bar: 1 } } into: { 'foo.bar': 1 }
   *
   * @param  {object} nested object
   * @return {object} flattened object
   */
  _flattenObject: function (obj) {
    var flattened = {};

    function recurse(current, property) {
      if (!property && Object.getOwnPropertyNames(current).length === 0) {
        return;
      }
      if (Object(current) !== current || Array.isArray(current)) {
        flattened[property] = current;
      } else {
        var isEmpty = true;
        for (var p in current) {
          isEmpty = false;
          recurse(current[p], property ? property + '.' + p : p);
        }
        if (isEmpty) {
          flattened[property] = {};
        }
      }
    }
    if (obj) {
      recurse(obj);
    }
    return flattened;
  },

  /**
   * Extract value from nested object using string path with dot notation
   *
   * @param  {object} object to search in
   * @param  {string} path inside object
   * @return {any|void} value under the path
   */
  _objectPath: function (obj, path) {
    if (Object.prototype.hasOwnProperty.call(obj, path)) {
      return obj[path];
    }

    var keys = path.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '').split('.');
    var copy = {};
    for (var attr in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, attr)) {
        copy[attr] = obj[attr];
      }
    }

    for (var i = 0, l = keys.length; i < l; i++) {
      if (typeof copy === 'object' && copy !== null && Object.hasOwnProperty.call(copy, keys[i])) {
        copy = copy[keys[i]];
      } else {
        return;
      }
    }
    return copy;
  },

  /**
   * Parse rules, normalizing format into: { attribute: [{ name: 'age', value: 3 }] }
   *
   * @param  {object} rules
   * @return {object}
   */
  _parseRules: function (rules) {

    var parsedRules = {};
    rules = this._flattenObject(rules);

    for (var attribute in rules) {

      var rulesArray = rules[attribute];

      this._parseRulesCheck(attribute, rulesArray, parsedRules);
    }
    return parsedRules;


  },

  _parseRulesCheck: function (attribute, rulesArray, parsedRules, wildCardValues) {
    if (attribute.indexOf('*') > -1) {
      this._parsedRulesRecurse(attribute, rulesArray, parsedRules, wildCardValues);
    } else {
      this._parseRulesDefault(attribute, rulesArray, parsedRules, wildCardValues);
    }
  },

  _parsedRulesRecurse: function (attribute, rulesArray, parsedRules, wildCardValues) {
    var parentPath = attribute.substr(0, attribute.indexOf('*') - 1);
    var propertyValue = this._objectPath(this.input, parentPath);

    if (propertyValue) {
      for (var propertyNumber = 0; propertyNumber < propertyValue.length; propertyNumber++) {
        var workingValues = wildCardValues ? wildCardValues.slice() : [];
        workingValues.push(propertyNumber);
        this._parseRulesCheck(attribute.replace('*', propertyNumber), rulesArray, parsedRules, workingValues);
      }
    }
  },

  _parseRulesDefault: function (attribute, rulesArray, parsedRules, wildCardValues) {
    var attributeRules = [];

    if (rulesArray instanceof Array) {
      rulesArray = this._prepareRulesArray(rulesArray);
    }

    if (typeof rulesArray === 'string') {
      rulesArray = rulesArray.split('|');
    }

    for (var i = 0, len = rulesArray.length, rule; i < len; i++) {
      rule = typeof rulesArray[i] === 'string' ? this._extractRuleAndRuleValue(rulesArray[i]) : rulesArray[i];
      if (rule.value) {
        rule.value = this._replaceWildCards(rule.value, wildCardValues);
        this._replaceWildCardsMessages(wildCardValues);
      }

      if (Rules.isAsync(rule.name)) {
        this.hasAsync = true;
      }
      attributeRules.push(rule);
    }

    parsedRules[attribute] = attributeRules;
  },

  _replaceWildCards: function (path, nums) {

    if (!nums) {
      return path;
    }

    var path2 = path;
    nums.forEach(function (value) {
      if(Array.isArray(path2)){
        path2 = path2[0];
      }
      pos = path2.indexOf('*');
      if (pos === -1) {
        return path2;
      }
      path2 = path2.substr(0, pos) + value + path2.substr(pos + 1);
    });
    if(Array.isArray(path)){
      path[0] = path2;
      path2 = path;
    }
    return path2;
  },

  _replaceWildCardsMessages: function (nums) {
    var customMessages = this.messages.customMessages;
    var self = this;
    Object.keys(customMessages).forEach(function (key) {
      if (nums) {
        var newKey = self._replaceWildCards(key, nums);
        customMessages[newKey] = customMessages[key];
      }
    });

    this.messages._setCustom(customMessages);
  },
  /**
   * Prepare rules if it comes in Array. Check for objects. Need for type validation.
   *
   * @param  {array} rulesArray
   * @return {array}
   */
  _prepareRulesArray: function (rulesArray) {
    var rules = [];

    for (var i = 0, len = rulesArray.length; i < len; i++) {
      if (typeof rulesArray[i] === 'object') {
        for (var rule in rulesArray[i]) {
          rules.push({
            name: rule,
            value: rulesArray[i][rule]
          });
        }
      } else {
        rules.push(rulesArray[i]);
      }
    }

    return rules;
  },

  /**
   * Determines if the attribute is supplied with the original data object.
   *
   * @param  {array} attribute
   * @return {boolean}
   */
  _suppliedWithData: function (attribute) {
    return this.input.hasOwnProperty(attribute);
  },

  /**
   * Extract a rule and a value from a ruleString (i.e. min:3), rule = min, value = 3
   *
   * @param  {string} ruleString min:3
   * @return {object} object containing the name of the rule and value
   */
  _extractRuleAndRuleValue: function (ruleString) {
    var rule = {},
      ruleArray;

    rule.name = ruleString;

    if (ruleString.indexOf(':') >= 0) {
      ruleArray = ruleString.split(':');
      rule.name = ruleArray[0];
      rule.value = ruleArray.slice(1).join(':');
    }

    return rule;
  },

  /**
   * Determine if attribute has any of the given rules
   *
   * @param  {string}  attribute
   * @param  {array}   findRules
   * @return {boolean}
   */
  _hasRule: function (attribute, findRules) {
    var rules = this.rules[attribute] || [];
    for (var i = 0, len = rules.length; i < len; i++) {
      if (findRules.indexOf(rules[i].name) > -1) {
        return true;
      }
    }
    return false;
  },

  /**
   * Determine if attribute has any numeric-based rules.
   *
   * @param  {string}  attribute
   * @return {Boolean}
   */
  _hasNumericRule: function (attribute) {
    return this._hasRule(attribute, this.numericRules);
  },

  /**
   * Determine if rule is validatable
   *
   * @param  {Rule}   rule
   * @param  {mixed}  value
   * @return {boolean}
   */
  _isValidatable: function (rule, value) {
    if (Rules.isImplicit(rule.name)) {
      return true;
    }

    return this.getRule('required').validate(value);
  },

  /**
   * Determine if we should stop validating.
   *
   * @param  {string} attribute
   * @param  {boolean} rulePassed
   * @return {boolean}
   */
  _shouldStopValidating: function (attribute, rulePassed) {

    var stopOnAttributes = this.stopOnAttributes;
    if (typeof stopOnAttributes === 'undefined' || stopOnAttributes === false || rulePassed === true) {
      return false;
    }

    if (stopOnAttributes instanceof Array) {
      return stopOnAttributes.indexOf(attribute) > -1;
    }

    return true;
  },

  /**
   * Set custom attribute names.
   *
   * @param {object} attributes
   * @return {void}
   */
  setAttributeNames: function (attributes) {
    this.messages._setAttributeNames(attributes);
  },

  /**
   * Set the attribute formatter.
   *
   * @param {fuction} func
   * @return {void}
   */
  setAttributeFormatter: function (func) {
    this.messages._setAttributeFormatter(func);
  },

  /**
   * Get validation rule
   *
   * @param  {string} name
   * @return {Rule}
   */
  getRule: function (name) {
    return Rules.make(name, this);
  },

  /**
   * Stop on first error.
   *
   * @param  {boolean|array} An array of attributes or boolean true/false for all attributes.
   * @return {void}
   */
  stopOnError: function (attributes) {
    this.stopOnAttributes = attributes;
  },

  /**
   * Determine if validation passes
   *
   * @param {function} passes
   * @return {boolean|undefined}
   */
  passes: function (passes) {
    var async = this._checkAsync('passes', passes);
    if (async) {
      return this.checkAsync(passes);
    }
    return this.check();
  },

  /**
   * Determine if validation fails
   *
   * @param {function} fails
   * @return {boolean|undefined}
   */
  fails: function (fails) {
    var async = this._checkAsync('fails', fails);
    if (async) {
      return this.checkAsync(function () {}, fails);
    }
    return !this.check();
  },

  /**
   * Check if validation should be called asynchronously
   *
   * @param  {string}   funcName Name of the caller
   * @param  {function} callback
   * @return {boolean}
   */
  _checkAsync: function (funcName, callback) {
    var hasCallback = typeof callback === 'function';
    if (this.hasAsync && !hasCallback) {
      throw funcName + ' expects a callback when async rules are being tested.';
    }

    return this.hasAsync || hasCallback;
  }

};

/**
 * Set messages for language
 *
 * @param {string} lang
 * @param {object} messages
 * @return {this}
 */
Validator.setMessages = function (lang, messages) {
  Lang._set(lang, messages);
  return this;
};

/**
 * Get messages for given language
 *
 * @param  {string} lang
 * @return {Messages}
 */
Validator.getMessages = function (lang) {
  return Lang._get(lang);
};

/**
 * Set default language to use
 *
 * @param {string} lang
 * @return {void}
 */
Validator.useLang = function (lang) {
  this.prototype.lang = lang;
};

/**
 * Get default language
 *
 * @return {string}
 */
Validator.getDefaultLang = function () {
  return this.prototype.lang;
};

/**
 * Set the attribute formatter.
 *
 * @param {fuction} func
 * @return {void}
 */
Validator.setAttributeFormatter = function (func) {
  this.prototype.attributeFormatter = func;
};

/**
 * Stop on first error.
 *
 * @param  {boolean|array} An array of attributes or boolean true/false for all attributes.
 * @return {void}
 */
Validator.stopOnError = function (attributes) {
  this.prototype.stopOnAttributes = attributes;
};

/**
 * Register custom validation rule
 *
 * @param  {string}   name
 * @param  {function} fn
 * @param  {string}   message
 * @return {void}
 */
Validator.register = function (name, fn, message) {
  var lang = Validator.getDefaultLang();
  Rules.register(name, fn);
  Lang._setRuleMessage(lang, name, message);
};

/**
 * Register custom validation rule
 *
 * @param  {string}   name
 * @param  {function} fn
 * @param  {string}   message
 * @return {void}
 */
Validator.registerImplicit = function (name, fn, message) {
  var lang = Validator.getDefaultLang();
  Rules.registerImplicit(name, fn);
  Lang._setRuleMessage(lang, name, message);
};

/**
 * Register asynchronous validation rule
 *
 * @param  {string}   name
 * @param  {function} fn
 * @param  {string}   message
 * @return {void}
 */
Validator.registerAsync = function (name, fn, message) {
  var lang = Validator.getDefaultLang();
  Rules.registerAsync(name, fn);
  Lang._setRuleMessage(lang, name, message);
};

/**
 * Register asynchronous validation rule
 *
 * @param  {string}   name
 * @param  {function} fn
 * @param  {string}   message
 * @return {void}
 */
Validator.registerAsyncImplicit = function (name, fn, message) {
  var lang = Validator.getDefaultLang();
  Rules.registerAsyncImplicit(name, fn);
  Lang._setRuleMessage(lang, name, message);
};

/**
 * Register validator for missed validation rule
 *
 * @param  {string}   name
 * @param  {function} fn
 * @param  {string}   message
 * @return {void}
 */
Validator.registerMissedRuleValidator = function(fn, message) {
  Rules.registerMissedRuleValidator(fn, message);
};

module.exports = Validator;


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/general/file-upload.vue?vue&type=template&id=def9890e&scoped=true&lang=pug&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/vue/components/general/file-upload.vue?vue&type=template&id=def9890e&scoped=true&lang=pug& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("input", {
      ref: "fileInput",
      staticClass: "is-hidden",
      attrs: { type: "file", multiple: "" },
      on: { change: _vm.addAttachment }
    }),
    _c(
      "button",
      {
        staticClass: "button is-success",
        on: {
          click: function($event) {
            return _vm.showFileUpload()
          }
        }
      },
      [_c("i", { staticClass: "fa fa-plus" }, [_vm._v("افزودن فایل")])]
    ),
    _c("div", [
      _c(
        "ul",
        _vm._l(_vm.fileList, function(file, index) {
          return _c("li", { staticStyle: { dir: "ltr" } }, [
            _c(
              "button",
              {
                staticClass: "button is-danger",
                on: {
                  click: function($event) {
                    $event.preventDefault()
                    return _vm.removeFile(file)
                  }
                }
              },
              [_vm._v("×")]
            ),
            _c("label", [_vm._v(_vm._s(_vm.humanFileSize(file.file.size)))]),
            _c("label", [_vm._v(_vm._s(file.file.originalname))])
          ])
        }),
        0
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/general/loading.vue?vue&type=template&id=8a8bd07a&scoped=true&lang=pug&":
/*!***************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/vue/components/general/loading.vue?vue&type=template&id=8a8bd07a&scoped=true&lang=pug& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "columns is-vcentered" }, [
      _c("div", { staticClass: "column" }, [_vm._v("LOADING . . .")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/general/notification.vue?vue&type=template&id=2a7e2974&scoped=true&lang=pug&":
/*!********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/vue/components/general/notification.vue?vue&type=template&id=2a7e2974&scoped=true&lang=pug& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "notification", class: _vm.notificationType },
    [
      _c("button", {
        staticClass: "delete",
        on: {
          click: function($event) {
            $event.preventDefault()
            return _vm.closeNotifiaction($event)
          }
        }
      }),
      _vm._t("default")
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/user/edit-user.vue?vue&type=template&id=70ab62a8&scoped=true&lang=pug&":
/*!**************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/vue/components/user/edit-user.vue?vue&type=template&id=70ab62a8&scoped=true&lang=pug& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "container" },
    [
      _c("pre", [_vm._v(_vm._s(_vm.userData))]),
      _vm.showNotification
        ? _c(
            "notification",
            {
              attrs: { "notification-type": _vm.notificationType },
              on: { "on-close": _vm.closeNotification }
            },
            [
              _c("span", {
                domProps: { innerHTML: _vm._s(_vm.notificationMessage) }
              })
            ]
          )
        : _vm._e(),
      _c("div", { staticClass: "columns is-vcentered" }, [
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.isLoadingMode,
                expression: "isLoadingMode"
              }
            ],
            staticClass: "column is-full"
          },
          [_c("h1", [_vm._v("در حال بارگذاری")])]
        ),
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: !_vm.isLoadingMode,
                expression: "! isLoadingMode"
              }
            ],
            staticClass: "column is-full form-small"
          },
          [
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label" }, [_vm._v("نام کاربری")]),
              _c("div", { staticClass: "control" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.userData.name,
                      expression: "userData.name"
                    }
                  ],
                  staticClass: "input",
                  attrs: {
                    type: "text",
                    placeholder: "نام کاربری",
                    autofocus: "",
                    required: ""
                  },
                  domProps: { value: _vm.userData.name },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.userData, "name", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label" }, [_vm._v("پست الکترونیک")]),
              _c("div", { staticClass: "control" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.userData.email,
                      expression: "userData.email"
                    }
                  ],
                  staticClass: "input",
                  attrs: {
                    type: "email",
                    placeholder: "پست الکترونیک",
                    required: ""
                  },
                  domProps: { value: _vm.userData.email },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.userData, "email", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label" }, [_vm._v("گذر واژه")]),
              _c("div", { staticClass: "control" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.userData.password,
                      expression: "userData.password"
                    }
                  ],
                  staticClass: "input",
                  attrs: {
                    type: "password",
                    placeholder: "گذر واژه",
                    required: ""
                  },
                  domProps: { value: _vm.userData.password },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.userData, "password", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label" }, [_vm._v("تایید گذر واژه")]),
              _c("div", { staticClass: "control" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.userData.password_confirmation,
                      expression: "userData.password_confirmation"
                    }
                  ],
                  staticClass: "input",
                  attrs: {
                    type: "password",
                    placeholder: "تایید گذر واژه",
                    required: ""
                  },
                  domProps: { value: _vm.userData.password_confirmation },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(
                        _vm.userData,
                        "password_confirmation",
                        $event.target.value
                      )
                    }
                  }
                })
              ])
            ]),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label" }, [_vm._v("نام")]),
              _c("div", { staticClass: "control" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.userData.firstName,
                      expression: "userData.firstName"
                    }
                  ],
                  staticClass: "input",
                  attrs: { type: "text", placeholder: "نام", required: "" },
                  domProps: { value: _vm.userData.firstName },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.userData, "firstName", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label" }, [_vm._v("نام خانوادگی")]),
              _c("div", { staticClass: "control" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.userData.lastName,
                      expression: "userData.lastName"
                    }
                  ],
                  staticClass: "input",
                  attrs: {
                    type: "text",
                    placeholder: "نام خانوادگی",
                    required: ""
                  },
                  domProps: { value: _vm.userData.lastName },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.userData, "lastName", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label" }, [_vm._v("کد ملی")]),
              _c("div", { staticClass: "control" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.userData.nationCode,
                      expression: "userData.nationCode"
                    }
                  ],
                  staticClass: "input",
                  attrs: { type: "text", placeholder: "کد ملی", required: "" },
                  domProps: { value: _vm.userData.nationCode },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.userData, "nationCode", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label" }, [_vm._v("شماره موبایل")]),
              _c("div", { staticClass: "control" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.userData.cellphone,
                      expression: "userData.cellphone"
                    }
                  ],
                  staticClass: "input",
                  attrs: {
                    type: "text",
                    placeholder: "شماره موبایل",
                    required: ""
                  },
                  domProps: { value: _vm.userData.cellphone },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.userData, "cellphone", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _c("fieldset", [
              _c("legend", [_vm._v("فایل های ضمیمه")]),
              _c(
                "div",
                { staticClass: "field" },
                [
                  _c("file-upload", {
                    ref: "fileUpload",
                    attrs: { "old-files": _vm.oldFiles }
                  })
                ],
                1
              )
            ]),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label" }),
              _c("div", { staticClass: "control" }, [
                _c("div", { staticClass: "select is-primary" }, [
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.userData.role_group_group,
                          expression: "userData.role_group_group"
                        }
                      ],
                      on: {
                        change: function($event) {
                          var $$selectedVal = Array.prototype.filter
                            .call($event.target.options, function(o) {
                              return o.selected
                            })
                            .map(function(o) {
                              var val = "_value" in o ? o._value : o.value
                              return val
                            })
                          _vm.$set(
                            _vm.userData,
                            "role_group_group",
                            $event.target.multiple
                              ? $$selectedVal
                              : $$selectedVal[0]
                          )
                        }
                      }
                    },
                    _vm._l(_vm.departments, function(
                      department,
                      departmentIndex
                    ) {
                      return _c(
                        "option",
                        { domProps: { value: department._id } },
                        [_vm._v(_vm._s(department.title))]
                      )
                    }),
                    0
                  )
                ])
              ])
            ]),
            _c(
              "div",
              { staticClass: "field" },
              _vm._l(_vm.roles, function(role, roleIndex) {
                return _c("label", { staticClass: "checkbox" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.userData.role_group_role,
                        expression: "userData.role_group_role"
                      }
                    ],
                    attrs: { type: "checkbox", name: role._id },
                    domProps: {
                      value: role._id,
                      checked: Array.isArray(_vm.userData.role_group_role)
                        ? _vm._i(_vm.userData.role_group_role, role._id) > -1
                        : _vm.userData.role_group_role
                    },
                    on: {
                      change: function($event) {
                        var $$a = _vm.userData.role_group_role,
                          $$el = $event.target,
                          $$c = $$el.checked ? true : false
                        if (Array.isArray($$a)) {
                          var $$v = role._id,
                            $$i = _vm._i($$a, $$v)
                          if ($$el.checked) {
                            $$i < 0 &&
                              _vm.$set(
                                _vm.userData,
                                "role_group_role",
                                $$a.concat([$$v])
                              )
                          } else {
                            $$i > -1 &&
                              _vm.$set(
                                _vm.userData,
                                "role_group_role",
                                $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                              )
                          }
                        } else {
                          _vm.$set(_vm.userData, "role_group_role", $$c)
                        }
                      }
                    }
                  }),
                  _vm._v("  " + _vm._s(role.name))
                ])
              }),
              0
            ),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "checkbox" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.userData.isActive,
                      expression: "userData.isActive"
                    }
                  ],
                  attrs: { type: "checkbox" },
                  domProps: {
                    checked: Array.isArray(_vm.userData.isActive)
                      ? _vm._i(_vm.userData.isActive, null) > -1
                      : _vm.userData.isActive
                  },
                  on: {
                    change: function($event) {
                      var $$a = _vm.userData.isActive,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 &&
                            _vm.$set(
                              _vm.userData,
                              "isActive",
                              $$a.concat([$$v])
                            )
                        } else {
                          $$i > -1 &&
                            _vm.$set(
                              _vm.userData,
                              "isActive",
                              $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                            )
                        }
                      } else {
                        _vm.$set(_vm.userData, "isActive", $$c)
                      }
                    }
                  }
                }),
                _vm._v("  فعال")
              ])
            ]),
            _c("div", { staticClass: "field is-grouped" }, [
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: !_vm.isLoadingMode,
                      expression: "! isLoadingMode"
                    }
                  ],
                  staticClass: "control"
                },
                [
                  _c(
                    "a",
                    {
                      staticClass: "button is-link is-rounded",
                      attrs: { href: "#" },
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          return _vm.commandClick(_vm.ENUMS.COMMAND.SAVE)
                        }
                      }
                    },
                    [_vm._v("  ویرایش")]
                  )
                ]
              )
            ])
          ]
        )
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/user/list-user.vue?vue&type=template&id=44a6b298&scoped=true&lang=pug&":
/*!**************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/vue/components/user/list-user.vue?vue&type=template&id=44a6b298&scoped=true&lang=pug& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "container-child" },
    [
      !_vm.hasUsers ? _c("h1", [_vm._v("کاربری ثبت نام نکرده!")]) : _vm._e(),
      _vm.hasUsers
        ? _c(
            "table",
            { staticClass: "table is-striped is-hoverable is-fullwidth" },
            [
              _vm._m(0),
              _c(
                "tbody",
                _vm._l(_vm.users, function(user) {
                  return _c("tr", { key: user.id }, [
                    _c("td", [_vm._v(_vm._s(user.name))]),
                    _c("td", [_vm._v(_vm._s(user.email))]),
                    _c("td", [
                      _vm._v(
                        _vm._s(user.profile.first_name) +
                          " " +
                          _vm._s(user.profile.last_name)
                      )
                    ]),
                    _c("td", [_vm._v(_vm._s(user.profile.nation_code))]),
                    _c("td", [_vm._v(_vm._s(user.cellphone))]),
                    user.is_active ? _c("td", [_vm._v("فعال")]) : _vm._e(),
                    !user.is_active ? _c("td", [_vm._v("غیر فعال")]) : _vm._e(),
                    _c("td", [
                      _vm._v(_vm._s(_vm.toPersianDate(user.createdAt)))
                    ]),
                    _c("td", { staticClass: "function-links" }, [
                      _c(
                        "a",
                        {
                          staticClass: "button is-primary is-rounded",
                          attrs: { href: "#" },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.commandClick(
                                _vm.ENUMS.COMMAND.EDIT,
                                user
                              )
                            }
                          }
                        },
                        [_vm._m(1, true), _c("span", [_vm._v("ویرایش")])]
                      ),
                      _c(
                        "a",
                        {
                          staticClass: "button is-warning is-rounded mt-2",
                          attrs: { href: "#" },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.commandClick(
                                _vm.ENUMS.COMMAND.SHOW,
                                user
                              )
                            }
                          }
                        },
                        [_vm._m(2, true), _c("span", [_vm._v("مشاهده")])]
                      )
                    ])
                  ])
                }),
                0
              )
            ]
          )
        : _vm._e(),
      _c("paginate", {
        attrs: {
          "page-count": _vm.pageCount,
          "click-handler": _vm.paginatorClick,
          "prev-text": "Prev",
          "next-text": "Next",
          "container-class": "pagination-list"
        }
      })
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", [_vm._v("نام کاربری")]),
        _c("th", [_vm._v("پست الکترونیک")]),
        _c("th", [_vm._v("نام و نام خانوادگی")]),
        _c("th", [_vm._v("کد ملی")]),
        _c("th", [_vm._v("شماره موبایل")]),
        _c("th", [_vm._v("وضعیت")]),
        _c("th", [_vm._v("تاریخ ثبت نام")]),
        _c("th", [_vm._v("عملیات")])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "icon is-small" }, [
      _c("i", { staticClass: "material-icons icon" }, [_vm._v("check_circle")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "icon is-small" }, [
      _c("i", { staticClass: "material-icons icon" }, [
        _vm._v("swap_horizontal_circle")
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/user/register-user.vue?vue&type=template&id=5c690733&scoped=true&lang=pug&":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/vue/components/user/register-user.vue?vue&type=template&id=5c690733&scoped=true&lang=pug& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "container-child" },
    [
      _vm.showNotification
        ? _c(
            "notification",
            {
              attrs: { "notification-type": _vm.notificationType },
              on: { "on-close": _vm.closeNotification }
            },
            [
              _c("span", {
                domProps: { innerHTML: _vm._s(_vm.notificationMessage) }
              })
            ]
          )
        : _vm._e(),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.isLoadingMode,
              expression: "isLoadingMode"
            }
          ],
          staticClass: "column is-full"
        },
        [_c("h1", [_vm._v("در حال بارگذاری")])]
      ),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: !_vm.isLoadingMode,
              expression: "! isLoadingMode"
            }
          ],
          staticClass: "form-small"
        },
        [
          _c("div", { staticClass: "field" }, [
            _c("label", { staticClass: "label" }, [_vm._v("نام کاربری")]),
            _c("div", { staticClass: "control" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.userData.name,
                    expression: "userData.name"
                  }
                ],
                staticClass: "input",
                attrs: {
                  type: "text",
                  placeholder: "نام کاربری",
                  autofocus: "",
                  required: ""
                },
                domProps: { value: _vm.userData.name },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.userData, "name", $event.target.value)
                  }
                }
              })
            ])
          ]),
          _c("div", { staticClass: "field" }, [
            _c("label", { staticClass: "label" }, [_vm._v("پست الکترونیک")]),
            _c("div", { staticClass: "control" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.userData.email,
                    expression: "userData.email"
                  }
                ],
                staticClass: "input",
                attrs: {
                  type: "email",
                  placeholder: "پست الکترونیک",
                  required: ""
                },
                domProps: { value: _vm.userData.email },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.userData, "email", $event.target.value)
                  }
                }
              })
            ])
          ]),
          _c("div", { staticClass: "field" }, [
            _c("label", { staticClass: "label" }, [_vm._v("گذر واژه")]),
            _c("div", { staticClass: "control" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.userData.password,
                    expression: "userData.password"
                  }
                ],
                staticClass: "input",
                attrs: {
                  type: "password",
                  placeholder: "گذر واژه",
                  required: ""
                },
                domProps: { value: _vm.userData.password },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.userData, "password", $event.target.value)
                  }
                }
              })
            ])
          ]),
          _c("div", { staticClass: "field" }, [
            _c("label", { staticClass: "label" }, [_vm._v("تایید گذر واژه")]),
            _c("div", { staticClass: "control" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.userData.password_confirmation,
                    expression: "userData.password_confirmation"
                  }
                ],
                staticClass: "input",
                attrs: {
                  type: "password",
                  placeholder: "تایید گذر واژه",
                  required: ""
                },
                domProps: { value: _vm.userData.password_confirmation },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(
                      _vm.userData,
                      "password_confirmation",
                      $event.target.value
                    )
                  }
                }
              })
            ])
          ]),
          _c("div", { staticClass: "field" }, [
            _c("label", { staticClass: "label" }, [_vm._v("نام")]),
            _c("div", { staticClass: "control" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.userData.firstName,
                    expression: "userData.firstName"
                  }
                ],
                staticClass: "input",
                attrs: { type: "text", placeholder: "نام", required: "" },
                domProps: { value: _vm.userData.firstName },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.userData, "firstName", $event.target.value)
                  }
                }
              })
            ])
          ]),
          _c("div", { staticClass: "field" }, [
            _c("label", { staticClass: "label" }, [_vm._v("نام خانوادگی")]),
            _c("div", { staticClass: "control" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.userData.lastName,
                    expression: "userData.lastName"
                  }
                ],
                staticClass: "input",
                attrs: {
                  type: "text",
                  placeholder: "نام خانوادگی",
                  required: ""
                },
                domProps: { value: _vm.userData.lastName },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.userData, "lastName", $event.target.value)
                  }
                }
              })
            ])
          ]),
          _c("div", { staticClass: "field" }, [
            _c("label", { staticClass: "label" }, [_vm._v("کد ملی")]),
            _c("div", { staticClass: "control" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.userData.nationCode,
                    expression: "userData.nationCode"
                  }
                ],
                staticClass: "input",
                attrs: { type: "text", placeholder: "کد ملی", required: "" },
                domProps: { value: _vm.userData.nationCode },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.userData, "nationCode", $event.target.value)
                  }
                }
              })
            ])
          ]),
          _c("div", { staticClass: "field" }, [
            _c("label", { staticClass: "label" }, [_vm._v("شماره موبایل")]),
            _c("div", { staticClass: "control" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.userData.cellphone,
                    expression: "userData.cellphone"
                  }
                ],
                staticClass: "input",
                attrs: {
                  type: "text",
                  placeholder: "شماره موبایل",
                  required: ""
                },
                domProps: { value: _vm.userData.cellphone },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.userData, "cellphone", $event.target.value)
                  }
                }
              })
            ])
          ]),
          _c("fieldset", [
            _c("legend", [_vm._v("فایل های ضمیمه")]),
            _c(
              "div",
              { staticClass: "field" },
              [
                _c("file-upload", {
                  ref: "fileUpload",
                  attrs: { "old-files": _vm.oldFiles }
                })
              ],
              1
            )
          ]),
          _c("div", { staticClass: "field" }, [
            _c("label", { staticClass: "label" }),
            _c("div", { staticClass: "control" }, [
              _c("div", { staticClass: "select is-primary" }, [
                _c(
                  "select",
                  {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.userData.role_group_group,
                        expression: "userData.role_group_group"
                      }
                    ],
                    on: {
                      change: function($event) {
                        var $$selectedVal = Array.prototype.filter
                          .call($event.target.options, function(o) {
                            return o.selected
                          })
                          .map(function(o) {
                            var val = "_value" in o ? o._value : o.value
                            return val
                          })
                        _vm.$set(
                          _vm.userData,
                          "role_group_group",
                          $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        )
                      }
                    }
                  },
                  _vm._l(_vm.departments, function(
                    department,
                    departmentIndex
                  ) {
                    return _c(
                      "option",
                      { domProps: { value: department._id } },
                      [_vm._v(_vm._s(department.title))]
                    )
                  }),
                  0
                )
              ])
            ])
          ]),
          _c(
            "div",
            { staticClass: "field" },
            _vm._l(_vm.roles, function(role, roleIndex) {
              return _c("label", { staticClass: "checkbox" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.userData.role_group_role,
                      expression: "userData.role_group_role"
                    }
                  ],
                  attrs: { type: "checkbox", name: role._id },
                  domProps: {
                    value: role._id,
                    checked: Array.isArray(_vm.userData.role_group_role)
                      ? _vm._i(_vm.userData.role_group_role, role._id) > -1
                      : _vm.userData.role_group_role
                  },
                  on: {
                    change: function($event) {
                      var $$a = _vm.userData.role_group_role,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = role._id,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 &&
                            _vm.$set(
                              _vm.userData,
                              "role_group_role",
                              $$a.concat([$$v])
                            )
                        } else {
                          $$i > -1 &&
                            _vm.$set(
                              _vm.userData,
                              "role_group_role",
                              $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                            )
                        }
                      } else {
                        _vm.$set(_vm.userData, "role_group_role", $$c)
                      }
                    }
                  }
                }),
                _vm._v("  " + _vm._s(role.name))
              ])
            }),
            0
          ),
          _c("div", { staticClass: "field" }, [
            _c("label", { staticClass: "checkbox" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.userData.isActive,
                    expression: "userData.isActive"
                  }
                ],
                attrs: { type: "checkbox" },
                domProps: {
                  checked: Array.isArray(_vm.userData.isActive)
                    ? _vm._i(_vm.userData.isActive, null) > -1
                    : _vm.userData.isActive
                },
                on: {
                  change: function($event) {
                    var $$a = _vm.userData.isActive,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 &&
                          _vm.$set(_vm.userData, "isActive", $$a.concat([$$v]))
                      } else {
                        $$i > -1 &&
                          _vm.$set(
                            _vm.userData,
                            "isActive",
                            $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                          )
                      }
                    } else {
                      _vm.$set(_vm.userData, "isActive", $$c)
                    }
                  }
                }
              }),
              _vm._v("  فعال")
            ])
          ]),
          _c("div", { staticClass: "field is-grouped" }, [
            _c(
              "div",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: !_vm.isLoadingMode,
                    expression: "! isLoadingMode"
                  }
                ],
                staticClass: "control"
              },
              [
                _c(
                  "a",
                  {
                    staticClass: "button is-link is-rounded",
                    attrs: { href: "#" },
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        return _vm.commandClick(_vm.ENUMS.COMMAND.SAVE)
                      }
                    }
                  },
                  [_vm._v("  ثبت نام")]
                )
              ]
            )
          ])
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/user/show-user.vue?vue&type=template&id=4bd3c319&lang=pug&":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/vue/components/user/show-user.vue?vue&type=template&id=4bd3c319&lang=pug& ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container" }, [
    _c("div", { staticClass: "columns is-vcentered" }, [
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.isLoadingMode,
              expression: "isLoadingMode"
            }
          ],
          staticClass: "column is-full"
        },
        [_c("h1", [_vm._v("در حال بارگذاری")])]
      ),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: !_vm.isLoadingMode,
              expression: "! isLoadingMode"
            }
          ],
          staticClass: "column is-full"
        },
        [
          _c("div", { staticClass: "info-card" }, [
            _c("div", { staticClass: "info-card-title" }, [
              _vm._v(_vm._s(_vm.userData.name))
            ]),
            _c("div", { staticClass: "info-card-details" }, [
              _c("div", { staticClass: "info-card-item" }, [
                _c("div", { staticClass: "info-card-label" }, [
                  _vm._v("نام و نام خانوادگی:")
                ]),
                _c("div", { staticClass: "info-card-value" }, [
                  _vm._v(
                    _vm._s(_vm.userData.firstName) +
                      " " +
                      _vm._s(_vm.userData.lastName)
                  )
                ])
              ])
            ])
          ])
        ]
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/user/users.vue?vue&type=template&id=6d7ced06&scoped=true&lang=pug&":
/*!**********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/vue/components/user/users.vue?vue&type=template&id=6d7ced06&scoped=true&lang=pug& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container-parent" }, [
    _c(
      "section",
      { staticClass: "hero" },
      [
        _vm.showNotification
          ? _c(
              "notification",
              {
                attrs: { "notification-type": _vm.notificationType },
                on: { "on-close": _vm.closeNotification }
              },
              [
                _c("span", {
                  domProps: { innerHTML: _vm._s(_vm.notificationMessage) }
                })
              ]
            )
          : _vm._e(),
        _c("div", { staticClass: "container page-header" }, [
          _c("div", { staticClass: "title" }, [
            _c(
              "h1",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.modeList,
                    expression: "modeList"
                  }
                ]
              },
              [_vm._v("کاربران")]
            ),
            _c(
              "h1",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.modeRegister,
                    expression: "modeRegister"
                  }
                ]
              },
              [_vm._v("ثبت نام کاربر جدید")]
            ),
            _c(
              "h1",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.modeEdit,
                    expression: "modeEdit"
                  }
                ]
              },
              [_vm._v("ویرایش کاربر")]
            )
          ])
        ])
      ],
      1
    ),
    _c(
      "div",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: !_vm.modeLoading,
            expression: "!modeLoading"
          }
        ],
        staticClass: "columns exposed-form"
      },
      [
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.modeList,
                expression: "modeList"
              }
            ],
            staticClass: "column is-one-fifth"
          },
          [
            _c(
              "a",
              {
                staticClass: "button is-primary is-rounded",
                attrs: { href: "#" },
                on: {
                  click: function($event) {
                    $event.preventDefault()
                    return _vm.commandClick(_vm.ENUMS.COMMAND.NEW)
                  }
                }
              },
              [_vm._m(0), _c("span", [_vm._v("ثبت نام")])]
            )
          ]
        ),
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: !_vm.modeList,
                expression: "!modeList"
              }
            ],
            staticClass: "column is-one-fifth"
          },
          [
            _c(
              "a",
              {
                staticClass: "button is-warning is-rounded",
                attrs: { href: "#" },
                on: {
                  click: function($event) {
                    $event.preventDefault()
                    return _vm.commandClick(_vm.ENUMS.COMMAND.CANCEL)
                  }
                }
              },
              [_vm._m(1), _c("span", [_vm._v("بازگشت")])]
            )
          ]
        )
      ]
    ),
    _c("div", { staticClass: "columns is-vcentered" }, [
      _vm.modeLoading
        ? _c("div", { staticClass: "column" }, [_c("loading")], 1)
        : _vm._e(),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: !_vm.modeLoading && _vm.modeList,
              expression: "!modeLoading && modeList"
            }
          ],
          staticClass: "column"
        },
        [
          _c("list-user", {
            ref: "userList",
            attrs: { "list-url": _vm.listUrl },
            on: { "on-command": _vm.onCommand }
          })
        ],
        1
      ),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: !_vm.modeLoading && _vm.modeRegister,
              expression: "!modeLoading && modeRegister"
            }
          ],
          staticClass: "column"
        },
        [
          _c("register-user", {
            attrs: {
              "register-url": _vm.registerUrl,
              "departments-url": _vm.departmentsUrl,
              "roles-url": _vm.rolesUrl
            },
            on: {
              "on-command": _vm.onCommand,
              "on-register": _vm.onUserRegister
            }
          })
        ],
        1
      ),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: !_vm.modeLoading && _vm.modeEdit,
              expression: "!modeLoading && modeEdit"
            }
          ],
          staticClass: "column"
        },
        [
          _c("edit-user", {
            ref: "userEdit",
            attrs: {
              "edit-url": _vm.editUrl,
              "departments-url": _vm.departmentsUrl,
              "roles-url": _vm.rolesUrl
            },
            on: { "on-command": _vm.onCommand, "on-update": _vm.onUserUpdate }
          })
        ],
        1
      ),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: !_vm.modeLoading && _vm.modeShow,
              expression: "!modeLoading && modeShow"
            }
          ],
          staticClass: "column"
        },
        [
          _c("show-user", {
            ref: "userShow",
            on: { "on-command": _vm.onCommand }
          })
        ],
        1
      )
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "icon is-small" }, [
      _c("i", { staticClass: "material-icons icon" }, [_vm._v("check_circle")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "icon is-small" }, [
      _c("i", { staticClass: "material-icons icon" }, [_vm._v("check_circle")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/vuejs-paginate/dist/index.js":
/*!***************************************************!*\
  !*** ./node_modules/vuejs-paginate/dist/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():undefined}(this,function(){return function(e){function t(s){if(n[s])return n[s].exports;var a=n[s]={exports:{},id:s,loaded:!1};return e[s].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}var a=n(1),i=s(a);e.exports=i.default},function(e,t,n){n(2);var s=n(6)(n(7),n(8),"data-v-82963a40",null);e.exports=s.exports},function(e,t,n){var s=n(3);"string"==typeof s&&(s=[[e.id,s,""]]);n(5)(s,{});s.locals&&(e.exports=s.locals)},function(e,t,n){t=e.exports=n(4)(),t.push([e.id,"a[data-v-82963a40]{cursor:pointer}",""])},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var s={},a=0;a<this.length;a++){var i=this[a][0];"number"==typeof i&&(s[i]=!0)}for(a=0;a<t.length;a++){var r=t[a];"number"==typeof r[0]&&s[r[0]]||(n&&!r[2]?r[2]=n:n&&(r[2]="("+r[2]+") and ("+n+")"),e.push(r))}},e}},function(e,t,n){function s(e,t){for(var n=0;n<e.length;n++){var s=e[n],a=c[s.id];if(a){a.refs++;for(var i=0;i<a.parts.length;i++)a.parts[i](s.parts[i]);for(;i<s.parts.length;i++)a.parts.push(l(s.parts[i],t))}else{for(var r=[],i=0;i<s.parts.length;i++)r.push(l(s.parts[i],t));c[s.id]={id:s.id,refs:1,parts:r}}}}function a(e){for(var t=[],n={},s=0;s<e.length;s++){var a=e[s],i=a[0],r=a[1],o=a[2],l=a[3],u={css:r,media:o,sourceMap:l};n[i]?n[i].parts.push(u):t.push(n[i]={id:i,parts:[u]})}return t}function i(e,t){var n=g(),s=C[C.length-1];if("top"===e.insertAt)s?s.nextSibling?n.insertBefore(t,s.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),C.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function r(e){e.parentNode.removeChild(e);var t=C.indexOf(e);t>=0&&C.splice(t,1)}function o(e){var t=document.createElement("style");return t.type="text/css",i(e,t),t}function l(e,t){var n,s,a;if(t.singleton){var i=v++;n=h||(h=o(t)),s=u.bind(null,n,i,!1),a=u.bind(null,n,i,!0)}else n=o(t),s=d.bind(null,n),a=function(){r(n)};return s(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;s(e=t)}else a()}}function u(e,t,n,s){var a=n?"":s.css;if(e.styleSheet)e.styleSheet.cssText=b(t,a);else{var i=document.createTextNode(a),r=e.childNodes;r[t]&&e.removeChild(r[t]),r.length?e.insertBefore(i,r[t]):e.appendChild(i)}}function d(e,t){var n=t.css,s=t.media,a=t.sourceMap;if(s&&e.setAttribute("media",s),a&&(n+="\n/*# sourceURL="+a.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var c={},p=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},f=p(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),g=p(function(){return document.head||document.getElementsByTagName("head")[0]}),h=null,v=0,C=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=f()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var n=a(e);return s(n,t),function(e){for(var i=[],r=0;r<n.length;r++){var o=n[r],l=c[o.id];l.refs--,i.push(l)}if(e){var u=a(e);s(u,t)}for(var r=0;r<i.length;r++){var l=i[r];if(0===l.refs){for(var d=0;d<l.parts.length;d++)l.parts[d]();delete c[l.id]}}}};var b=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t){e.exports=function(e,t,n,s){var a,i=e=e||{},r=typeof e.default;"object"!==r&&"function"!==r||(a=e,i=e.default);var o="function"==typeof i?i.options:i;if(t&&(o.render=t.render,o.staticRenderFns=t.staticRenderFns),n&&(o._scopeId=n),s){var l=o.computed||(o.computed={});Object.keys(s).forEach(function(e){var t=s[e];l[e]=function(){return t}})}return{esModule:a,exports:i,options:o}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{value:{type:Number},pageCount:{type:Number,required:!0},forcePage:{type:Number},clickHandler:{type:Function,default:function(){}},pageRange:{type:Number,default:3},marginPages:{type:Number,default:1},prevText:{type:String,default:"Prev"},nextText:{type:String,default:"Next"},breakViewText:{type:String,default:"…"},containerClass:{type:String},pageClass:{type:String},pageLinkClass:{type:String},prevClass:{type:String},prevLinkClass:{type:String},nextClass:{type:String},nextLinkClass:{type:String},breakViewClass:{type:String},breakViewLinkClass:{type:String},activeClass:{type:String,default:"active"},disabledClass:{type:String,default:"disabled"},noLiSurround:{type:Boolean,default:!1},firstLastButton:{type:Boolean,default:!1},firstButtonText:{type:String,default:"First"},lastButtonText:{type:String,default:"Last"},hidePrevNext:{type:Boolean,default:!1}},beforeUpdate:function(){void 0!==this.forcePage&&this.forcePage!==this.selected&&(this.selected=this.forcePage)},computed:{selected:{get:function(){return this.value||this.innerValue},set:function(e){this.innerValue=e}},pages:function(){var e=this,t={};if(this.pageCount<=this.pageRange)for(var n=0;n<this.pageCount;n++){var s={index:n,content:n+1,selected:n===this.selected-1};t[n]=s}else{for(var a=Math.floor(this.pageRange/2),i=function(n){var s={index:n,content:n+1,selected:n===e.selected-1};t[n]=s},r=function(e){var n={disabled:!0,breakView:!0};t[e]=n},o=0;o<this.marginPages;o++)i(o);var l=0;this.selected-a>0&&(l=this.selected-1-a);var u=l+this.pageRange-1;u>=this.pageCount&&(u=this.pageCount-1,l=u-this.pageRange+1);for(var d=l;d<=u&&d<=this.pageCount-1;d++)i(d);l>this.marginPages&&r(l-1),u+1<this.pageCount-this.marginPages&&r(u+1);for(var c=this.pageCount-1;c>=this.pageCount-this.marginPages;c--)i(c)}return t}},data:function(){return{innerValue:1}},methods:{handlePageSelected:function(e){this.selected!==e&&(this.innerValue=e,this.$emit("input",e),this.clickHandler(e))},prevPage:function(){this.selected<=1||this.handlePageSelected(this.selected-1)},nextPage:function(){this.selected>=this.pageCount||this.handlePageSelected(this.selected+1)},firstPageSelected:function(){return 1===this.selected},lastPageSelected:function(){return this.selected===this.pageCount||0===this.pageCount},selectFirstPage:function(){this.selected<=1||this.handlePageSelected(1)},selectLastPage:function(){this.selected>=this.pageCount||this.handlePageSelected(this.pageCount)}}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.noLiSurround?n("div",{class:e.containerClass},[e.firstLastButton?n("a",{class:[e.pageLinkClass,e.firstPageSelected()?e.disabledClass:""],attrs:{tabindex:"0"},domProps:{innerHTML:e._s(e.firstButtonText)},on:{click:function(t){e.selectFirstPage()},keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13)?void e.selectFirstPage():null}}}):e._e(),e._v(" "),e.firstPageSelected()&&e.hidePrevNext?e._e():n("a",{class:[e.prevLinkClass,e.firstPageSelected()?e.disabledClass:""],attrs:{tabindex:"0"},domProps:{innerHTML:e._s(e.prevText)},on:{click:function(t){e.prevPage()},keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13)?void e.prevPage():null}}}),e._v(" "),e._l(e.pages,function(t){return[t.breakView?n("a",{class:[e.pageLinkClass,e.breakViewLinkClass,t.disabled?e.disabledClass:""],attrs:{tabindex:"0"}},[e._t("breakViewContent",[e._v(e._s(e.breakViewText))])],2):t.disabled?n("a",{class:[e.pageLinkClass,t.selected?e.activeClass:"",e.disabledClass],attrs:{tabindex:"0"}},[e._v(e._s(t.content))]):n("a",{class:[e.pageLinkClass,t.selected?e.activeClass:""],attrs:{tabindex:"0"},on:{click:function(n){e.handlePageSelected(t.index+1)},keyup:function(n){return"button"in n||!e._k(n.keyCode,"enter",13)?void e.handlePageSelected(t.index+1):null}}},[e._v(e._s(t.content))])]}),e._v(" "),e.lastPageSelected()&&e.hidePrevNext?e._e():n("a",{class:[e.nextLinkClass,e.lastPageSelected()?e.disabledClass:""],attrs:{tabindex:"0"},domProps:{innerHTML:e._s(e.nextText)},on:{click:function(t){e.nextPage()},keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13)?void e.nextPage():null}}}),e._v(" "),e.firstLastButton?n("a",{class:[e.pageLinkClass,e.lastPageSelected()?e.disabledClass:""],attrs:{tabindex:"0"},domProps:{innerHTML:e._s(e.lastButtonText)},on:{click:function(t){e.selectLastPage()},keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13)?void e.selectLastPage():null}}}):e._e()],2):n("ul",{class:e.containerClass},[e.firstLastButton?n("li",{class:[e.pageClass,e.firstPageSelected()?e.disabledClass:""]},[n("a",{class:e.pageLinkClass,attrs:{tabindex:e.firstPageSelected()?-1:0},domProps:{innerHTML:e._s(e.firstButtonText)},on:{click:function(t){e.selectFirstPage()},keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13)?void e.selectFirstPage():null}}})]):e._e(),e._v(" "),e.firstPageSelected()&&e.hidePrevNext?e._e():n("li",{class:[e.prevClass,e.firstPageSelected()?e.disabledClass:""]},[n("a",{class:e.prevLinkClass,attrs:{tabindex:e.firstPageSelected()?-1:0},domProps:{innerHTML:e._s(e.prevText)},on:{click:function(t){e.prevPage()},keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13)?void e.prevPage():null}}})]),e._v(" "),e._l(e.pages,function(t){return n("li",{class:[e.pageClass,t.selected?e.activeClass:"",t.disabled?e.disabledClass:"",t.breakView?e.breakViewClass:""]},[t.breakView?n("a",{class:[e.pageLinkClass,e.breakViewLinkClass],attrs:{tabindex:"0"}},[e._t("breakViewContent",[e._v(e._s(e.breakViewText))])],2):t.disabled?n("a",{class:e.pageLinkClass,attrs:{tabindex:"0"}},[e._v(e._s(t.content))]):n("a",{class:e.pageLinkClass,attrs:{tabindex:"0"},on:{click:function(n){e.handlePageSelected(t.index+1)},keyup:function(n){return"button"in n||!e._k(n.keyCode,"enter",13)?void e.handlePageSelected(t.index+1):null}}},[e._v(e._s(t.content))])])}),e._v(" "),e.lastPageSelected()&&e.hidePrevNext?e._e():n("li",{class:[e.nextClass,e.lastPageSelected()?e.disabledClass:""]},[n("a",{class:e.nextLinkClass,attrs:{tabindex:e.lastPageSelected()?-1:0},domProps:{innerHTML:e._s(e.nextText)},on:{click:function(t){e.nextPage()},keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13)?void e.nextPage():null}}})]),e._v(" "),e.firstLastButton?n("li",{class:[e.pageClass,e.lastPageSelected()?e.disabledClass:""]},[n("a",{class:e.pageLinkClass,attrs:{tabindex:e.lastPageSelected()?-1:0},domProps:{innerHTML:e._s(e.lastButtonText)},on:{click:function(t){e.selectLastPage()},keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13)?void e.selectLastPage():null}}})]):e._e()],2)},staticRenderFns:[]}}])});

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./resources/configs/routes.json":
/*!***************************************!*\
  !*** ./resources/configs/routes.json ***!
  \***************************************/
/*! exports provided: base_url, routes, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"base_url\":\"https://localhost:8000\",\"routes\":{\"gql\":{\"method\":\"post\",\"url\":\"/gql\"},\"login\":{\"method\":\"post\",\"url\":\"/auth\"}}}");

/***/ }),

/***/ "./resources/js/core/routes.js":
/*!*************************************!*\
  !*** ./resources/js/core/routes.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! CONFIGS/routes.json */ "./resources/configs/routes.json"),
    base_url = _require.base_url,
    routes = _require.routes;
/**
 * Routes module
 */


function RoutesModule() {}

module.exports = RoutesModule;
/**
 * Routes json data
 */

RoutesModule.baseUrl = base_url;
RoutesModule.routes = routes;
/**
 * Get routes
 */

RoutesModule.route = function route(name) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var route = RoutesModule.routes[name];
  var url = "".concat(RoutesModule.baseUrl).concat(route.url || '');
  /* Apply parameters */
  // Object.keys(params)
  //     .forEach(key => {
  //         let keyName = `:${key}:
  //     });

  return {
    url: url,
    method: route.method
  };
};

/***/ }),

/***/ "./resources/js/helpers/axios-helper.js":
/*!**********************************************!*\
  !*** ./resources/js/helpers/axios-helper.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Axios Helper class
 */

function AxiosHelper() {}

module.exports = AxiosHelper;
/**
 * To GraphQL object
 */

AxiosHelper.toGQL = function toGQL() {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var variables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return {
    query: query,
    variables: variables
  };
};
/**
 * Send ajax request
 */


AxiosHelper.send = function send(method, url) {
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var options = arguments.length > 3 ? arguments[3] : undefined;

  var FormData = __webpack_require__(/*! form-data */ "./node_modules/form-data/lib/browser.js");

  var postData;
  data = data || {};
  /* Setup options */

  options = _.merge({
    headers: [],
    useCookie: true,
    sendAsFormData: false,
    filesArray: null
  }, options);
  /* Check form-data flag */

  if (true == options.sendAsFormData) {
    /* Setup form-data */
    var formData = new FormData();
    /* Set new data */

    Object.keys(data).forEach(function (key) {
      var itemData = data[key];

      if (itemData == null) {
        return;
      }
      /* Add array of files */


      if (options.filesArray == key) {
        for (var i = 0; i < itemData.length; ++i) {
          var file = itemData[i];
          formData.append(key, file);
        }

        ;
      }
      /* Add object */
      else {
          if (Array.isArray(itemData)) {
            itemData = JSON.stringify(itemData);
          }

          formData.append(key, itemData);
        }
    });
    postData = formData;
    /* Setup header */

    options.headers['content-type'] = 'multipart/form-data';
  } else {
    postData = data;

    if (options.jsonRequest || true) {
      options.headers['content-type'] = 'application/json';
    }
  }

  var config = {
    method: method,
    withCredentials: options.useCookie,
    baseURL: options.baseURL,
    headers: options.headers
  };

  if (null != postData.getHeaders) {
    config['headers'] = postData.getHeaders();
  }
  /* Add CSRF token */


  var csrf = options.csrfToken || (document.querySelector('meta[name="csrf-token"]') || {
    content: ''
  }).content;
  axios.defaults.headers.common['X-CSRF-TOKEN'] = options.headers['x-xsrf-token'] = options.headers['x-csrf-token'] = options.headers['xsrf-token'] = options.headers['csrf-token'] = csrf;
  /* Add bearer token */

  if (null != options.token) {
    config.headers['authorization'] = "Bearer ".concat(options.token);
  }
  /* Create axios instance */


  var instance = axios.create(config);
  return instance[method](url, postData);
};
/* Add standard restful request types */


var types = ['get', 'head', 'post', 'patch', 'put', 'options', 'link'];
types.forEach(function (type) {
  AxiosHelper[type] = function send(method, url, data, options) {
    return AxiosHelper.send(type, method, url, data, options);
  };
});

/***/ }),

/***/ "./resources/js/helpers/enums.js":
/*!***************************************!*\
  !*** ./resources/js/helpers/enums.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Class enums
 */

function Enums() {}

module.exports = Enums;
/**
 * ENUM Commands
 */

Enums.COMMAND = {
  NEW: 1,
  EDIT: 2,
  DELETE: 3,
  SAVE: 4,
  CANCEL: 5,
  SHOW: 6,
  NEWSESSION: 7,
  SEMIEDIT: 8
};
/**
 * ENUM Form-Modes
 */

Enums.FORM_MODE = {
  LOADING: 1,
  LIST: 2,
  REGISTER: 3,
  EDIT: 4,
  REMOVE: 5,
  SHOW: 6,
  NEWSESSION: 7,
  SEMIEDIT: 8
};

/***/ }),

/***/ "./resources/js/pages/user/index/index.js":
/*!************************************************!*\
  !*** ./resources/js/pages/user/index/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * UserIndexPage class
 */

var UserIndexPage = function UserIndexPage() {};

module.exports = UserIndexPage;
/**
 * Boot method
 */

UserIndexPage.boot = function () {
  UserIndexPage.initVue();
};
/**
 * Init vue
 */


UserIndexPage.initVue = function () {
  var Users = __webpack_require__(/*! VUE-COMPONENTS/user/users.vue */ "./resources/js/vue/components/user/users.vue")["default"];

  window.v = new Vue({
    el: '#app',
    components: {
      Users: Users
    },
    data: {}
  });
};
/* Boot */


UserIndexPage.boot();

/***/ }),

/***/ "./resources/js/validators/base-validator.js":
/*!***************************************************!*\
  !*** ./resources/js/validators/base-validator.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Validator = __webpack_require__(/*! validatorjs */ "./node_modules/validatorjs/src/validator.js");
/**
 * DataValidator class
 */


function DataValidator() {}

module.exports = DataValidator;
/**
 * Load custom rules
 */

DataValidator.loadCustomRules = function loadCustomRules() {
  __webpack_require__(/*! JS-VALIDATORS/rules/custom-rules */ "./resources/js/validators/rules/custom-rules.js");
};
/**
 * Validate
 */


DataValidator.validate = function validate(data, rules, options) {
  options = options || {};
  var lang = options.lang || 'en';
  var messages = options.messages || {};
  var attributes = options.attributes || {};
  /* Set validator language */

  Validator.useLang(lang);
  /* Make a new instance */

  var validator = new Validator(data, rules, messages);
  /* Set attribute name */

  var attributeNames = {};
  Object.keys(attributes).forEach(function (key) {
    return attributeNames[key] = attributes[key];
  });
  validator.setAttributeNames(attributes);
  /* Validate */

  var passes = validator.passes();
  return {
    passes: passes,
    validator: validator
  };
};
/* Load custom rules */


DataValidator.loadCustomRules();

/***/ }),

/***/ "./resources/js/validators/rules/custom-rules.js":
/*!*******************************************************!*\
  !*** ./resources/js/validators/rules/custom-rules.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Validator = __webpack_require__(/*! validatorjs */ "./node_modules/validatorjs/src/validator.js");

Validator.register('cellphone', function (value, requirement, attribute) {
  return ('' + value).toString().match(/(09\d{9})|(\+989\d{9})/);
}, 'شماره همراه باید با فرمت درست مانند (09121234567) باشد.');
Validator.register('nationCode', function (value, requirement, attribute) {
  return ('' + value).toString().match(/^\d{10}/);
}, 'کد ملی را 10 رقم و به صورت دقیق وارد نمایید.');

/***/ }),

/***/ "./resources/js/validators/user-register-validator.js":
/*!************************************************************!*\
  !*** ./resources/js/validators/user-register-validator.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * User Register Validator
 */

function UserRegisterValidator() {}

module.exports = UserRegisterValidator;
/**
 * Validation funciton
 */

UserRegisterValidator.validate = function validate(data) {
  var BaseValidator = __webpack_require__(/*! JS-VALIDATORS/base-validator */ "./resources/js/validators/base-validator.js");

  var rules = {
    name: 'required|min:3|max:25',
    email: 'required|email',
    password: 'required|min:6|confirmed',
    firstName: 'required',
    lastName: 'required',
    nationCode: 'required|nationCode',
    cellphone: 'required|cellphone'
  };
  var options = {
    lang: "fa",
    attributes: {
      name: 'نام کاربری',
      email: 'پست الکترونیک',
      password: 'گذرواژه',
      firstName: 'نام',
      lastName: 'نام خانوادگی',
      nationCode: 'کد ملی',
      cellphone: 'شماره موبایل'
    }
  };
  return BaseValidator.validate(data, rules, options);
};
/**
 * Validation edit funciton
 */


UserRegisterValidator.validateEdit = function validateEdit(data) {
  var BaseValidator = __webpack_require__(/*! JS-VALIDATORS/base-validator */ "./resources/js/validators/base-validator.js");

  var rules = {
    name: 'required|min:3|max:25',
    email: 'required|email',
    password: 'confirmed',
    firstName: 'required',
    lastName: 'required',
    nationCode: 'required|nationCode',
    cellphone: 'required|cellphone'
  };
  var options = {
    lang: "fa",
    attributes: {
      name: 'نام کاربری',
      email: 'پست الکترونیک',
      password: 'گذرواژه',
      firstName: 'نام',
      lastName: 'نام خانوادگی',
      nationCode: 'کد ملی',
      cellphone: 'شماره موبایل'
    }
  };
  return BaseValidator.validate(data, rules, options);
};

/***/ }),

/***/ "./resources/js/vue/components/general/file-upload.vue":
/*!*************************************************************!*\
  !*** ./resources/js/vue/components/general/file-upload.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _file_upload_vue_vue_type_template_id_def9890e_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file-upload.vue?vue&type=template&id=def9890e&scoped=true&lang=pug& */ "./resources/js/vue/components/general/file-upload.vue?vue&type=template&id=def9890e&scoped=true&lang=pug&");
/* harmony import */ var _file_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./file-upload.vue?vue&type=script&lang=js& */ "./resources/js/vue/components/general/file-upload.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _file_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _file_upload_vue_vue_type_template_id_def9890e_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__["render"],
  _file_upload_vue_vue_type_template_id_def9890e_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "def9890e",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/vue/components/general/file-upload.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/vue/components/general/file-upload.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/vue/components/general/file-upload.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_file_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./file-upload.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/general/file-upload.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_file_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/vue/components/general/file-upload.vue?vue&type=template&id=def9890e&scoped=true&lang=pug&":
/*!*****************************************************************************************************************!*\
  !*** ./resources/js/vue/components/general/file-upload.vue?vue&type=template&id=def9890e&scoped=true&lang=pug& ***!
  \*****************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_file_upload_vue_vue_type_template_id_def9890e_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/pug-plain-loader!../../../../../node_modules/vue-loader/lib??vue-loader-options!./file-upload.vue?vue&type=template&id=def9890e&scoped=true&lang=pug& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/general/file-upload.vue?vue&type=template&id=def9890e&scoped=true&lang=pug&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_file_upload_vue_vue_type_template_id_def9890e_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_file_upload_vue_vue_type_template_id_def9890e_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/vue/components/general/loading.vue":
/*!*********************************************************!*\
  !*** ./resources/js/vue/components/general/loading.vue ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _loading_vue_vue_type_template_id_8a8bd07a_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loading.vue?vue&type=template&id=8a8bd07a&scoped=true&lang=pug& */ "./resources/js/vue/components/general/loading.vue?vue&type=template&id=8a8bd07a&scoped=true&lang=pug&");
/* harmony import */ var _loading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loading.vue?vue&type=script&lang=js& */ "./resources/js/vue/components/general/loading.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _loading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _loading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _loading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _loading_vue_vue_type_template_id_8a8bd07a_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__["render"],
  _loading_vue_vue_type_template_id_8a8bd07a_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "8a8bd07a",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/vue/components/general/loading.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/vue/components/general/loading.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/vue/components/general/loading.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_loading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./loading.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/general/loading.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_loading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_loading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_loading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_loading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_loading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/vue/components/general/loading.vue?vue&type=template&id=8a8bd07a&scoped=true&lang=pug&":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/vue/components/general/loading.vue?vue&type=template&id=8a8bd07a&scoped=true&lang=pug& ***!
  \*************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_loading_vue_vue_type_template_id_8a8bd07a_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/pug-plain-loader!../../../../../node_modules/vue-loader/lib??vue-loader-options!./loading.vue?vue&type=template&id=8a8bd07a&scoped=true&lang=pug& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/general/loading.vue?vue&type=template&id=8a8bd07a&scoped=true&lang=pug&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_loading_vue_vue_type_template_id_8a8bd07a_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_loading_vue_vue_type_template_id_8a8bd07a_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/vue/components/general/notification.vue":
/*!**************************************************************!*\
  !*** ./resources/js/vue/components/general/notification.vue ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _notification_vue_vue_type_template_id_2a7e2974_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notification.vue?vue&type=template&id=2a7e2974&scoped=true&lang=pug& */ "./resources/js/vue/components/general/notification.vue?vue&type=template&id=2a7e2974&scoped=true&lang=pug&");
/* harmony import */ var _notification_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notification.vue?vue&type=script&lang=js& */ "./resources/js/vue/components/general/notification.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _notification_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _notification_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _notification_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _notification_vue_vue_type_template_id_2a7e2974_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__["render"],
  _notification_vue_vue_type_template_id_2a7e2974_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "2a7e2974",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/vue/components/general/notification.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/vue/components/general/notification.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/vue/components/general/notification.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_notification_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./notification.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/general/notification.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_notification_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_notification_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_notification_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_notification_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_notification_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/vue/components/general/notification.vue?vue&type=template&id=2a7e2974&scoped=true&lang=pug&":
/*!******************************************************************************************************************!*\
  !*** ./resources/js/vue/components/general/notification.vue?vue&type=template&id=2a7e2974&scoped=true&lang=pug& ***!
  \******************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_notification_vue_vue_type_template_id_2a7e2974_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/pug-plain-loader!../../../../../node_modules/vue-loader/lib??vue-loader-options!./notification.vue?vue&type=template&id=2a7e2974&scoped=true&lang=pug& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/general/notification.vue?vue&type=template&id=2a7e2974&scoped=true&lang=pug&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_notification_vue_vue_type_template_id_2a7e2974_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_notification_vue_vue_type_template_id_2a7e2974_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/vue/components/user/edit-user.vue":
/*!********************************************************!*\
  !*** ./resources/js/vue/components/user/edit-user.vue ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _edit_user_vue_vue_type_template_id_70ab62a8_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./edit-user.vue?vue&type=template&id=70ab62a8&scoped=true&lang=pug& */ "./resources/js/vue/components/user/edit-user.vue?vue&type=template&id=70ab62a8&scoped=true&lang=pug&");
/* harmony import */ var _edit_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit-user.vue?vue&type=script&lang=js& */ "./resources/js/vue/components/user/edit-user.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _edit_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _edit_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _edit_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _edit_user_vue_vue_type_template_id_70ab62a8_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__["render"],
  _edit_user_vue_vue_type_template_id_70ab62a8_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "70ab62a8",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/vue/components/user/edit-user.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/vue/components/user/edit-user.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/vue/components/user/edit-user.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./edit-user.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/user/edit-user.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/vue/components/user/edit-user.vue?vue&type=template&id=70ab62a8&scoped=true&lang=pug&":
/*!************************************************************************************************************!*\
  !*** ./resources/js/vue/components/user/edit-user.vue?vue&type=template&id=70ab62a8&scoped=true&lang=pug& ***!
  \************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_user_vue_vue_type_template_id_70ab62a8_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/pug-plain-loader!../../../../../node_modules/vue-loader/lib??vue-loader-options!./edit-user.vue?vue&type=template&id=70ab62a8&scoped=true&lang=pug& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/user/edit-user.vue?vue&type=template&id=70ab62a8&scoped=true&lang=pug&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_user_vue_vue_type_template_id_70ab62a8_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_user_vue_vue_type_template_id_70ab62a8_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/vue/components/user/list-user.vue":
/*!********************************************************!*\
  !*** ./resources/js/vue/components/user/list-user.vue ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _list_user_vue_vue_type_template_id_44a6b298_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list-user.vue?vue&type=template&id=44a6b298&scoped=true&lang=pug& */ "./resources/js/vue/components/user/list-user.vue?vue&type=template&id=44a6b298&scoped=true&lang=pug&");
/* harmony import */ var _list_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list-user.vue?vue&type=script&lang=js& */ "./resources/js/vue/components/user/list-user.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _list_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _list_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _list_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _list_user_vue_vue_type_template_id_44a6b298_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__["render"],
  _list_user_vue_vue_type_template_id_44a6b298_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "44a6b298",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/vue/components/user/list-user.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/vue/components/user/list-user.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/vue/components/user/list-user.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_list_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./list-user.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/user/list-user.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_list_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_list_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_list_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_list_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_list_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/vue/components/user/list-user.vue?vue&type=template&id=44a6b298&scoped=true&lang=pug&":
/*!************************************************************************************************************!*\
  !*** ./resources/js/vue/components/user/list-user.vue?vue&type=template&id=44a6b298&scoped=true&lang=pug& ***!
  \************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_list_user_vue_vue_type_template_id_44a6b298_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/pug-plain-loader!../../../../../node_modules/vue-loader/lib??vue-loader-options!./list-user.vue?vue&type=template&id=44a6b298&scoped=true&lang=pug& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/user/list-user.vue?vue&type=template&id=44a6b298&scoped=true&lang=pug&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_list_user_vue_vue_type_template_id_44a6b298_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_list_user_vue_vue_type_template_id_44a6b298_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/vue/components/user/register-user.vue":
/*!************************************************************!*\
  !*** ./resources/js/vue/components/user/register-user.vue ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _register_user_vue_vue_type_template_id_5c690733_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./register-user.vue?vue&type=template&id=5c690733&scoped=true&lang=pug& */ "./resources/js/vue/components/user/register-user.vue?vue&type=template&id=5c690733&scoped=true&lang=pug&");
/* harmony import */ var _register_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./register-user.vue?vue&type=script&lang=js& */ "./resources/js/vue/components/user/register-user.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _register_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _register_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _register_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _register_user_vue_vue_type_template_id_5c690733_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__["render"],
  _register_user_vue_vue_type_template_id_5c690733_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "5c690733",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/vue/components/user/register-user.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/vue/components/user/register-user.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/vue/components/user/register-user.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_register_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./register-user.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/user/register-user.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_register_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_register_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_register_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_register_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_register_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/vue/components/user/register-user.vue?vue&type=template&id=5c690733&scoped=true&lang=pug&":
/*!****************************************************************************************************************!*\
  !*** ./resources/js/vue/components/user/register-user.vue?vue&type=template&id=5c690733&scoped=true&lang=pug& ***!
  \****************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_register_user_vue_vue_type_template_id_5c690733_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/pug-plain-loader!../../../../../node_modules/vue-loader/lib??vue-loader-options!./register-user.vue?vue&type=template&id=5c690733&scoped=true&lang=pug& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/user/register-user.vue?vue&type=template&id=5c690733&scoped=true&lang=pug&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_register_user_vue_vue_type_template_id_5c690733_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_register_user_vue_vue_type_template_id_5c690733_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/vue/components/user/show-user.vue":
/*!********************************************************!*\
  !*** ./resources/js/vue/components/user/show-user.vue ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _show_user_vue_vue_type_template_id_4bd3c319_lang_pug___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./show-user.vue?vue&type=template&id=4bd3c319&lang=pug& */ "./resources/js/vue/components/user/show-user.vue?vue&type=template&id=4bd3c319&lang=pug&");
/* harmony import */ var _show_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./show-user.vue?vue&type=script&lang=js& */ "./resources/js/vue/components/user/show-user.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _show_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _show_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _show_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _show_user_vue_vue_type_template_id_4bd3c319_lang_pug___WEBPACK_IMPORTED_MODULE_0__["render"],
  _show_user_vue_vue_type_template_id_4bd3c319_lang_pug___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/vue/components/user/show-user.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/vue/components/user/show-user.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/vue/components/user/show-user.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_show_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./show-user.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/user/show-user.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_show_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_show_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_show_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_show_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_show_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/vue/components/user/show-user.vue?vue&type=template&id=4bd3c319&lang=pug&":
/*!************************************************************************************************!*\
  !*** ./resources/js/vue/components/user/show-user.vue?vue&type=template&id=4bd3c319&lang=pug& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_show_user_vue_vue_type_template_id_4bd3c319_lang_pug___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/pug-plain-loader!../../../../../node_modules/vue-loader/lib??vue-loader-options!./show-user.vue?vue&type=template&id=4bd3c319&lang=pug& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/user/show-user.vue?vue&type=template&id=4bd3c319&lang=pug&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_show_user_vue_vue_type_template_id_4bd3c319_lang_pug___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_show_user_vue_vue_type_template_id_4bd3c319_lang_pug___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/vue/components/user/users.vue":
/*!****************************************************!*\
  !*** ./resources/js/vue/components/user/users.vue ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _users_vue_vue_type_template_id_6d7ced06_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./users.vue?vue&type=template&id=6d7ced06&scoped=true&lang=pug& */ "./resources/js/vue/components/user/users.vue?vue&type=template&id=6d7ced06&scoped=true&lang=pug&");
/* harmony import */ var _users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./users.vue?vue&type=script&lang=js& */ "./resources/js/vue/components/user/users.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _users_vue_vue_type_template_id_6d7ced06_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__["render"],
  _users_vue_vue_type_template_id_6d7ced06_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "6d7ced06",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/vue/components/user/users.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/vue/components/user/users.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/vue/components/user/users.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./users.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/user/users.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/vue/components/user/users.vue?vue&type=template&id=6d7ced06&scoped=true&lang=pug&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/vue/components/user/users.vue?vue&type=template&id=6d7ced06&scoped=true&lang=pug& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_users_vue_vue_type_template_id_6d7ced06_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/pug-plain-loader!../../../../../node_modules/vue-loader/lib??vue-loader-options!./users.vue?vue&type=template&id=6d7ced06&scoped=true&lang=pug& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/components/user/users.vue?vue&type=template&id=6d7ced06&scoped=true&lang=pug&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_users_vue_vue_type_template_id_6d7ced06_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_users_vue_vue_type_template_id_6d7ced06_scoped_true_lang_pug___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 18:
/*!******************************************************!*\
  !*** multi ./resources/js/pages/user/index/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/sources/hemmatnode/resources/js/pages/user/index/index.js */"./resources/js/pages/user/index/index.js");


/***/ })

/******/ });