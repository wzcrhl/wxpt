package com.haier.wxpt.yqfw.util;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.InputStream;

import net.sf.json.JSON;
import net.sf.json.JSONArray;
import net.sf.json.JSONNull;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import net.sf.json.xml.XMLSerializer;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.io.SAXReader;

public class XmlUtil {
	
	/**
	 * xml文件转Dom4j
	 * @param file
	 * @return
	 */
	public static Document file2xml(String file) {
		if(StringUtils.isEmpty(file))
			return null;
		
		InputStream in = null;
		SAXReader saxReader = new SAXReader();
		Document doc = null;
		try{
			in = new FileInputStream(file);
			doc = saxReader.read(in);
			return doc;
		}catch(Exception ex){
			ex.printStackTrace();
		}finally{
			IOUtils.closeQuietly(in);
			in = null;
			saxReader = null;
		}
		return null;
	}
	

	/**
	 * InputStream转String
	 * @param is
	 * @return
	 * @throws Exception
	 */
	public static String in2string(InputStream is) throws Exception{
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		try{
			int i= -1; 
			while((i=is.read())!=-1){
				baos.write(i);
			}
	       return baos.toString("utf-8");
		}catch(Exception ex){
			throw ex;
		}finally{
			baos.close();
		}
	}
	
	/**
	 * json转Document
	 * @param strJson
	 * @return
	 * @throws Exception
	 */
	public static Document json2doc(String strJson) throws Exception{
		XMLSerializer xmlSerializer = new XMLSerializer();
		JSON json = null;
		try{
			json = JSONSerializer.toJSON(strJson);
			if(json instanceof JSONArray)
			  json = (JSONArray)JSONSerializer.toJSON(strJson);
			else if(json instanceof JSONObject)
			  json = (JSONObject)JSONSerializer.toJSON(strJson);
			else if(json instanceof JSONNull)
			  json = (JSONNull)JSONSerializer.toJSON(strJson);
			String xml = xmlSerializer.write(json);
			//log.debug(xml);
			return DocumentHelper.parseText(xml);
		}catch(Exception ex){
			throw ex;
		}finally{
			xmlSerializer = null;
			json = null;
		}
	}
	
	/**
	 * Document转json
	 * @param strDoc
	 * @return
	 * @throws Exception
	 */
	public static String doc2json(String strDoc) throws Exception{
		XMLSerializer xmlSerializer = new XMLSerializer();
		try{
			return xmlSerializer.read(strDoc).toString();
		}catch(Exception ex){
			throw ex;
		}finally{
			xmlSerializer = null;
		}
	}

}



