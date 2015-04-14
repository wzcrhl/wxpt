package com.haier.wxpt.yqfw.locale;

import java.util.HashMap;

import org.apache.commons.lang.StringUtils;

/**
*
* Description:  国际化语言对象，每个国际化property对应一个object
* @author wzc 
* @version 
*/
public class LocaleObject {
	
	public LocaleObject(String name){
		this.localeName = name;
	}
	
	private String localeName = null;
	
	private HashMap<String,String> mapLocales = new HashMap<String,String>();

	public String getLocaleName() {
		return localeName;
	}

	public void setLocaleName(String localeName) {
		this.localeName = localeName;
	}

	public void addLocale(String key,String value){
		if(StringUtils.isNotEmpty(key))
			mapLocales.put(key,value);
	}
	
	public String getLocale(String key){
		if(StringUtils.isNotEmpty(key) && mapLocales.containsKey(key))
			return mapLocales.get(key);
		else
			return "";
	}
	
	public boolean constantLocale(String key){
		if(StringUtils.isNotEmpty(key) && mapLocales.containsKey(key))
			return true;
		else
			return false;
	}
	
	
}
