package com.haier.wxpt.yqfw.job;

import org.apache.log4j.Logger;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;


/**
 * 分类应用定时更新线程
 * @author wzc
 */
public class TestJob implements Job  {
	
	Logger log = Logger.getLogger(TestJob.class);
	

	public void execute(JobExecutionContext arg0) throws JobExecutionException{
		log.debug("Into TestJob...");
	}
}

