package com.haier.wxpt.yqfw;

import java.io.File;
import java.io.FileInputStream;
import java.io.FilenameFilter;
import java.util.ArrayList;
import java.util.List;
import java.util.jar.JarEntry;
import java.util.jar.JarInputStream;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import com.haier.wxpt.yqfw.locale.Locale;

@SuppressWarnings("deprecation")
public class Init extends HttpServlet {
	
	Logger log = Logger.getLogger(getClass());

	public static final String WWWROOT = "HAIER.WXPT.WWWROOT";
	public static final String TEMPLATEPATH = "GOLF.TEMPLATE.PATH";
	
	public static final String JOBNAME = "haier_wxpt_yqfwplugin";
	
	/**
	 * 遍历包的过滤器,只检查所有以golf-开始的jar文件
	 */
	private static final String CLASS_PATH_FILTER = "wxpt-";

	/**
	 * 遍历Class的过滤器,只检查所有以InitializeImpl结束的Class
	 */
	private static final String CLASS_FILE_FILTER = "InitializeImpl";

	private static final String pluginPackage = "com.haier.wxpt.yqfw";
	
	public static final SessionFactory dbSessionFactory;

	static{
		//初始化hibernate Session
		 try {
			 dbSessionFactory = new Configuration().configure().buildSessionFactory();
		 }catch(Throwable ex){
			 System.err.println("Initial SessionFactory creation failed." + ex);
			 throw new ExceptionInInitializerError(ex);
		 }
	}
	
	@SuppressWarnings("unchecked")
	public void init() throws ServletException {
		// by wzc 120711 初始化,可以初始化线程,定时器等.
		ServletContext servletContext = this.getServletContext();
		String wwwRoot = servletContext.getRealPath("") + File.separatorChar;
		String templatePath = wwwRoot + "template" + File.separatorChar;
		System.setProperty(WWWROOT,wwwRoot);
		System.setProperty(TEMPLATEPATH,templatePath);
		PropertyConfigurator.configure(wwwRoot + "WEB-INF" + File.separatorChar + "log4j.properties");
		log.info("Init.");
		
		//初始化国际化文件配置
		Locale.init();

//		new PropertiesUtil();
		
//		Job.createJob("TestJob","0 0/1 * * * ? *",DhmiTestJob.class.getName());
		
		//by wzc  需要支持基于该框架插件的初始化.
		//遍历插件初始化类.循环初始化
		List<String> listPlugin = getInitializePlugin(pluginPackage);
		if(listPlugin != null && listPlugin.size() > 0){
			Class classPlugin = null;
			for(String plugin : listPlugin){
				if(StringUtils.isEmpty(plugin))continue;
				classPlugin = null;
				try {
					classPlugin = Class.forName(plugin);
					if(classPlugin != null){
						Object obj = classPlugin.newInstance();
						if(obj != null && obj instanceof IInitializeInterface){
							IInitializeInterface initInterface = (IInitializeInterface) obj;
							initInterface.init(servletContext);
							log.info("Init Plugin:" + initInterface.getPluginName());
						}
						else
							log.error("UnKnow Plugin:" + plugin);
					}
				} catch (ClassNotFoundException e) {
					e.printStackTrace();
				} catch (InstantiationException e) {
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				}
			}
		}
		

	}
	
	public List<String> getInitializePlugin(String pkgName) {
		List<File> packageList = new ArrayList<File>();
		String wwwroot = System.getProperty(WWWROOT);
		String jarPath = wwwroot + "WEB-INF" + File.separatorChar + "lib" + File.separatorChar;
		File fileJarPath = new File(jarPath);
		if(fileJarPath != null && fileJarPath.exists() && fileJarPath.isDirectory()){
			String[] pathes = fileJarPath.list();
			for (String path : pathes) {
				if(StringUtils.isEmpty(path))continue;
//				log.debug(jarPath + path);
				if(path.startsWith(CLASS_PATH_FILTER))
					packageList.add(new File(jarPath + path));
			}
		}
		List<String> classList = new ArrayList<String>();
		String rPath = pkgName.replace('.', '/') + "/";
			for (File classPath : packageList) {
				if (!classPath.exists())
					continue;
				if (!classPath.isDirectory()){
					//只有jar才处理
					FileInputStream fis = null;
					JarInputStream jis = null;
					try{
						fis = new FileInputStream(classPath);
						jis = new JarInputStream(fis, false);
						JarEntry e = null;
						while ((e = jis.getNextJarEntry()) != null) {
							String eName = e.getName();
							if (eName.startsWith(rPath) && !eName.endsWith("/")) {
								if(eName.contains(CLASS_FILE_FILTER))
									classList.add(eName.replace('/', '.').substring(0,eName.length() - ".class".length()));
							}
							jis.closeEntry();
						}
						
					}catch(Exception ex){
						log.error("",ex);
					}finally{
						IOUtils.closeQuietly(jis);
						IOUtils.closeQuietly(fis);
					}
				}
			}
			
			
			//by wzc 暂时先读一下classes吧.
			String classesPath = wwwroot + "WEB-INF" + File.separatorChar + "classes" + File.separatorChar + rPath;
			log.debug("classes:" + classesPath);
			
			//遍历所有的.class,找到后缀后存入.
			
			File fileClasses = new File(classesPath);
			if(fileClasses != null && fileClasses.exists() && fileClasses.isDirectory()){
				File[] listFile = fileClasses.listFiles(new PluginFilenameFilter());
				for(File f : listFile){
					findClass(f,classList,fileClasses.getAbsolutePath());
				}
			}
			
			for(String a : classList){
				log.debug("找到插件:" + a);
			}
			
			
		packageList.clear();
		return classList;
	}
	
	
	class PluginFilenameFilter implements FilenameFilter{

		@Override
		public boolean accept(File dir, String name) {
			if(dir != null && dir.isDirectory())
				return true;
			if(name.contains(CLASS_FILE_FILTER))
				return true;
			return false;
		}
		
	}
	
	private void findClass(File file,List<String> classList,String classesPath){
		if(file == null || !file.exists())
			return ;
		
		if(file.isFile()){
			if(file.getName().contains(CLASS_FILE_FILTER)){
				//log.debug("classes:" + file.getPath());
				//log.debug("classesPath:" + classesPath);
				String eName = file.getAbsolutePath().replace(classesPath, "");
				eName = pluginPackage + eName;
				classList.add(eName.replace("\\", "/").replace('/', '.').substring(0,eName.length() - ".class".length()));
			}
		}
		else if(file.isDirectory()){
			File[] listFile = file.listFiles(new PluginFilenameFilter());
			if(listFile != null && listFile.length > 0){
				for(File f : listFile){
					findClass(f,classList,classesPath);
				}
			}
		}
		
	}
	

	

	private static final long serialVersionUID = 1L;

	/**
	 * Constructor of the object.
	 */
	public Init() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
	}

}
