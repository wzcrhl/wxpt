package com.haier.wxpt.yqfw;

import javax.servlet.ServletContext;

/**
 * 插件初始化接口
 * @author wzc
 */
public interface IInitializeInterface {
	
	/**
	 * 插件名称接口,每个实现必须返回当前插件名称
	 * @author wzc
	 * @return String
	 */
	public String getPluginName();
	
	/**
	 * 初始化方法接口
	 * @author
	 * @param servletContext
	 * @return boolean
	 */
	public boolean init(ServletContext servletContext);
	
}
