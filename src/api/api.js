import http from "./http";
//登录
export const loginApi = (data) => http.post("/weighing/login", data);
//退出登录
export const logoutApi = (data) => http.get("/weighing/logout", data);
//获取头部名字信息
export const getHomeTitleApi = () =>
  http.get("/weighing/homepage/getHomeTitle");

//首页统计
export const getCountApi = () => http.get("/weighing/homepage/getCount");
//首页列表
export const getHomeViolateListApi = (data) =>
  http.get("/weighing/violate/getViolateList", data);
//获取全天违章曲线图数据
export const violateByHourApi = () =>
  http.get("/weighing/homepage/violateByHour");
//获取监控点故障
export const getMonitorExceptionApi = () =>
  http.get("/weighing/homepage/getMonitorException");
//获取坐标
export const monitorPointAPi = () => http.get("/weighing/monitor/monitorPoint");
//获取饼图数据
export const violateByCarApi = () =>
  http.get("/weighing/homepage/violateByCar");
//获取条形图数据
export const violateByAreaApi = () =>
  http.get("/weighing/homepage/violateByArea");

//违章选择器查询
export const getOptionsApi = (data) =>
  http.get("/weighing/sysTrans/getOptions", data);
//获取违章车辆信息
export const getViolateListApi = (data) =>
  http.get("/weighing/violate/getViolateList", data);
//处理待审核数据
export const getviolateVerifyApi = (data) =>
  http.get("/weighing/violate/violateVerify", data);
//删除无效数据
export const getclearRecordApi = (data) =>
  http.get(`/weighing/violate/clearRecord/${data.violateId}`);
//导出违章excel
export const getexportApi = (data) =>
  http.get("/weighing/violate/export", data);

//获取所有车辆信息
export const getVehicleListApi = (data) =>
  http.get("/weighing/vehicle/getVehicleList", data);
// 查看监测点详情信息
export const queryCameraListApi = (data) =>
  http.get("/weighing/camera/queryCameraList", data);
//获取监控信息
export const getLastestCarApi = (data) =>
  http.get("/weighing/vehicle/getLastestCar", data);
//获取监控视频
export const querySrsConfApi = (data) =>
  http.get("/weighing/realtimevideo/querySrsConf", data);

//修改用户信息
export const modifySelfApi = (data) =>
  http.post("/weighing/user/modifySelf", data);
//修改用户密码
export const resetPasswordApi = (data) =>
  http.post("/weighing/user/resetPassword", data);
//获取用户数据
export const queryUsersApi = (data) =>
  http.get("/weighing/user/queryUsers", data);
//获取所有角色
export const getRoleListApl = (data) =>
  http.get("/weighing/role/getRoleList", data);
//添加用户
export const addUserApi = (data) => http.post("/weighing/user/addUser", data);
//修改用户
export const modifyUserApi = (data) =>
  http.post("/weighing/user/modifyUser", data);
//修改用户状态和删除用户
export const deleteUserApi = (data) =>
  http.post(`/weighing/user/deleteUser/${data.id}/${data.state}`);
//密码重置
export const updatePasswordApi = (data) =>
  http.post("/weighing/user/updatePassword", data);

//获取角色信息
export const getRolesApi = (data) => http.get("/weighing/role/getRoles", data);
//获取所有权限
export const getPermissionAllApi = () =>
  http.get("/weighing/permission/getPermissionAll");
//添加角色
export const addRoleApi = (data) => http.post("/weighing/role/addRole", data);
//删除角色
export const deleteRoleApi = (id) =>
  http.post(`/weighing/role/deleteRole/${id}`);
//编辑用户时获取角色对应权限
export const getPermissionListApi = (data) =>
  http.get("/weighing/permission/getPermissionList", data);
//修改角色信息
export const updateRoleApi = (data) =>
  http.post("/weighing/role/updateRole", data);

//获取led屏幕信息
export const selectLedToListApi = (data) =>
  http.get("/weighing/led/selectLedToList", data);
//led添加
export const insertLedApi = (data) =>
  http.post("/weighing/led/insertLed", data);
//led修改
export const updateLedApi = (data) =>
  http.post("/weighing/led/updateLed", data);
//修改led停用启用
export const updateStatusApi = (data) =>
  http.post("/weighing/led/updateStatus", data);
//删除led
export const deleteLedApi = (id) => http.post(`/weighing/led/deleteLed/${id}`);

//获取监测点信息
export const selectMonitorApi = (data) =>
  http.get("/weighing/monitor/selectMonitor", data);
//添加监测点信息
export const addMonitorApi = (data) =>
  http.post("/weighing/monitor/addMonitor", data);
//修改监测点信息
export const updateMonitorApi = (data) =>
  http.post("/weighing/monitor/updateMonitor", data);
//查询监测点摄像头信息
export const selectCameraApi = (data) =>
  http.get("/weighing/camera/selectCamera", data);
//修改监测点启动或禁用还有删除
export const deleMonitorApi = (data) =>
  http.post(`/weighing/monitor/deleMonitor/${data.id}/${data.state}`);
//添加监测点摄像头
export const addCameraApi = (data) =>
  http.post("/weighing/camera/addCamera", data);
//修改监测点摄像头信息
export const updateCameraApi = (data) =>
  http.post("/weighing/camera/updateCamera", data);
//修改监测点启动或禁用还有删除
export const deleteCameraApi = (data) =>
  http.post(`/weighing/camera/deleteCamera/${data.id}/${data.state}`);

//获取超载标准配置信息
export const getlistApi = (data) =>
  http.get("/weighing/approved_load/getlist", data);
//设置超载标准
export const configApi = (data) =>
  http.get("/weighing/approved_load/config", data);

//获取日志
export const selectSystemlogApi = (data) =>
  http.get("/weighing/systemlog/selectSystemlog", data);

//根据年份获取画图数据
export const getViolateCountByMonthApi = (data) =>
  http.get("/weighing/report/getViolateCountByMonth", data);
//根据年份获取饼图数据
export const getViolateCountByYearApi = (data) =>
  http.get("/weighing/report/getViolateCountByYear", data);

//根据id获取违章详情
export const getViolateDetailApi = (data) =>
  http.get("/weighing/violate/getViolateDetail", data);
//根据id查询违章历史记录
export const getViolatehistoryListApi = (data) =>
  http.get("/weighing/violate/getViolateList", data);
//纠正违章车牌号
export const getViolateUpdateLicensePlate = (data) =>
  http.get("/weighing/violate/updateLicensePlate", data);

//根据id获取所有车辆详情
export const vehicleDetailApi = (data) =>
  http.get("/weighing/vehicle/vehicleDetail", data);

//获取用户个人信息
export const queryUserByUserNoApi = () =>
  http.get("/weighing/user/queryUserByUserNo");
