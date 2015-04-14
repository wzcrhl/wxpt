package com.haier.wxpt.yqfw.service;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.haier.wxpt.yqfw.vo.TestVo;

/**
 * Service
 * @date Apr 14, 201512:43:39 PM
 * @author WZC
 */
public class TestServiceImpl extends BaseService{
	
	
	@SuppressWarnings("unchecked")
	public List<TestVo> getList() throws Exception{
		Session session = this.getSession();
		try{
		    Transaction tx = session.beginTransaction();
		    Query query = session.createQuery("from TestVo order by id asc");
		    List<TestVo> list = query.list();
		    tx.commit();
		    if(list != null && list.size() > 0)
		    	return list;
		}catch(Exception e){
			throw e;
		}finally{
			session.close();
		}
		return null;
	}
	
	
	public boolean addTestVo(TestVo testVo) throws Exception{
		if(testVo == null)
			throw new Exception();
	    Session session = this.getSession();
		try{
		    Transaction tx = session.beginTransaction();
		    session.save(testVo);
		    tx.commit();
		}catch(Exception e){
			throw e;
		}finally{
			session.close();
		}

		return false;
	}
}
