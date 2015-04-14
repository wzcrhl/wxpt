
SET FOREIGN_KEY_CHECKS=0;
drop database if exists `haier_wxpt_yqfw`;
create database `haier_wxpt_yqfw` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
use haier_wxpt_yqfw;

-- 测试表
DROP TABLE IF EXISTS `wxpt_test`;
CREATE TABLE `wxpt_test` (
 `id` varchar(36) NOT NULL COMMENT '主键',
 `temp` varchar(50) NOT NULL COMMENT '测试字段',
 PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='测试';



