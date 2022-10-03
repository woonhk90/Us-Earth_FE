import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/color";
import imageCompression from "browser-image-compression";
import { useDispatch } from "react-redux";
import { __proFileChange } from '../../redux/modules/mypageSlice';
import ImageLoading from "../etc/ImageLoading";

const MyPageProfileModal = (props) => {
	const dispatch = useDispatch();
	// const { clickSubmit, closeModal } = props;
	const { closeModal } = props;

	// const submitonClick = (id) => {
	// 	// clickSubmit();
	// 	closeModal();
	// };

	const [imageFile, setImageFile] = React.useState([]);
	const [isPhotoMessage, setIsPhotoMessage] = React.useState(""); // 에러메세지
	const [previewImg, setPreviewImg] = React.useState([]); // 파일 읽기 결과 저장
	const [upLoading, setUploading] = React.useState(100); // 업로드 퍼센트

	const onChangeImg = async (e) => {
		setIsPhotoMessage('');
		const acceptImageFiles = ["image/png", "image/jpeg", "image/jpg"];//허용확장자
		const imageFile = e.target.files[0];//업로드한파일
		if (acceptImageFiles.includes(imageFile.type)) {//확장자일치여부
			if (imageFile.size < 2100000) {//파일크기는 20mb까지
				const options = {
					maxSizeMB: 1, // 허용하는 최대 사이즈 지정
					maxWidthOrHeight: 1920, // 허용하는 최대 width, height 값 지정
					useWebWorker: true, // webworker 사용 여부(기본값:true)
					onProgress: (data) => { // 업로드 퍼센트
						setUploading(data);
					}
				}
				try {
					const compressedFile = await imageCompression(imageFile, options);//압축
					let reader = new FileReader();
					reader.readAsDataURL(compressedFile);//파일 읽기
					setImageFile(compressedFile);
					reader.onloadend = () => { // 읽기가 완료됐을 때 실행되는 이벤트 핸들러 (성공/실패와 상관없이)
						setPreviewImg([reader.result]); // 읽기 결과 저장
					};
					const convertedBlobFile = new File([compressedFile], imageFile.name, { type: imageFile.type, lastModified: Date.now() });
					setImageFile(convertedBlobFile);
				} catch (error) {
					setIsPhotoMessage("오류가 발생했습니다. 다시 업로드해주세요.");
				}
			} else { setIsPhotoMessage('20mb이하의 이미지만 가능합니다.'); }
		} else {
			setIsPhotoMessage('지원하지 않는 파일 형식입니다.');
		}
	}

	const onSubmitHandler = async () => {
		if (imageFile.length <= 0) { setIsPhotoMessage('이미지를 선택해주세요.'); return false; }
		let formData = new FormData();
		formData.append("multipartFile", imageFile);
		await dispatch(__proFileChange(formData));
		closeModal();
	}
	return (
		<>
			<ModalWrap onClick={closeModal}>
				<ModalBody onClick={(e) => { e.stopPropagation(); }} >
					<ContentWrap>
						<ModalTitle>프로필 이미지</ModalTitle>
						<ImgBox>
							{previewImg.length > 0 ? <img src={previewImg} alt="img" /> : <img src={props.imgSrc} alt="imgSrc" />}
							{upLoading < 100 ? (
								<Container>
									<LoadingPosition>
										<ImageLoading />
									</LoadingPosition>
								</Container>
							) : null}
						</ImgBox>
						<ProfileForm encType='multipart/form-data'>
							<ProfileLabel className="input-file-button" htmlFor='file'>이미지 업로드</ProfileLabel>
							<ProfileInput multiple type='file' id='file' accept='image/jpg, image/jpeg, image/png' onChange={(e) => { onChangeImg(e); e.target.value = ""; }} />
						</ProfileForm>
						<ErrorMsg>{isPhotoMessage}</ErrorMsg>
					</ContentWrap>
					<ModalButton>
						<div onClick={closeModal}>취소</div>
						<div onClick={onSubmitHandler}>등록</div>
					</ModalButton>

				</ModalBody>
			</ModalWrap>
		</>
	);
};
export default MyPageProfileModal;

const ModalWrap = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 0 15px;
  box-sizing: border-box;
`;
const ModalBody = styled.div`
  width: 100%;

  background-color: #fff;
  border-radius: 12px;
`;




const ContentWrap = styled.div`
	padding:35px 15px;
	box-sizing:border-box;
`;
const ModalTitle = styled.p`
	text-align:center;
	font-family:'Noto sans KR','sans-serif';
	font-weight:700;
	line-height:35px;
	font-size:25px;
	margin-bottom:25px;
`;
const ImgBox = styled.div`
	width:125px;
	height:125px;
	margin:0 auto 10px;
	border-radius: 50%;
	display:flex;
	justify-content:center;
	align-items:center;
	
	position:relative;
	top:0;
	left:0;
	img{
		width:100%;
		height:100%;
		object-fit: cover;
		border-radius:50%;
	}
`;
const Container = styled.div`
  position: absolute;
  background-size: contain;
  background-position: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  z-index: 999;
  background-color:rgba(0,0,0,0.25);
  align-items: center;
`;
const LoadingPosition = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;









const ProfileForm = styled.form`
	text-align:center;
`;
const ProfileLabel = styled.label`
  color: ${colors.gray9B};
	border-bottom:1px solid ${colors.gray9B};
  cursor: pointer;
`;
const ProfileInput = styled.input`
  display:none;
`;
const ErrorMsg = styled.p`
	font-size:10px;
	text-align:center;
	height:10px;
	color:red;
	line-height:25px;
`;










const ModalButton = styled.div`
	display:flex;
	justify-content: center;
	align-items: center;
	border-top:1px solid ${colors.HR};
	div{
		width:100%;
		text-align:center;
		cursor:pointer;
		font-size:20px;
		line-height:28px;
		font-weight:600;
		font-family:'Noto sans KR','sans-serif';
		padding:17px 0%;
	}
	div:nth-child(1){
		border-right:1px solid ${colors.HR};
	}
	div:nth-child(2){
		border-left:1px solid ${colors.HR};
	}
`;