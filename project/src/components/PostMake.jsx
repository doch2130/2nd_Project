import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { modalClose } from '../store/modules/modal';
import { useForm } from "react-hook-form";
import { postAdd } from '../store/modules/postData';
import style from './PostMake.module.css';

export default function PostMake() {
  const dispatch = useDispatch();
  const {getValues, setValue,  register, handleSubmit, formState: { isSubmitting, errors }} = useForm({mode: 'onChange'});

  const [imageUrl, setImageUrl] = useState('');

  const modalCloseHandler = () => {
    dispatch(modalClose());
  }

  const imageFileUpload = (e) => {
    // console.log('e ', e.target.files);
    const file = e.target.files[0];
    // console.log('file ', file);

    if(e.target.files.length === 0) {
      return ;
    }

    if(imageUrl !== '') {
      setImageUrl('');
      URL.revokeObjectURL(imageUrl);
    }

    const currentImageUrl = URL.createObjectURL(file);
    setImageUrl(currentImageUrl);
    setValue('postImage', file);
    return ;
  }

  const onSubmit = async (data) => {
    // const formData = new FormData();
        // formData.append('data', JSON.stringify(data));
        // formData.append('postImage', getValues('postImage'));
        // console.log('formData ', formData);
    if(window.confirm('작성한 내용으로 등록하시겠습니까?')) {
      // console.log('data ', data);
      try {
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        formData.append('postImage', getValues('postImage'));
        // console.log('formData ', formData);
        const result = await axios.post('/post/data/add2', formData);
        // console.log('result ', result);
        dispatch(postAdd(result.data));
        modalCloseHandler();
      } catch (err) {
        alert('에러가 발생하였습니다.\r\n새로고침 후 다시 시도해주세요');
      }
    }
  }

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageUrl);
    }
  }, [imageUrl]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={style.wrap}>
        <h2>게시글 등록하기</h2>
        <div className={style.wrapPreview}>
          {imageUrl !== '' ? <img src={imageUrl} alt='postImage' /> :
          <div className={style.imageEmpty}></div>}
        </div>
        <div className={style.filebox}>
          <label htmlFor='fileUploadButton'>사진 업로드</label>
          <input type="file" id="fileUploadButton" accept="image/*" multiple={false} onChange={imageFileUpload}/>
        </div>
        <div className={style.body}>
          <h4>내용 입력</h4>
          <div className={style.content}>
            <textarea {...register('content')}
            style={{resize: 'none'}} />
          </div>
        </div>
        <div className={style.buttonGroup}>
          <button type='button' onClick={modalCloseHandler}>취소</button>
          <button type='button' onClick={handleSubmit(onSubmit)}>등록</button>
        </div>
      </div>
    </form>
  )
}
