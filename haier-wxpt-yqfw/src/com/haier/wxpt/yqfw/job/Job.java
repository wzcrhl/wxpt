package com.haier.wxpt.yqfw.job;

import java.text.ParseException;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.quartz.CronTrigger;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SchedulerFactory;
import org.quartz.impl.StdSchedulerFactory;

import com.haier.wxpt.yqfw.Init;

public class Job {
	static SchedulerFactory schedulerFactory = new StdSchedulerFactory();
	static Logger log = Logger.getLogger(Job.class);
	
	public static void createJob(String jobName,String jobCron,String className){
		createJob(jobName,Init.JOBNAME,jobCron,className);
	}
	
	
	public static void createJob(String jobName, String jobGroup,String jobCron,String className){
		if(StringUtils.isEmpty(jobName) || StringUtils.isEmpty(jobCron) || StringUtils.isEmpty(className) ){
			log.warn("JOB启动失败，原因：必填参数为空");
			return;
		}
			
		CronTrigger appClassifyTrigger = new CronTrigger();
		try {
			log.debug("启动JOB:"+jobName+",轮询周期:" + jobCron);
			appClassifyTrigger.setCronExpression(jobCron);
			appClassifyTrigger.setName(jobName);
			appClassifyTrigger.setGroup(jobGroup);
			
			Scheduler sched= schedulerFactory.getScheduler();
			sched.start();
			JobDetail deviceJobDetail = new JobDetail(jobName, jobGroup,Class.forName(className));
			sched.scheduleJob(deviceJobDetail, appClassifyTrigger);
			
		} catch (ParseException e) {
			log.error("JOB启动失败");
			log.error(e.getMessage(),e);
		} catch (SchedulerException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}
}
