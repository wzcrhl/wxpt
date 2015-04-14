package com.haier.wxpt.yqfw.locale;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Properties;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.haier.wxpt.yqfw.Init;

/**
*
* Description: 国际化类
* @author wzc 
* @version 
*/
public class Locale {
	
	static Logger log = Logger.getLogger(Locale.class);
	
	public static final String LANGUAGE_FILENAME_SUFFIX = "language_";
	public static final String LANGUAGE_TYPE = "type";
	
	private static HashMap<String,LocaleObject> mapLocales = new HashMap<String,LocaleObject>();
	
	//这里要做一个启动项，启动后搜索所有的language开头的国际化文件，并将其加载到这个map对象中。

	public static void init(){
		//先读classes里所有以language开头的国际化文件
		String wwwroot = System.getProperty(Init.WWWROOT);
		String classesPath = wwwroot + "WEB-INF" + File.separatorChar + "classes";
		File fileClasses = new File(classesPath);
		/**
		*
		* Description: 过滤器
		* @author wzc 
		* @version 
		*/
		class LanguageFileFilter implements FilenameFilter{
			@Override
			public boolean accept(File dir, String name) {
				if(StringUtils.isNotEmpty(name) 
						&& name.startsWith(LANGUAGE_FILENAME_SUFFIX)
							&& name.endsWith(".properties")){
					log.info("Found a LanguageFile : " + name);
					return true;
				}
				else
					return false;
			}
		}
		//开始循环读取以language_开始的文件，并加载到内存中。
		if(fileClasses.exists() && fileClasses.isDirectory()){
			File[] fileLanguages = fileClasses.listFiles(new LanguageFileFilter());
			if(fileLanguages != null && fileLanguages.length >0){
				for(File fileLanguage : fileLanguages){
					if(fileLanguage == null || !fileLanguage.exists() || !fileLanguage.isFile())
						continue;
					InputStream in = null;
					try {
						in = new BufferedInputStream(Locale.class.getClassLoader().getResourceAsStream(fileLanguage.getName()));
						Properties p = new Properties();
						p.load(in);
						log.debug("Load " + fileLanguage.getName() + " start!");
						if(p != null && p.keySet()!= null){
							String strKey = "";
							String strValue = "";
							String type = p.getProperty(LANGUAGE_TYPE);
							if(StringUtils.isNotEmpty(type)){
								LocaleObject localeObj = null;
								if(mapLocales.containsKey(type))
									localeObj = mapLocales.get(type);
								else
									localeObj = new LocaleObject(type);
								for(Object key : p.keySet()){
									if(key == null)
										continue;
									strKey = key.toString();
									if(StringUtils.isEmpty(strKey) || strKey.equalsIgnoreCase(LANGUAGE_TYPE))
										continue;
									strValue = new String(p.getProperty(strKey).getBytes("iso-8859-1"),"utf-8");
									if(StringUtils.isEmpty(strValue))
										strValue = "";
									localeObj.addLocale(strKey, strValue);
								}
								mapLocales.put(type, localeObj);
							}
						}
						p.clear();
						p = null;
					} catch (FileNotFoundException e) {
						log.error(e.getMessage(),e);
					} catch (IOException e) {
						log.error(e.getMessage(),e);
					}finally{
						IOUtils.closeQuietly(in);
						in = null;
					}
				}
			}
		}
	}

	
	/**
	
	* @Description: 获取国际化文件
	* @version
	* @param @param type
	* @param @param key
	* @param @param defaultValue
	* @param @return 
	* @return String 
	* @throws 
	*/
	public static synchronized String get(String type,String key,String defaultValue){
		if(StringUtils.isNotEmpty(type) && StringUtils.isNotEmpty(key)){
			if(mapLocales.containsKey(type) && mapLocales.get(type).constantLocale(key))
				return mapLocales.get(type).getLocale(key);
		}
		return defaultValue;
	}
}
