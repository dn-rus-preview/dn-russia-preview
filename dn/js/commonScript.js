// 파일첨부 파일명 삽입
$(document).on("change", ".filebox .upload-hidden", function(){
	// 첨부파일 개수 체크
	// var filemax = Number($("#FILE_BODY").data("maxlength"));
	var filemax = $(this).closest(".FILE_BODY").data("maxlength");
	var fileCnt = Number($(this).parent().parent().parent().find(".filebox").length);
	
	if(fileCnt > filemax){
		alert("최대 "+filemax+"개까지 첨부 가능합니다.");
		
		var agt = navigator.userAgent.toLowerCase();
		if (agt.indexOf("msie") != -1) {
			$(this).replaceWith( $(this).clone( true ) );  //첨부파일 삭제
		}else{ 
			$(this).val("");
		}
		
		return false;
	}
	
	// 첨부파일 체크
	var filetype = $(this).data("filetype");
	fileCheck(this, filetype);
	
	// 파일명 삽입
	var filename = "";
	if($(this).val().length > 0){
		if(window.FileReader){  // modern browser
			filename = $(this)[0].files[0].name;
		} else {  // old IE
			filename = $(this).val().split('/').pop().split('\\').pop();  // 파일명만 추출
		}
	}else{
		$(this).val("");
	}
	
	$(this).siblings('.upload-name').val(filename);
});

// 첨부파일 추가
$(document).on("click",".file_add", function(){
	// 첨부파일 개수 제한
	var filemax = Number($(this).parent().parent().data("maxlength"));
	var fileCnt = Number($(this).parent().parent().parent().find(".filebox").length);
	
	if(fileCnt >= filemax){ return false; }
	
	// (+)버튼 마지막 행 보여짐
	$(this).addClass("hide").hide();

	// object 복사 후 추가
	var $fileObj = $(this).closest(".FILE_BODY .filebox").last().clone(true).appendTo(".FILE_BODY");
 	$fileObj.find("input[type=file]").val("");
 	$fileObj.find(".upload-name").val("");
	$fileObj.find("button").show().removeClass("hide");
	
	// fileId 변경
	var fileId = Number($(this).parent().data("fileid"))+1;
	$fileObj.find("label").attr("for", "atchFileId_"+fileId);
	$fileObj.attr("data-fileid", fileId);
	$fileObj.data("fileid", fileId);
	$fileObj.find("input[type=file]").attr("id", "atchFileId_"+fileId);
});

// 첨부파일 삭제
$(document).on("click",".file_del", function(){
	$(this).parent().remove();
	
	if($(this).parent().find(".file_add").not(".hide").length > 0){
		// (+)버튼 마지막 행 보여짐
		$(this).closest(".FILE_BODY .filebox").last().find(".file_add").show().removeClass("hide");
	}
});

// 천단위 콤마
function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

// 천단위 콤마 제거 
function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}

// 핸드폰 번호 숫자만 입력
function checkHp(str){
	var regex = /^[0-9+]+$/;
	if(regex.test(str)){
		return true;
	}else{
		return false;
	}
}

//공백 체크
function checkBlank(str){
	var blank_pattern = /[\s]/g;
	
	if(blank_pattern.test(str)){
		return false;
	}
	return true;
}

// 좌, 우 공백 제거
function trimVal(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

// Input 컴포넌트에 숫자만 입력가능하도록 처리
function createNumeric(selector) {
	$(selector).attr("disabled",false); 
	jQuery(selector).css('imeMode','disabled').keypress(function(event) {
		if(event.which && (event.which < 48 || event.which > 57) ) {
			event.preventDefault();
		}
	}).keyup(function(){
		if( jQuery(this).val() != null && jQuery(this).val() != '' ) {
			jQuery(this).val( jQuery(this).val().replace(/[^0-9,.]/g, '') );
		}
	});
}

// Input 컴포넌트에 숫자만 입력가능하도록 처리
function inputNumeric(e) {
	e.value = e.value.replace(/[^0-9+]/g, '');
}

//Input 컴포넌트에 숫자,+,- 입력가능하도록 처리
function createPlusMinusNumeric(selector) {
	$(selector).attr("disabled",false); 
	jQuery(selector).css('imeMode','disabled').keypress(function(event) {
		if(event.which && (event.which != 45 && event.which != 43 && (event.which < 48 || event.which > 57)) ) {
			event.preventDefault();
		}
	}).keyup(function(){
		if( jQuery(this).val() != null && jQuery(this).val() != '' ) {
			jQuery(this).val( jQuery(this).val().replace(/[^0-9,.+-]/g, '') );
		}
	});
}

// 에디터 탭 변경 이벤트
function tabChange(i){
	$("#edit-ul > li").removeClass("active");
	$("#edit-ul > li").eq(i).addClass("active");
	$(".edit-area").hide();
	$(".edit-area").eq(i).show();
}

// 엔터키
function inputSubmit(e){
	if(e.keyCode == 13){
		goSearch();
	}
}

// 페이지 보기 개수 변경
function goChangePage(){
	goSearch();
}

// 정렬조건 변경
function goChangeOrder(){
	goSearch();
}

// 새창 submit 
function submitPopup(frm, url, formName, wid, hei, top, left){
	var winl;
	var wint;
	
	if (typeof top == "undefined"){
		wint = (screen.height - hei) / 2;
	}else{
		wint = top;
	}
	
	if (typeof left == "undefined"){
		winl = (screen.width - wid) / 2;
	}else{
		winl = left;
	}
	
	newOpen = window.open("" ,formName,'width='+wid+',height='+hei+',top='+wint+',left='+winl+', toolbar=no,location=no,directory=no,status=no,menubar=no,scrollbars=yes,resizable=no,copyhistory=no');
	frm.action = url; 
	frm.method = "post";
	frm.target = formName;
	frm.submit();
}

// 첨부파일 체크 [type (image , document, excel)]
function fileCheck($this, type){
	var agt = navigator.userAgent.toLowerCase();
	var fileName = $($this).val();
	var fileFormat = fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase();
	var maxSize =  1024*1024*500; // 500MB
	
	// 이미지 파일 5mb
	if(fileFormat == "gif" || fileFormat == "jpg" || fileFormat == "jpeg" || fileFormat == "png" || fileFormat == "bmp"){
		maxSize =  1024*1024*5;
	}
	
	if (agt.indexOf("msie") != -1) {
		if(fileName != ""){
			var myFSO = new ActiveXObject("Scripting.FileSystemObject");
			var filepath = $($this).val();
			var thefile = myFSO.getFile(filepath);
			var size = thefile.size;
			if(size > maxSize){
				 $($this).replaceWith( $this = $($this).clone( true ) );   
				 return callbackFileCheck("1");	//용량 초과시
			}       
		}
	}else{
		if(fileName != ""){
			var size = document.getElementById($this.id).files[0].size;
			 if(size> maxSize){
				 $($this).val("");
				 return callbackFileCheck("1");	//용량 초과시
			 }
		}
	}
	
	if(fileName != ""){
		if(type =="image"){
			if(fileFormat !="gif" && fileFormat !="jpg" && fileFormat !="jpeg" && fileFormat !="png" && fileFormat != "bmp"){
				if (agt.indexOf("msie") != -1) {
					$($this).replaceWith( $this = $($this).clone( true ) );  //첨부파일 삭제
				}else{ 
					$($this).val("");
				}
				return callbackFileCheck("2"); //이미지 파일 첨부
			} 
		}else if(type =="document"){
			// arrDocExt = "pdf,ppt,pptx,xls,xlsx,doc,docx,hwp,txt,zip"; // 사용 안함
			// arrDocExt = "pdf,pptx,doc,docx,hwp,txt";
			if(fileFormat !="pdf" && fileFormat !="ppt" && fileFormat !="pptx" && fileFormat !="doc" && fileFormat !="docx" && fileFormat !="hwp"  && fileFormat !="txt"){ 
				if (agt.indexOf("msie") != -1) {
					 $($this).replaceWith( $this = $($this).clone( true ) );  //첨부파일 삭제
				 }else{ 
					 $($this).val("");
				 }  
				 return callbackFileCheck("3");	//문서파일 첨부
			 } 
		 }else if(type =="excel"){	
			 if(fileFormat !="xlsx" && fileFormat !="xls"){
				 if (agt.indexOf("msie") != -1) {
					 $($this).replaceWith( $this = $($this).clone( true ) );  //첨부파일 삭제
				 }else{ 
					 $($this).val("");
				 }  
				 return callbackFileCheck("4");	//엑셀파일 첨부
			 } 
		 }else if(type =="vcf"){
			 if(fileFormat !="vcf"){
				 if (agt.indexOf("msie") != -1) {
					 $($this).replaceWith( $this = $($this).clone( true ) );  //첨부파일 삭제
				 }else{ 
					 $($this).val("");
				 }  
				 return callbackFileCheck("5");	// vcf파일 첨부
			 } 
		 }else if(type =="pdf"){
			 if(fileFormat !="pdf"){
				 if (agt.indexOf("msie") != -1) {
					 $($this).replaceWith( $this = $($this).clone( true ) );  //첨부파일 삭제
				 }else{ 
					 $($this).val("");
				 }  
				 return callbackFileCheck("6");	//pdf파일 첨부
			 } 
		 }else if(type == "all"){ // img + doc
			if(fileFormat !="gif" && fileFormat !="jpg" && fileFormat !="jpeg" && fileFormat !="png" && fileFormat != "bmp"
				&& fileFormat !="pdf" && fileFormat !="ppt" && fileFormat !="doc" && fileFormat !="docx" && fileFormat !="hwp"  && fileFormat !="txt"){
				if (agt.indexOf("msie") != -1) {
					$($this).replaceWith( $this = $($this).clone( true ) );  //첨부파일 삭제
				}else{ 
					$($this).val("");
				}  
				return callbackFileCheck("7");
			}
		}else if(type =="mov"){
			if(fileFormat !="mp4" && fileFormat !="wmv" && fileFormat !="avi" && fileFormat !="mkv"){ 
				if (agt.indexOf("msie") != -1) {
					 $($this).replaceWith( $this = $($this).clone( true ) );  //첨부파일 삭제
				 }else{ 
					 $($this).val("");
				 }  
				 return callbackFileCheck("8");	//문서파일 첨부
			 } 
		}
	 }
}

// 캔버스 이미지 저장
// 이미지(png)로 다운로드
function downloadCanvasImg(id, fileNm){
    html2canvas($("#"+id)[0]).then(function(canvas){
        var myImage = canvas.toDataURL();
        downloadURI(myImage, fileNm+".png") 
    });
}

function downloadURI(uri, name){
	var link = document.createElement("a")
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
}

// maxlength 체크
function maxlengthCheck(e, len){
	if(e.value.length > len){
		alertLayerOpen("띄어쓰기 포함 "+len+"자 이내로 작성해 주시기 바랍니다", "N", "N", "alertLayer");
		e.value = e.value.substr(0, len);
	}
}

// endDt 체크
// 첫 글자가 한글or영문이면 한글만 입력
// 첫 글자가 숫자이면 숫자만 입력
function endDtCheck(e){
	// 입력된 값의 첫 번째 문자
	var firstChar = e.value.charAt(0);
	
	// 첫 번째 문자가 한글or영문인 경우
	if (/[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z]/.test(firstChar)) {
		// 입력값에서 한글+영문만 추출하여 입력 필드에 설정
		e.value = e.value.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z]/gi, "");
	}
	// 첫 번째 문자가 숫자인 경우
	else if (/[0-9]/.test(firstChar)) {
		// 입력값에서 숫자만 추출하여 입력 필드에 설정
		e.value = e.value.replace(/[^0-9]/g, "");
	}
	// 검사한 문자가 한글 또는 숫자가 아닌 경우
	else {
		// 이벤트를 취소하여 입력값이 입력되지 않도록 제한
		e.preventDefault();
	}
}


//********************************************************
//************************날짜 관련*************************
//********************************************************

//날짜 형식 YYYY(구분기호)MM(구분기호)DD로 반환
function getFormatDate(date,delimiter){
	delimiter = typeof delimiter !== 'undefined' ? delimiter : "-";	// delimiter 기본값
	
	var dt = new Date(date);
	var currentDate="";
	
	var year = Number(dt.getFullYear());
	var month=Number(dt.getMonth() + 1);
	var day = Number(dt.getDate());
	
	if(month <10){
		month = "0"+month;
	}
	if(day <10){
		day = "0"+day;
	}
	
	currentDate = year+delimiter+month+delimiter+day;
	
	return currentDate;
}

// 1주일, 1개월, 3개월 날짜 세팅
function setDate(val){
	var settingDate = new Date();
	
	$("#schEndDt").val(getFormatDate(settingDate));
	
	switch(val){
	case "1" :	// 오늘
		$("#schStartDt").val(getFormatDate(settingDate));
		break;
	case "2" :	// 1주일	
		settingDate.setDate(settingDate.getDate()-7);
		$("#schStartDt").val(getFormatDate(settingDate));
		break;
	case "3" :	// 1개월
		settingDate.setMonth(settingDate.getMonth()-1);
		$("#schStartDt").val(getFormatDate(settingDate));
		break;
	case "4" :	// 3개월
		settingDate.setMonth(settingDate.getMonth()-3);
		$("#schStartDt").val(getFormatDate(settingDate));
		break;
	case "5" :	// 6개월
		settingDate.setMonth(settingDate.getMonth()-6);
		$("#schStartDt").val(getFormatDate(settingDate));
		break;
	case "6" :	// 1년
		settingDate.setFullYear(settingDate.getFullYear()-1);
		$("#schStartDt").val(getFormatDate(settingDate));
		break;
	case "7" :	// 2년
		settingDate.setFullYear(settingDate.getFullYear()-2);
		$("#schStartDt").val(getFormatDate(settingDate));
		break;	
	}
}

// 1주일, 1개월, 3개월 날짜 반환 
function getDate(val, delimiter){
	delimiter = typeof delimiter !== 'undefined' ? delimiter : "-";	// delimiter 기본값
	
	var settingDate = new Date();
	
	switch(val){
	case "1" :	// 오늘
		return getFormatDate(settingDate, delimiter);
		break;
	case "2" :	// 1주일 전
		settingDate.setDate(settingDate.getDate()-7);
		return getFormatDate(settingDate, delimiter);
		break;
	case "3" :	// 1개월 전
		settingDate.setMonth(settingDate.getMonth()-1);
		return getFormatDate(settingDate, delimiter);
		break;
	case "4" :	// 3개월 전
		settingDate.setMonth(settingDate.getMonth()-3);
		return getFormatDate(settingDate, delimiter);
		break;
	case "5" :	// 6개월 전
		settingDate.setMonth(settingDate.getMonth()-6);
		return getFormatDate(settingDate, delimiter);
		break;
	case "6" :	// 1년 전
		settingDate.setFullYear(settingDate.getFullYear()-1);
		return getFormatDate(settingDate, delimiter);
		break;
	case "7" :	// 2년 전
		settingDate.setFullYear(settingDate.getFullYear()-2);
		return getFormatDate(settingDate, delimiter);
		break;	

	case "12" :	// 1주일 후
		settingDate.setDate(settingDate.getDate()+7);
		return getFormatDate(settingDate, delimiter);
		break;
	case "13" :	// 1개월 후
		settingDate.setMonth(settingDate.getMonth()+1);
		return getFormatDate(settingDate, delimiter);
		break;
	case "14" :	// 3개월 후
		settingDate.setMonth(settingDate.getMonth()+3);
		return getFormatDate(settingDate, delimiter);
		break;
	case "15" :	// 6개월 후
		settingDate.setMonth(settingDate.getMonth()+6);
		return getFormatDate(settingDate, delimiter);
		break;
	case "16" :	// 1년 후
		settingDate.setFullYear(settingDate.getFullYear()+1);
		return getFormatDate(settingDate, delimiter);
		break;
	case "17" :	// 2년 후
		settingDate.setFullYear(settingDate.getFullYear()+2);
		return getFormatDate(settingDate, delimiter);
		break;
	}
}

//********************************************************
//************************유효성 체크***********************
//********************************************************

// 생년월일 유효성 체크
function checkBirthDate(str){
	var y_sub = parseInt(str.substring(0, 2)); 
	var y = parseInt(str.substr(0, 4), 10); 
	var m = parseInt(str.substr(4, 2), 10); 
	var d = parseInt(str.substr(6, 2), 10); 
	var dt = new Date(y, m-1, d);
	
	if(str.length < 8 ){
		return false;
	}else if(y_sub != 19 && y_sub != 20){
		return false;
	}else if(dt.getDate() != d) {
		return false;
	}else if(dt.getMonth()+1 != m) { 
		return false;
	}else if(dt.getFullYear() != y) { 
		return false;
	}else { 
		return true;
	} 
}

// 이메일 유효성 체크
function emailCheck($this){
	var regex=/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
	
	if(regex.test($this) == false) {  
	    return false;  
	} else {  
		return true;
	}
}

// 휴대폰 유효성 체크
function phoneCheck($this){
	var regExp = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
	if(regExp.test($this) == false) {
	    return false;
	} else {
		return true;
	}
}

function globalPhoneCheck($this) {
	var regExp = /^\d{3,}$/;
	if(regExp.test($this) == false) {
		return false;
	} else {
		return true;
	}

}

// 휴대폰 유효성 체크
function phoneCheck2(e){
	var hpNo = e.value.replace(/\-/g, "");
	
	// 11자 이상 입력
	if(hpNo.length > 11){
		hpNo = hpNo.substr(0, 11);
	}
	
	// 휴대폰 번호 정규식
	if (hpNo.length == 11) {
		hpNo = hpNo.replace(/[^0-9]/g, '').replace(/^(\d{3})(\d{3,4})(\d{4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
    }else if(hpNo.length==8){
    	hpNo = hpNo.replace(/[^0-9]/g, '').replace(/^(\d{4})(\d{4})$/g, "$1-$2").replace(/(\-{1,2})$/g, "");
    }else{
        if(hpNo.indexOf("02")==0){
        	hpNo = hpNo.replace(/[^0-9]/g, '').replace(/^(\d{2})(\d{3,4})(\d{4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
        }else{
        	hpNo = hpNo.replace(/[^0-9]/g, '').replace(/^(\d{3})(\d{3,4})(\d{4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
        }
    }
	
	e.value = hpNo.replace(/\--/g, "-");
}

// 일반전화 유효성 체크
function telCheck($this) {
	var regExp = /^\d{2,3}-?\d{3,4}-?\d{4}$/;
	if(regExp.test($this) == false) {  
	    return false;  
	} else {  
		return true;
	}
}

// 사업자 유효성 체크
function checkBizno(bizno){
	var re = /-/g;
	var bizno = bizno.replace(re,'');
	var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
	var tmpBizID, i, chkSum=0, c2, remander;
	 
	 for (i=0; i<=7; i++){
		 chkSum += checkID[i] * bizno.charAt(i);
	 }
	 
	 c2 = "0" + (checkID[8] * bizno.charAt(8));
	 c2 = c2.substring(c2.length - 2, c2.length);
	 chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1));
	 remander = (10 - (chkSum % 10)) % 10 ;
	 if (Math.floor(bizno.charAt(9)) == remander){
		 return true; 
	 }else{
		 alert("사업자등록번호가 유효하지 않습니다.");
		 return false;
	 }
}

// 아이디 유효성 체크 (5~16자, 영문, 숫자 또는 영문+숫자 조합)
function checkId(str){
	var reg = /^[a-z0-9]{5,16}$/;
	return(reg.test(str));
}

// 비밀번호 유효성 체크 (6~15자 영문 대소문자, 숫자, 특수문자 중 2가지)
function checkPwd(str){
	var regex1=/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,15}$/;  	
	var regex2=/^(?=.*[a-zA-Z])(?=.*[!@#$%^?_~])[a-zA-Z!@#$%^?_~]{6,15}$/;  
	var regex3=/^(?=.*[0-9])(?=.*[!@#$%^?_~])[0-9!@#$%^?_~]{6,15}$/;  
	var regex4=/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^?_~])[a-zA-Z0-9!@#$%^?_~]{6,15}$/;   
	
	if(regex1.test(str) || regex2.test(str) || regex3.test(str) || regex4.test(str)){ 
		return true;
	}else{
		return false;
	}
}

// 이름 유효성 체크 (한글,영문)
function checkNm(str){
	var regex1= /^[가-힣a-zA-Z]+$/;
	
	if(regex1.test(str)){ 
		return true;
	}else{
		return false;
	}
}

// 날짜 유효성 체크 (YYYY-MM-DD)
function checkDate(str){
	var regex = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
	
	if(regex.test(str) == false) {
	    return false;  
	} else {  
		return true;
	}
}

// 시간 유효성 체크 (HH24:MI)
function checkTime(str){
	var regex = /^([01][0-9]|2[0-3]):([0-5][0-9])$/;
	
	if(regex.test(str) == false) {
	    return false;  
	} else {  
		return true;
	}
}

// yyyy.mm.dd 날짜 체크
function checkValidDate(value) {
	var result = true;
	try {
	    var date = value.split(".");
	    var y = parseInt(date[0], 10),
	        m = parseInt(date[1], 10),
	        d = parseInt(date[2], 10);
	    
	    var dateRegex = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
	    result = dateRegex.test(d+'.'+m+'.'+y);
	} catch (err) {
		result = false;
	}    
    return result;
}

// 년월 유효성 체크
function checkYmDate(str){
	str = str.replace(/\./g, "");
	
	var y_sub = parseInt(str.substring(0, 2));
	var y = parseInt(str.substr(0, 4), 10);
	var m = parseInt(str.substr(4, 2), 10);
	var dt = new Date(y, m-1);
	
	if(str.length < 6){
		return false;
	}else if(y_sub != 19 && y_sub != 20){
		return false;
	}else if(dt.getMonth()+1 != m) {
		return false;
	}else if(dt.getFullYear() != y) {
		return false;
	}else { 
		return true;
	} 
}

// YYYY focus
var yyyyReset = 0;
function yyyyFocus(selector){
	$(selector).focusout(function() {
		if(jQuery(this).val() != ""){
			if($.isNumeric(jQuery(this).val().replace(/\./g,""))){
				if(yyyyReset == 0) {
					jQuery(this).val(jQuery(this).val().replace(/\./g, ""));
					
					if(jQuery(this).val().length < 4 || jQuery(this).val().length > 4) {
						alertLayerOpen("4자리를 입력해 주시기 바랍니다", "N", "N", "alertLayer");
						jQuery(this).val("");
						jQuery(this).focus();
				  	} else {
				  		// 년도 유효성 체크
						if(jQuery(this).val() > 2100 || jQuery(this).val() < 1900){
							alertLayerOpen("날짜가 올바르지 않습니다", "N", "N", "alertLayer");
							jQuery(this).val("");
							jQuery(this).focus();
						}
				  	}
				}
				
				yyyyReset = 1;
			}
		}
	});
	
	$(selector).focusin(function () {
		if($.isNumeric(jQuery(this).val().replace(/\./g,""))){
			jQuery(this).val(jQuery(this).val().replace(/\./g, ""));
		}
		
		setTimeout(function(){
			yyyyReset = 0;
		}, 10);
	});
}

// YYYY.MM focus
var yyyymmReset = 0;
function yyyymmFocus(selector){
	$(selector).focusout(function() {
		if(jQuery(this).val() != ""){
			if($.isNumeric(jQuery(this).val().replace(/\./g,""))){
				if(yyyymmReset == 0) {
					jQuery(this).val(jQuery(this).val().replace(/\./g, ""));
					
					if(jQuery(this).val().length < 6 || jQuery(this).val().length > 6) {
						alertLayerOpen("6자리를 입력해 주시기 바랍니다", "N", "N", "alertLayer");
						jQuery(this).val("");
						jQuery(this).focus();
				  	} else {
				  		var y = jQuery(this).val().substring(0, 4);
						var m = jQuery(this).val().substring(4, 6);
				  		
				  		// 년,월 유효성 체크
						if(Number(y) > 2100 || Number(y) < 1900 || Number(m) > 12 || Number(m) < 1){
							alertLayerOpen("날짜가 올바르지 않습니다", "N", "N", "alertLayer");
							jQuery(this).val("");
							jQuery(this).focus();
						}else{
							jQuery(this).val(y + "." + m);
						}
				  	}
				}
				
				yyyymmReset = 1;
			}
		}
	});
	
	$(selector).focusin(function () {
		if($.isNumeric(jQuery(this).val().replace(/\./g,""))){
			jQuery(this).val(jQuery(this).val().replace(/\./g, ""));
		}
		
		setTimeout(function(){
			yyyymmReset = 0;
		}, 10);
	});
}

//YYYY.MM.DD focus
var yyyymmddReset = 0;
function yyyymmddFocus(selector){
	$(selector).focusout(function() {
		if(jQuery(this).val() != ""){
			if(yyyymmddReset == 0) {
				jQuery(this).val(jQuery(this).val().replace(/\./g, ""));
				
				if(jQuery(this).val().length < 8 || jQuery(this).val().length > 8) {
					alert("8자리를 입력해 주시기 바랍니다");
					jQuery(this).val("");
					jQuery(this).focus();
			  	} else {
			  		jQuery(this).val(jQuery(this).val().substring(0, 4) + "." + jQuery(this).val().substring(4, 6) + "." + jQuery(this).val().substring(6, 8))
			  	}
			}
			
			yyyymmddReset = 1;
		}
	});
	
	$(selector).focusin(function () {
		setTimeout(function(){
			yyyymmddReset = 0;
		}, 10)
	});
}

// 영문만 체크
function checkEngName(e){
	e.value = e.value.replace(/[^A-Za-z\s]/ig, '');
}

//********************************************************
//************************다음 주소 API***********************
//********************************************************

// 다음 API 주소
function execDaumPostcode(callback) {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ''; // 도로명 조합형 주소 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
               extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraRoadAddr !== ''){
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }
            // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
            if(fullRoadAddr !== ''){
                fullRoadAddr += extraRoadAddr;
            }
            
            // 콜백 함수 
			callback(data.zonecode, data.postcode, fullRoadAddr, data.jibunAddress);

        }
    }).open();
}

//RSA
function fnRsaEnc(value, rsaPublicKeyModulus, rsaPpublicKeyExponent) {
	var rsa = new RSAKey();
	rsa.setPublic(rsaPublicKeyModulus, rsaPpublicKeyExponent);
	var encValue = rsa.encrypt(value);
	
	return encValue;
}

// alert 레이어
function alertLayerOpen(msg, historyYn, reloadYn, target) {
	if($("body").hasClass("leeko--layer-popup") === false){
		$("#alertMsg").html(msg);
		$("#alertLayer").data("historyback", historyYn);
		$("#alertLayer").data("reload", reloadYn);
		$("#alertLayer").data("callback", "N");
	
		$("body").addClass("leeko--layer-popup");
		$("#" + target).fadeIn(200);
		$("body").append('<div class="leeko-layer-popup__bg"></div>');
	}
}

// alert callback 레이어
function alertCallbackLayerOpen(msg, dimmedYn, target, callback) {
	if($("body").hasClass("leeko--layer-popup") === false){
		$("#alertCallbackMsg").html(msg);
		
		if(dimmedYn == "Y"){
			$("body").addClass("leeko--layer-popup");
			$("body").append('<div class="leeko-layer-popup__bg"></div>');
		}
		$("#" + target).fadeIn(200);
		
		$(".alertCallbackLayerBtn").on("click", function(){
			$(this).unbind("click");
			
			callback(true);
	        
	        $("#alertCallbackMsg").text("");
	        
			if(dimmedYn == "Y"){
				$("body").removeClass("leeko--layer-popup");
		    	$(".leeko-layer-popup__bg").remove();
			}
			$(".leeko-layer-popup").hide();
	    });
	}
}

// alert 레이어 닫은 후 이벤트 처리
function alertLayerClose(target) {
	$("body").removeClass("leeko--layer-popup");
	$(".leeko-layer-popup").hide();
	$(".leeko-layer-popup__bg").remove();
	
	// history back 처리
	if($("#alertLayer").data("historyback") === "Y"){
		history.back();
	}
	
	// reload 처리
	if($("#alertLayer").data("reload") === "Y"){
		document.location.reload();
	}
	
	// 초기화
	$("#alertMsg").text("");
	$("#alertLayer").data("historyback", "N");
	$("#alertLayer").data("reload", "N");
	
	return false;
}

// confirm 레이어
function confirmLayerOpen(msg, target, callback) {
	if($("body").hasClass("leeko--layer-popup") === false){
		$("#confirmMsg").html(msg);
		
		$("body").addClass("leeko--layer-popup");
		$("#" + target).fadeIn(200);
		$("body").append('<div class="leeko-layer-popup__bg"></div>');
		
		$(".confirmLayerBtn").on("click", function(){
			$(this).unbind("click");
			var confirmYn = $(this).data("confirmyn");
			
	        if(confirmYn === "Y"){
	            callback(true);
	        }else{
	        	callback(false);
	        }
	        
	        $("#confirmMsg").text("");
	        $("body").removeClass("leeko--layer-popup");
	    	$(".leeko-layer-popup").hide();
	    	$(".leeko-layer-popup__bg").remove();
	    });
	}
}

// 이미지 삭제
function imgDelete(fileDtlSeq, delId, key){
	var delHtml = "<input type='hidden' name='"+delId+"' value='"+fileDtlSeq+"'/>";
	$("#fileForm"+key).append(delHtml);
}

// 파일 삭제
function fileDelete(fileDtlSeq, fileBodyKey){
	$("#fileForm"+fileDtlSeq).remove();
	
	$("#"+fileDtlSeq+"_Upd").val("");
	$("#"+fileDtlSeq+"_Del").val(fileDtlSeq);
	
	// FILE_BODY show
	$(".FILE_BODY"+fileBodyKey).removeClass("hide");
}

//===== 노출순서 변경 =====//
// sort up
function sortUp(e){
	var myTr = $(e).parents("tr");
	var mySort = myTr.find(".sort").val();
	var prevTr = myTr.prev("tr");
	var prevSort = prevTr.find(".sort").val();
	
	if(prevTr.length > 0){
		prevTr.before(myTr);
		
		myTr.find("input[name=sort]").val(prevSort);
		prevTr.find(".sort").val(mySort);
	}else{
		alert("변경할 항목이 없습니다.");
	}
}

// sort down
function sortDown(e){
	var myTr = $(e).parents("tr");
	var mySort = myTr.find(".sort").val();
	var nextTr = myTr.next("tr");
	var nextSort = nextTr.find(".sort").val();
	
	if(nextTr.length > 0){
		nextTr.after(myTr);
		
		myTr.find("input[name=sort]").val(nextSort);
		nextTr.find(".sort").val(mySort);
	}else{
		alert("변경할 항목이 없습니다.");
	}
}

// multiple sort up
function multipleSortUp(){
	var cntSelect = $("#mtplSelect option:selected").length;
	if(cntSelect == 0) {
		alert("항목을 선택해주세요.");
		return false;
	}
	
	moveUp($("#mtplSelect")[0]);
}

// multiple sort down
function multipleSortDown(){
	var cntSelect = $("#mtplSelect option:selected").length;
	if(cntSelect == 0) {
		alert("항목을 선택해주세요.");
		return false;
	}
	
	moveDown($("#mtplSelect")[0]);
}

// 위로 버튼
function moveUp(obj){
	for ( var k = 1 ; k < obj.options.length ; k++ ) {
		if ( obj.options[ k ].selected ) {
			if ( obj.options[ k - 1 ].selected == false ) {
				swapObj( obj, k, k - 1 );
			}
		}
	}
}

// 아래로 버튼
function moveDown(obj){
	for ( var k = obj.options.length - 2 ; k >= 0 ; k-- ) {
		if ( obj.options[ k ].selected ) {
			if ( obj.options[ k + 1 ].selected == false ) {
				swapObj( obj, k, k + 1 );
			}
		}
	}
}

// 위치를 서로 바꾸는 함수
function swapObj(obj, i, j){
	var iObj = obj.options[ i ];
	var jObj = obj.options[ j ];
	
	var iSort = $(iObj).data().sort;
	var jSort = $(jObj).data().sort;

	obj.options[ i ] = new Option();
	obj.options[ j ] = new Option();

	$(jObj).data('sort', iSort);
	$(iObj).data('sort', jSort);
	
	obj.options[ i ] = jObj;
	obj.options[ j ] = iObj;
}
//===== 노출순서 변경 =====//