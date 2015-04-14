package com.haier.wxpt.yqfw.service;

import org.hibernate.Session;

import com.haier.wxpt.yqfw.Init;

public class BaseService {
	
	public Session getSession(){
		return Init.dbSessionFactory.openSession();
	}

}
