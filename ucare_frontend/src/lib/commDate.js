/**
* @class :  문자열의 오른쪽 부분을 지정한 길이만큼 가져온다.
* @param : sOrg (원본 문자열), nSize (얻어올 크기)
* @return : String
*/
export function strRight(sOrg, nSize)
{
	if( isNull(sOrg) || isNull(nSize) )		return "";
	
	if( sOrg.length < nSize )
		return sOrg;
	else
		return sOrg.substr(sOrg.length-nSize, nSize);
}

/**
 * @class 숫자로 된 년, 월, 일을 yyyyMMdd형의 문자열 날짜로 만든다.
 * @param {number} nYear 년도 ( 예 : 2020 )
 * @param {number} nMonth 월 ( 예 : 11 )
 * @param {number} nDate 일 ( 예 : 22 )
 * @return {string} yyyyMMdd 형태의 문자열 날짜 ( 예 : "20201122" )
 * @description 년, 월, 일의 값이 범위에 맞지 않는 값을 입력하면 그에 적합한 날짜로 변경해준다.<br>
 *  (예 : nYear = 2020, nMonth = 13, nDate = 32 ==> return = "20210201"<br>
 *        nYear = 2020, nMonth = 1, nDate = -1 ==> return = "20191230")
 */
export function makeDate(nYear, nMonth, nDate)
 {
     if ( isNull(nYear) || isNull(nMonth) || isNull(nDate) )	return "";
     
     var objDate = new Date(nYear, nMonth-1, nDate);
 
     var sYear   = objDate.getFullYear().toString();
     var sMonth  = strRight("0" + (objDate.getMonth() + 1), 2);
     var sDate   = strRight("0" + objDate.getDate(), 2);
 
     return sYear + sMonth + sDate;
 }

/**
* @class :  NULL 여부 체크
* @param : sValue String
* @return : boolean
*/
export function isNull(sValue)
{
    var v_ChkStr = new String(sValue);
    if (new String(sValue).valueOf() == "undefined") return true;
    if (sValue == null) return true;
   	if( (sValue == "NaN") && ( new String(sValue.length).valueOf() == "undefined" ) ) return true;
    if (v_ChkStr == null) return true;
    if (v_ChkStr.toString().length == 0 ) return true;
    return false;
}

/**
 * @class 윤년 여부 확인
 * @param {string} sYear 연도
 * @return {string} true : 윤년, false : 윤년 아님
 */
export function isLeaf(sYear) {
    var leaf = false;

    if(sYear % 4 == 0) {
        leaf = true;

        if(sYear % 100 == 0) {
            leaf = false;
        }

        if(sYear % 400 == 0) {
            leaf = true;
        }
    }

    return leaf;
}

/**
 * @class 윤년 여부 확인
 * @param {string} sYear 연도
 * @return {string} Y : 윤년, N : 윤년 아님
 */
export function commDate_getIsLeapYear(sYear)
{
	if ( (sYear % 4 == 0  &&  sYear % 100 != 0) || (sYear % 400 == 0) )
    {
		return "Y";
	}
	else
	{
		return "N";
	}
}

/**
 * @class 입력된 날자에 nOffset 으로 지정된 만큼의 일을 증감한다.
 * @param {string} sDate 날짜 ( 예 : "20201122" )
 * @param {number} nOffset 일 증감값 ( 예 : 10 또는 -10 )
 * @return {string} yyyyMMdd 형태의 문자열 날짜 ( 예 : "20201202" 또는 "20201112" )
 */
export function commDate_addDate(sDate, nOffset)
{
	if( isNull(sDate) || isNull(nOffset) )	return "";
	
    var nYear = parseInt(sDate.substr(0, 4));
    var nMonth = parseInt(sDate.substr(4, 2));
    var nDate = parseInt(sDate.substr(6, 2)) + nOffset;

    return makeDate(nYear, nMonth, nDate);
}

 /*******************************************************************************
 * @class
    양력 nYear에 해당하는 년도의 법정 공휴일(양력) List 모두 구하기
 * @param
    nYear : nYear에 해당하는 년도 ( 예 : 2020 )
 * @return
    - 성공 = 공휴일 List Array ==> 각 Array[i]="yyyyMMdd공휴일명" 으로 return된다.
             ( 예 : Array[0] = "20200101신정" )
    - 실패 = 빈 Array
 * 기타
    - 대체휴일제도는 반영 X    
******************************************************************************/  
export function GetHolidays(nYear)
{
	var nYear;
	var aHoliday = new Array();
	
	if( isNull(nYear) )		return aHoliday;

	/////// 음력 체크
	// 구정
	var intercalation = isLeaf(nYear - 1);
	aHoliday[0] = Lunar2Solar(((intercalation) ? "1" : "0") + (nYear-1) + "1230" ) + "설날";
	aHoliday[1] = commDate_addDate(aHoliday[0], 1) + "설날";
	aHoliday[2] = commDate_addDate(aHoliday[1], 1) + "설날";
	// 석가탄신일
	intercalation = isLeaf(nYear);
	aHoliday[3] = Lunar2Solar(((intercalation) ? "1" : "0") + nYear + "0408" ) + "석가탄신일";
	
	// 추석
	aHoliday[4] = Lunar2Solar(((intercalation) ? "1" : "0") + nYear + "0814" ) + "추석";
	aHoliday[5] = commDate_addDate(aHoliday[4], 1) + "추석";
	aHoliday[6] = commDate_addDate(aHoliday[5], 1) + "추석";	

	/////// 양력 체크
	aHoliday[7] = nYear+"0101" + "신정";
	aHoliday[8] = nYear+"0301" + "삼일절";
	aHoliday[9] = nYear+"0505" + "어린이날";	
	aHoliday[10] = nYear+"0606" + "현충일";		
	aHoliday[11] = nYear+"0815" + "광복절";			
	aHoliday[12] = nYear+"1225" + "성탄절";			
	aHoliday[13] = nYear+"1003" + "개천절";
	aHoliday[14] = nYear+"1009" + "한글날";
	
	return aHoliday.sort();
}

/*******************************************************************************
 * @class
    음력을 양력으로 변환해주는 함수 (처리가능 기간  1841 - 2043년)
 * @param 
    1. sDate : Flag(1 Byte)+yyyyMMdd형태의 음력일자 ( 예 : "020201122" )
				( Flag : 평달 = "0", 윤달 = "1" )
 * @return 
    - 성공 = yyyyMMdd형태의 양력일자
    - 실패 = null 
			  - 1841 ~ 2043 범위 오류의 경우
			  - sDate가 9자리가 아닐경우
			  - sDate의 첫자리 Flag가 "0"도 아니고 "1"도 아닌 경우
 * 주의사항
    1. sDate가 8자리가 아니고 9자리임에 주의
    2. 처리가능 기간  1841 - 2043년    
**********************************************************************************/
export function Lunar2Solar(sDate)
{	
	var sMd = "31,0,31,30,31,30,31,31,30,31,30,31";
	var aMd = new Array();	
	var aBaseInfo = new Array();	
	
	var nLy, nLm, nLd, sLflag;		// 전해온 음력 인자값을 저장할 년, 월, 일, 윤달여부 임시변수
	var nSy, nSm, nSd;				// 계산된 양력 년, 월, 일을 저장할 변수
	var y1, m1, i, j, y2, y3, mm, td;	    // 임시변수	
	var leap = false;
	
	if( isNull(sDate) )			return "";
	if( sDate.length != 9 )		return "";
	
	var sLflag = sDate.substr(0,1);
	var nLy = parseInt(sDate.substr(1,4), 10);
	var nLm = parseInt(sDate.substr(5,2), 10);
	var nLd = parseInt(sDate.substr(7,2), 10);
	if( nLy < 1841 || nLy > 2043 )			return "";
	if( sLflag != "0" && sLflag != "1" )	return "";
		
	aBaseInfo = _SolarBase();
	aMd = sMd.split(",");
	
	if( commDate_getIsLeapYear(sDate.substr(1,4)) == "Y" ){
						
		aMd[1] = 29;
	}else
		aMd[1] = 28;	
	
	y1 = nLy - 1841;
	m1 = nLm - 1;
	leap = 0;
	if( parseInt(aBaseInfo[y1*12 + m1]) > 2 )
		leap = (isLeaf(nLy)) ? 1 : 0;
	
	if( leap == 1 )
	{
		switch( parseInt(aBaseInfo[y1*12 + m1]) )
		{
			case 3 : mm = 29;
					 break;
			case 4 : mm = 30;
					 break;			
			case 5 : mm = 29;
					 break;			
			case 6 : mm = 30;
					 break;
		}
	}
	else
	{
		switch( parseInt(aBaseInfo[y1*12 + m1]) )
		{
			case 1 : mm = 29;
					 break;			
			case 2 : mm = 30;
					 break;			
			case 3 : mm = 29;
					 break;			
			case 4 : mm = 29;
					 break;			
			case 5 : mm = 30;
					 break;			
			case 6 : mm = 30;
					 break;			
		}
	}

	td = 0;
	for( i = 0 ; i <= y1 - 1 ; i++ )
	{
		for( j = 0 ; j <= 11 ; j++ )
		{
			switch( parseInt(aBaseInfo[i*12 + j]) )
			{
				case 1 : td = td + 29;
						 break;
				case 2 : td = td + 30;
						 break;				
				case 3 : td = td + 58;
						 break;				
				case 4 : td = td + 59;
						 break;				
				case 5 : td = td + 59;
						 break;				
				case 6 : td = td + 60;
						 break;				
			}
		}
	}

	for( j = 0 ; j <= m1 - 1 ; j++ )
	{
		switch( parseInt(aBaseInfo[y1*12 + j]) )
		{
			case 1 : td = td + 29;
					 break;			
			case 2 : td = td + 30;
					 break;						
			case 3 : td = td + 58;
					 break;						
			case 4 : td = td + 59;
					 break;						
			case 5 : td = td + 59;
					 break;						
			case 6 : td = td + 60;
					 break;						
		}
	}

	if( leap == 1 )
	{
		switch( parseInt(aBaseInfo[y1*12 + m1]) )
		{
			case 3 : mm = 29;
					 break;						
			case 4 : mm = 29;
					 break;						
			case 5 : mm = 30;
					 break;						
			case 6 : mm = 30;
					 break;						
		}
	}
	
	td = td + nLd + 22;
	
	if( sLflag == "1" )
	{
		switch( parseInt(aBaseInfo[y1*12 + m1]) )
		{
			case 3 : td = td + 29;
					 break;						
			case 4 : td = td + 30;
					 break;						
			case 5 : td = td + 29;
					 break;						
			case 6 : td = td + 30;
					 break;						
		}
	}
	
	y1 = 1840;
	do
	{
		y1 = y1 + 1;
		leap = commDate_getIsLeapYear(y1);
		
		if( leap == "Y" )
			y2 = 366;
		else
			y2 = 365;

		if( td <= y2 )
			break;
			
		td = td - y2;
	}
	while(1);

	nSy = y1;
	aMd[1] = y2 - 337;
	m1 = 0;
	do
	{
		m1 = m1 + 1;
		if( td <= parseInt(aMd[m1-1]) )
			break;
		td = td - parseInt(aMd[m1-1]);
	}
	while(1);
	
	nSm = m1;
	nSd = td;
	y3 = nSy;
	td = y3 * 365 + parseInt(y3/4) - parseInt(y3/100) + parseInt(y3/400);
	for( i = 0 ; i <= nSm - 1 ; i++ )
		td = td + parseInt(aMd[i]);

	td = td + nSd;

	return y3 + strRight("0" + nSm, 2)+strRight("0" + nSd, 2);
}

export function _SolarBase()
{
	var kk;
	
	//1841
	kk = "1,2,4,1,1,2,1,2,1,2,2,1,";
	kk += "2,2,1,2,1,1,2,1,2,1,2,1,";
	kk += "2,2,2,1,2,1,4,1,2,1,2,1,";
	kk += "2,2,1,2,1,2,1,2,1,2,1,2,";
	kk += "1,2,1,2,2,1,2,1,2,1,2,1,";
	kk += "2,1,2,1,5,2,1,2,2,1,2,1,";
	kk += "2,1,1,2,1,2,1,2,2,2,1,2,";
	kk += "1,2,1,1,2,1,2,1,2,2,2,1,";
	kk += "2,1,2,3,2,1,2,1,2,1,2,2,";
	kk += "2,1,2,1,1,2,1,1,2,2,1,2,";
	//1851
	kk += "2,2,1,2,1,1,2,1,2,1,5,2,";
	kk += "2,1,2,2,1,1,2,1,2,1,1,2,";
	kk += "2,1,2,2,1,2,1,2,1,2,1,2,";
	kk += "1,2,1,2,1,2,5,2,1,2,1,2,";
	kk += "1,1,2,1,2,2,1,2,2,1,2,1,";
	kk += "2,1,1,2,1,2,1,2,2,2,1,2,";
	kk += "1,2,1,1,5,2,1,2,1,2,2,2,";
	kk += "1,2,1,1,2,1,1,2,2,1,2,2,";
	kk += "2,1,2,1,1,2,1,1,2,1,2,2,";
	kk += "2,1,6,1,1,2,1,1,2,1,2,2,";
	//1861
	kk += "1,2,2,1,2,1,2,1,2,1,1,2,";
	kk += "2,1,2,1,2,2,1,2,2,3,1,2,";
	kk += "1,2,2,1,2,1,2,2,1,2,1,2,";
	kk += "1,1,2,1,2,1,2,2,1,2,2,1,";
	kk += "2,1,1,2,4,1,2,2,1,2,2,1,";
	kk += "2,1,1,2,1,1,2,2,1,2,2,2,";
	kk += "1,2,1,1,2,1,1,2,1,2,2,2,";
	kk += "1,2,2,3,2,1,1,2,1,2,2,1,";
	kk += "2,2,2,1,1,2,1,1,2,1,2,1,";
	kk += "2,2,2,1,2,1,2,1,1,5,2,1,";
	//1871
	kk += "2,2,1,2,2,1,2,1,2,1,1,2,";
	kk += "1,2,1,2,2,1,2,1,2,2,1,2,";
	kk += "1,1,2,1,2,4,2,1,2,2,1,2,";
	kk += "1,1,2,1,2,1,2,1,2,2,2,1,";
	kk += "2,1,1,2,1,1,2,1,2,2,2,1,";
	kk += "2,2,1,1,5,1,2,1,2,2,1,2,";
	kk += "2,2,1,1,2,1,1,2,1,2,1,2,";
	kk += "2,2,1,2,1,2,1,1,2,1,2,1,";
	kk += "2,2,4,2,1,2,1,1,2,1,2,1,";
	kk += "2,1,2,2,1,2,2,1,2,1,1,2,";
	//1881
	kk += "1,2,1,2,1,2,5,2,2,1,2,1,";
	kk += "1,2,1,2,1,2,1,2,2,1,2,2,";
	kk += "1,1,2,1,1,2,1,2,2,2,1,2,";
	kk += "2,1,1,2,3,2,1,2,2,1,2,2,";
	kk += "2,1,1,2,1,1,2,1,2,1,2,2,";
	kk += "2,1,2,1,2,1,1,2,1,2,1,2,";
	kk += "2,2,1,5,2,1,1,2,1,2,1,2,";
	kk += "2,1,2,2,1,2,1,1,2,1,2,1,";
	kk += "2,1,2,2,1,2,1,2,1,2,1,2,";
	kk += "1,5,2,1,2,2,1,2,1,2,1,2,";
	//1891
	kk += "1,2,1,2,1,2,1,2,2,1,2,2,";
	kk += "1,1,2,1,1,5,2,2,1,2,2,2,";
	kk += "1,1,2,1,1,2,1,2,1,2,2,2,";
	kk += "1,2,1,2,1,1,2,1,2,1,2,2,";
	kk += "2,1,2,1,5,1,2,1,2,1,2,1,";
	kk += "2,2,2,1,2,1,1,2,1,2,1,2,";
	kk += "1,2,2,1,2,1,2,1,2,1,2,1,";
	kk += "2,1,5,2,2,1,2,1,2,1,2,1,";
	kk += "2,1,2,1,2,1,2,2,1,2,1,2,";
	kk += "1,2,1,1,2,1,2,5,2,2,1,2,";
	//1901
	kk += "1,2,1,1,2,1,2,1,2,2,2,1,";
	kk += "2,1,2,1,1,2,1,2,1,2,2,2,";
	kk += "1,2,1,2,3,2,1,1,2,2,1,2,";
	kk += "2,2,1,2,1,1,2,1,1,2,2,1,";
	kk += "2,2,1,2,2,1,1,2,1,2,1,2,";
	kk += "1,2,2,4,1,2,1,2,1,2,1,2,";
	kk += "1,2,1,2,1,2,2,1,2,1,2,1,";
	kk += "2,1,1,2,2,1,2,1,2,2,1,2,";
	kk += "1,5,1,2,1,2,1,2,2,2,1,2,";
	kk += "1,2,1,1,2,1,2,1,2,2,2,1,";
	//1911
	kk += "2,1,2,1,1,5,1,2,2,1,2,2,";
	kk += "2,1,2,1,1,2,1,1,2,2,1,2,";
	kk += "2,2,1,2,1,1,2,1,1,2,1,2,";
	kk += "2,2,1,2,5,1,2,1,2,1,1,2,";
	kk += "2,1,2,2,1,2,1,2,1,2,1,2,";
	kk += "1,2,1,2,1,2,2,1,2,1,2,1,";
	kk += "2,3,2,1,2,2,1,2,2,1,2,1,";
	kk += "2,1,1,2,1,2,1,2,2,2,1,2,";
	kk += "1,2,1,1,2,1,5,2,2,1,2,2,";
	kk += "1,2,1,1,2,1,1,2,2,1,2,2,";
	//1921
	kk += "2,1,2,1,1,2,1,1,2,1,2,2,";
	kk += "2,1,2,2,3,2,1,1,2,1,2,2,";
	kk += "1,2,2,1,2,1,2,1,2,1,1,2,";
	kk += "2,1,2,1,2,2,1,2,1,2,1,1,";
	kk += "2,1,2,5,2,1,2,2,1,2,1,2,";
	kk += "1,1,2,1,2,1,2,2,1,2,2,1,";
	kk += "2,1,1,2,1,2,1,2,2,1,2,2,";
	kk += "1,5,1,2,1,1,2,2,1,2,2,2,";
	kk += "1,2,1,1,2,1,1,2,1,2,2,2,";
	kk += "1,2,2,1,1,5,1,2,1,2,2,1,";
	//1931
	kk += "2,2,2,1,1,2,1,1,2,1,2,1,";
	kk += "2,2,2,1,2,1,2,1,1,2,1,2,";
	kk += "1,2,2,1,6,1,2,1,2,1,1,2,";
	kk += "1,2,1,2,2,1,2,2,1,2,1,2,";
	kk += "1,1,2,1,2,1,2,2,1,2,2,1,";
	kk += "2,1,4,1,2,1,2,1,2,2,2,1,";
	kk += "2,1,1,2,1,1,2,1,2,2,2,1,";
	kk += "2,2,1,1,2,1,4,1,2,2,1,2,";
	kk += "2,2,1,1,2,1,1,2,1,2,1,2,";
	kk += "2,2,1,2,1,2,1,1,2,1,2,1,";
	//1941
	kk += "2,2,1,2,2,4,1,1,2,1,2,1,";
	kk += "2,1,2,2,1,2,2,1,2,1,1,2,";
	kk += "1,2,1,2,1,2,2,1,2,2,1,2,";
	kk += "1,1,2,4,1,2,1,2,2,1,2,2,";
	kk += "1,1,2,1,1,2,1,2,2,2,1,2,";
	kk += "2,1,1,2,1,1,2,1,2,2,1,2,";
	kk += "2,5,1,2,1,1,2,1,2,1,2,2,";
	kk += "2,1,2,1,2,1,1,2,1,2,1,2,";
	kk += "2,2,1,2,1,2,3,2,1,2,1,2,";
	kk += "2,1,2,2,1,2,1,1,2,1,2,1,";
	//1951
	kk += "2,1,2,2,1,2,1,2,1,2,1,2,";
	kk += "1,2,1,2,4,2,1,2,1,2,1,2,";
	kk += "1,2,1,1,2,2,1,2,2,1,2,2,";
	kk += "1,1,2,1,1,2,1,2,2,1,2,2,";
	kk += "2,1,4,1,1,2,1,2,1,2,2,2,";
	kk += "1,2,1,2,1,1,2,1,2,1,2,2,";
	kk += "2,1,2,1,2,1,1,5,2,1,2,2,";
	kk += "1,2,2,1,2,1,1,2,1,2,1,2,";
	kk += "1,2,2,1,2,1,2,1,2,1,2,1,";
	kk += "2,1,2,1,2,5,2,1,2,1,2,1,";
	//1961
	kk += "2,1,2,1,2,1,2,2,1,2,1,2,";
	kk += "1,2,1,1,2,1,2,2,1,2,2,1,";
	kk += "2,1,2,3,2,1,2,1,2,2,2,1,";
	kk += "2,1,2,1,1,2,1,2,1,2,2,2,";
	kk += "1,2,1,2,1,1,2,1,1,2,2,1,";
	kk += "2,2,5,2,1,1,2,1,1,2,2,1,";
	kk += "2,2,1,2,2,1,1,2,1,2,1,2,";
	kk += "1,2,2,1,2,1,5,2,1,2,1,2,";
	kk += "1,2,1,2,1,2,2,1,2,1,2,1,";
	kk += "2,1,1,2,2,1,2,1,2,2,1,2,";
	//1971
	kk += "1,2,1,1,5,2,1,2,2,2,1,2,";
	kk += "1,2,1,1,2,1,2,1,2,2,2,1,";
	kk += "2,1,2,1,1,2,1,1,2,2,2,1,";
	kk += "2,2,1,5,1,2,1,1,2,2,1,2,";
	kk += "2,2,1,2,1,1,2,1,1,2,1,2,";
	kk += "2,2,1,2,1,2,1,5,2,1,1,2,";
	kk += "2,1,2,2,1,2,1,2,1,2,1,1,";
	kk += "2,2,1,2,1,2,2,1,2,1,2,1,";
	kk += "2,1,1,2,1,6,1,2,2,1,2,1,";
	kk += "2,1,1,2,1,2,1,2,2,1,2,2,";
	//1981
	kk += "1,2,1,1,2,1,1,2,2,1,2,2,";
	kk += "2,1,2,3,2,1,1,2,2,1,2,2,";
	kk += "2,1,2,1,1,2,1,1,2,1,2,2,";
	kk += "2,1,2,2,1,1,2,1,1,5,2,2,";
	kk += "1,2,2,1,2,1,2,1,1,2,1,2,";
	kk += "1,2,2,1,2,2,1,2,1,2,1,1,";
	kk += "2,1,2,2,1,5,2,2,1,2,1,2,";
	kk += "1,1,2,1,2,1,2,2,1,2,2,1,";
	kk += "2,1,1,2,1,2,1,2,2,1,2,2,";
	kk += "1,2,1,1,5,1,2,1,2,2,2,2,";
	//1991
	kk += "1,2,1,1,2,1,1,2,1,2,2,2,";
	kk += "1,2,2,1,1,2,1,1,2,1,2,2,";
	kk += "1,2,5,2,1,2,1,1,2,1,2,1,";
	kk += "2,2,2,1,2,1,2,1,1,2,1,2,";
	kk += "1,2,2,1,2,2,1,5,2,1,1,2,";
	kk += "1,2,1,2,2,1,2,1,2,2,1,2,";
	kk += "1,1,2,1,2,1,2,2,1,2,2,1,";
	kk += "2,1,1,2,3,2,2,1,2,2,2,1,";
	kk += "2,1,1,2,1,1,2,1,2,2,2,1,";
	kk += "2,2,1,1,2,1,1,2,1,2,2,1,";
	//2001
	kk += "2,2,2,3,2,1,1,2,1,2,1,2,";
	kk += "2,2,1,2,1,2,1,1,2,1,2,1,";
	kk += "2,2,1,2,2,1,2,1,1,2,1,2,";
	kk += "1,5,2,2,1,2,1,2,2,1,1,2,";
	kk += "1,2,1,2,1,2,2,1,2,2,1,2,";
	kk += "1,1,2,1,2,1,5,2,2,1,2,2,";
	kk += "1,1,2,1,1,2,1,2,2,2,1,2,";
	kk += "2,1,1,2,1,1,2,1,2,2,1,2,";
	kk += "2,2,1,1,5,1,2,1,2,1,2,2,";
	kk += "2,1,2,1,2,1,1,2,1,2,1,2,";
	//2011
	kk += "2,1,2,2,1,2,1,1,2,1,2,1,";
	kk += "2,1,6,2,1,2,1,1,2,1,2,1,";
	kk += "2,1,2,2,1,2,1,2,1,2,1,2,";
	kk += "1,2,1,2,1,2,1,2,5,2,1,2,";
	kk += "1,2,1,1,2,1,2,2,2,1,2,2,";
	kk += "1,1,2,1,1,2,1,2,2,1,2,2,";
	kk += "2,1,1,2,3,2,1,2,1,2,2,2,";
	kk += "1,2,1,2,1,1,2,1,2,1,2,2,";
	kk += "2,1,2,1,2,1,1,2,1,2,1,2,";
	kk += "2,1,2,5,2,1,1,2,1,2,1,2,";
	//2021
	kk += "1,2,2,1,2,1,2,1,2,1,2,1,";
	kk += "2,1,2,1,2,2,1,2,1,2,1,2,";
	kk += "1,5,2,1,2,1,2,2,1,2,1,2,";
	kk += "1,2,1,1,2,1,2,2,1,2,2,1,";
	kk += "2,1,2,1,1,5,2,1,2,2,2,1,";
	kk += "2,1,2,1,1,2,1,2,1,2,2,2,";
	kk += "1,2,1,2,1,1,2,1,1,2,2,2,";
	kk += "1,2,2,1,5,1,2,1,1,2,2,1,";
	kk += "2,2,1,2,2,1,1,2,1,1,2,2,";
	kk += "1,2,1,2,2,1,2,1,2,1,2,1,";
	//2031
	kk += "2,1,5,2,1,2,2,1,2,1,2,1,";
	kk += "2,1,1,2,1,2,2,1,2,2,1,2,";
	kk += "1,2,1,1,2,1,5,2,2,2,1,2,";
	kk += "1,2,1,1,2,1,2,1,2,2,2,1,";
	kk += "2,1,2,1,1,2,1,1,2,2,1,2,";
	kk += "2,2,1,2,1,4,1,1,2,1,2,2,";
	kk += "2,2,1,2,1,1,2,1,1,2,1,2,";
	kk += "2,2,1,2,1,2,1,2,1,1,2,1,";
	kk += "2,2,1,2,5,2,1,2,1,2,1,1,";
	kk += "2,1,2,2,1,2,2,1,2,1,2,1,";
	//2041
	kk += "2,1,1,2,1,2,2,1,2,2,1,2,";
	kk += "1,5,1,2,1,2,1,2,2,2,1,2,";
	kk += "1,2,1,1,2,1,1,2,2,1,2,2";
	
	var arr = new Array();
	arr = kk.split(",");
	
	return arr;
}