package com.douzone.ucare.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Calendar;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileUploadService {
	private static final String SAVE_PATH = new File("src" + File.separator +  "main" + File.separator + "webapp" + File.separator + "assets" + File.separator + "uploads-images").getAbsolutePath();
	private static final String URL_BASE = File.separator + "ucare_backend" + File.separator + "assets" + File.separator + "uploads-images"; 
	
	public String restore(MultipartFile file) {
		String url = null;
		
		try {
			if(file.isEmpty()) {
				return url;
			}
			
			String originFilename = file.getOriginalFilename();
//			String extName = originFilename.substring(originFilename.lastIndexOf('.')+1);
			String saveFilename = generateSaveFilename(originFilename);
			long fileSize = file.getSize();
			
			System.out.println("##########" + originFilename );
			System.out.println("##########" + fileSize );
			System.out.println("##########" + saveFilename );
			
			byte[] data = file.getBytes();
			OutputStream os = new FileOutputStream(SAVE_PATH + File.separator + saveFilename);
			os.write(data);
			os.close();
			
			url = URL_BASE + File.separator + saveFilename;
		} catch (IOException e) {
			throw new RuntimeException("file upload error:" + e);
		}
		
		return url;
	}

	private String generateSaveFilename(String extName) {
		String filename = "";
		Calendar calendar = Calendar.getInstance();
		filename += calendar.get(Calendar.YEAR);
		filename += calendar.get(Calendar.MONTH);
		filename += calendar.get(Calendar.DATE);
		filename += calendar.get(Calendar.HOUR);
		filename += calendar.get(Calendar.MINUTE);
		filename += calendar.get(Calendar.SECOND);
		filename += calendar.get(Calendar.MILLISECOND);
		filename += ("_" + extName);
		
		return filename;
	}
	
	public boolean remove(String url) {
		String fileName = new File(url).getName();
		File deleteFile = new File(SAVE_PATH + File.separator + fileName);
		
		return deleteFile.delete();
	}

}
