package com.haier.wxpt.yqfw.web;

import java.io.File;
import java.io.InputStream;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.dom4j.Document;

import com.haier.wxpt.yqfw.Init;
import com.haier.wxpt.yqfw.service.TestServiceImpl;
import com.haier.wxpt.yqfw.util.MiniTemplator;
import com.haier.wxpt.yqfw.util.XmlUtil;
import com.haier.wxpt.yqfw.vo.TestVo;

/**
 * WebAction
 * @date Apr 14, 20151:10:38 PM
 * @author WZC
 */
public class YqfwAction extends HttpServlet {
	static Logger log = Logger.getLogger(YqfwAction.class);

	public static final String ACTION_GETGENERALINFO = "getGeneralInfo";
	public static final String ACTION_SCHEDULESYNC = "scheduleSync";
	public static final String ACTION_SCORESUBMIT = "scoreSubmit";
	public static final String ACTION_COMMENTSUBMIT = "commentSubmit";
	public static final String ACTION_GETCOMMENT = "getComment";
	public static final String ACTION_GETSCORE = "getScore";
	public static final String ACTION_GETACTIVITY = "getActivity";
//	public static final String ACTION_GETGENERALINFO = "getGeneralInfo";
	
	@SuppressWarnings("unchecked")
	public void init(ServletContext servletContext) throws ServletException {}
	private static final long serialVersionUID = 1L;

	/**
	 * Constructor of the object.
	 */
	public YqfwAction() {
		super();
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response){
		doPost(request,response);
	}
	SimpleDateFormat sdf= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	public Document getInput(HttpServletRequest request,Document doc) throws Exception{
		InputStream in = request.getInputStream();
		try{
			String strJson = XmlUtil.in2string(in);
			doc = XmlUtil.json2doc(strJson);
			return doc;
		}catch(Exception ex){
			throw ex;
		}finally{
			in.close();
		}
	}

	@SuppressWarnings("unchecked")
	public void doPost(HttpServletRequest request, HttpServletResponse response){
		log.debug("into YqfwAction...");
		TestServiceImpl testService = new TestServiceImpl();
		TestVo test = new TestVo();
		test.setTemp("asda奥德赛");
		try {
			testService.addTestVo(test);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
//		Document docIn = null;
//		try {
//			docIn = getInput(request,docIn);
//			
//			log.debug("InputStream:" + docIn.asXML());
//			
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
	}
	
	public void out(String content,HttpServletResponse response){
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = null;
		try {
			out = response.getWriter();
			String json = XmlUtil.doc2json(content);
			log.debug("OutputStream:" + json);
			out.println(json);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			out.close();
		}
	}

	public void outCode(int code,String fileName,HttpServletResponse response){
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = null;
		try {
			String templatePath = System.getProperty(Init.WWWROOT) + "template" + File.separatorChar + fileName;
			MiniTemplator templateRequest = new MiniTemplator(templatePath);
			templateRequest.setVariable("code", code);
			out = response.getWriter();
			String json = XmlUtil.doc2json(templateRequest.generateOutputXml().asXML());
			log.debug("OutputStream:" + json);
			out.println(json);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			IOUtils.closeQuietly(out);
		}
	}

	
	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
	}

}
