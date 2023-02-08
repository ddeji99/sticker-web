import styled from "styled-components";
import React, {useCallback, useState, useEffect, useRef } from 'react';


const ConditionsBody = styled.div`
    width: 100%;
    h3{
        line-height: 22px;
        padding-bottom: 12px;
        font-size: 16px;
        letter-spacing: -.27px;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
    }
    p{
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }
    svg{
        width: 24px; 
        height: 24px; 
        fill-rule: evenodd; 
        clip-rule: evenodd;
    }
    .dropdown_content {
        padding: 20px 0;
        border-bottom: 1px solid #ebebeb;
        font-size: 13px;
        line-height: 20px;
        letter-spacing: -.07px;
        color: rgba(34,34,34,.8);
    }
    .emphasis_box {
        font-weight: bold;
    }
    .content_list {
        margin-top: 20px;
        list-style: none;
    }
    .main_txt {
        margin-top: 10px;
    }

`;

const ConditionDropdown = styled.div`
    display: flex;
    flex-direction: column;
    border-top: 1px solid #ebebeb;
`;
const DropdownHead = styled.div`
    box-sizing: border-box; 
    padding: 8px 0 7px;
    display: -webkit-box;
    display: flex;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    border-bottom: 1px solid #ebebeb;
    cursor: pointer;
`;


function OrderConditions() {

    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);

    const handleOpen = () => {
        setOpen(!open);
      };
    
    const handleOpen2 = () => {
        setOpen2(!open2);
      };

    return (
            <ConditionsBody>
                <h3>구매 전 꼭 확인해주세요!</h3>
                <ConditionDropdown>
                    <DropdownHead onClick={handleOpen}>
                        <p  className='title'>
                            배송 기간 안내
                        </p>
                        {open ? <div><svg xmlns="http://www.w3.org/2000/svg"><path d="M23.245 20l-11.245-14.374-11.219 14.374-.781-.619 12-15.381 12 15.391-.755.609z"/></svg></div> : <div><svg xmlns="http://www.w3.org/2000/svg"><path d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z"/></svg></div>}
                    </DropdownHead>
                    {open ? (
                            <div  className='dropdown_content'>
                                <div  className='emphasis_box'>
                                    <strong  className='emphasis'>
                                        저희 STICKERS는 최대한 빠르게 모든 상품을 배송하기 위해 노력하고 있습니다.<br/>
                                        고객님의 상품 재고및 수급상황에 따라 차이가 있습니다.
                                    </strong>
                                </div>
                                <ul  className='content_list'>
                                    <li  className='content_item'>
                                        <p  className='title_txt'>
                                                [배송정보] 
                                        </p>
                                    </li>
                                    <li  className='content_item'>
                                        <p  className='main_txt'>
                                                - 결제 2일 이내 출고를 하고있습니다. 지연 또는 품절시 본사 매니저가 직접 연락하여 안내드리고 있습니다.
                                        </p>
                                    </li>
                                    <li  className='content_item'>
                                        <p  className='main_txt'>
                                                - 결제 후  배송정보 조회는 📌 [
                                            <a  target='_blank' href='https://www.second.sticker.ooo/myorder' className='txt_link'>
                                                 빠른배송 안내 
                                            </a>
                                                ]  또는 고객센터로 연락 부탁드립니다.
                                        </p>
                                    </li>
                                    <li  className='content_item'>
                                        <p  className='title_txt'>
                                                [구매시 유의사항] 
                                        </p>
                                    </li>
                                    <li  className='content_item'>
                                        <p  className='main_txt'>
                                                - 상품 이미지는 모니터 해상도, 색상 설정에 따라 이미지가 왜곡되거나 실제 색상과 차이가 있을 수 있습니다.
                                        </p>
                                    </li>
                                    <li  className='content_item'>
                                        <p  className='main_txt'>
                                                - 주문하신 상품은 결제 완료 후 2영업일 이내에 검수를 완료합니다.
                                                검수 합격시 배송을 시작합니다. 
                                        </p>
                                        <p  className='sub_txt'>
                                            * 사이즈 실측은 상품의 특성 및 측정방식에 따라 오차가 발생할 수 있습니다.
                                        </p>
                                    </li>
                                    <li  className='content_item'>
                                        <p  className='main_txt'>
                                                - 검수센터 출고는 매 영업일에 진행하고 있으며, 출고 마감시간은 오후 1시입니다.
                                                출고 마감시간 이후 주문 완료건은 운송장번호는 입력되지만 다음 영업일에 출고됩니다. 
                                        </p>
                                    </li>
                                </ul>
                            </div>
                            ) : null}
                
                <DropdownHead onClick={handleOpen2}>
                    <p  className='title'>
                        구매 환불/취소/교환 안내
                    </p>
                    {open2 ? <div><svg xmlns="http://www.w3.org/2000/svg"><path d="M23.245 20l-11.245-14.374-11.219 14.374-.781-.619 12-15.381 12 15.391-.755.609z"/></svg></div> : <div><svg xmlns="http://www.w3.org/2000/svg"><path d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z"/></svg></div>}
                </DropdownHead>
                {open2 ? (
                        <div  className='dropdown_content'>
                            <div  className='emphasis_box'>
                                <strong  className='emphasis'>
                                    스티커는 기본적으로 대한민국 내 제주도 및 도서 산간 지역 포함 전 지역, 전 상품 무료배송입니다.
                                </strong>
                            </div>
                            <ul  className='content_list'>
                                <li  className='content_item'>
                                    <p  className='main_txt'>
                                        - 단순 변심이나 실수에 의한 취소/교환/반품이 부분적으로 가능합니다.  📌
                                        <a  target='_blank' href='https://www.second.sticker.ooo/delivery-info' className='txt_link'>
                                           [ 배송 안내 ]
                                        </a>
                                    </p>
                                </li>
                                <li  className='content_item'>
                                    <p  className='main_txt'>
                                        - 상품 수령 후, 이상이 있는 경우 5일 이내에 스티커 고객센터로 문의해주시기 바랍니다. 
                                    </p>
                                </li>
                            </ul>
                            <div  className='emphasis_box'>
                                <strong  className='emphasis'>
                                    반품 접수기간 및 처리기간은 어떻게 되나요?
                                </strong>
                            </div>
                            <ul  className='content_list'>
                                <li  className='content_item'>
                                    <p  className='main_txt'>
                                        - 상품 수령하신 후 교환 및 반품을 원하실 경우에는 수령 후 5일 이내 고객센터(게시판 or 콜센터 문의)로
                                        사전 접수 부탁드리며 (고객센터 전화 연결이 어려우실 경우, 게시판으로 문의 부탁드립니다)
                                        반품시에는 대한통운으로 꼭 보내주셔야 합니다! 문의하시면 저희쪽에서 신청해드립니다!<br/>
                                        착불 접수해서 보내주실 경우 대한통운 택배와 스티커가 계약된 운임비로 적용이 불가하여
                                        발생하는 추가 운임비용은 고객님께서 부담해주셔야 되는 점 참고 부탁드립니다. 📌
                                        <a  target='_blank' href='https://www.second.sticker.ooo/delivery-info' className='txt_link'>
                                           [ 배송 안내 ]
                                        </a>
                                    </p>
                                </li>
                            </ul>
                            <div  className='emphasis_box'>
                                <strong  className='emphasis'>
                                    교환하고 싶어요.
                                </strong>
                            </div>
                            <ul  className='content_list'>
                                <li  className='content_item'>
                                    <p  className='main_txt'>
                                        - 상품 발송 이전에 고객센터(콜센터/게시글)로 교환 접수 후 수령일로부터
                                        5일 이내 대한통운택배로 신청하여 보내주세요.<br/>
                                        교환시 발생하는 차액/잔액과 교환 절차를 안내해드립니다. 📌
                                        <a  target='_blank' href='https://www.second.sticker.ooo/delivery-info' className='txt_link'>
                                           [ 배송 안내 ]
                                        </a>
                                    </p>
                                </li>
                            </ul>
                            <div  className='emphasis_box'>
                                <strong  className='emphasis'>
                                    주문취소하고 싶어요.
                                </strong>
                            </div>
                            <ul  className='content_list'>
                                <li  className='content_item'>
                                    <p  className='main_txt'>
                                    -발송전인 주문건에 한하여 취소가 가능하며, 이미 배송처리된 주문건은 취소가 부분 가능 합니다.<br/>
                                    -주문취소&amp; 변경 카테고리에 남기지 않는 경우, 처리가 늦어져 상품이 발송될 수 있습니다.<br/>
                                    -주문취소의 경우 주문건에서 직접 취소처리하시면 확인이 어려우니 게시판&amp; 전화로 문의부탁드립니다.<br/>
                                    -배송전 상품을 변경하실 경우 재고 여부에 따라 배송이 지연될 수 있으니 이점 양해 부탁드립니다.<br/>
                                    -입금 전 주문 건은 5일 안으로 미입금시 자동으로 취소됩니다. 📌
                                        <a  target='_blank' href='https://www.second.sticker.ooo/delivery-info' className='txt_link'>
                                           [ 배송 안내 ]
                                        </a>
                                    </p>
                                </li>
                            </ul>
                        </div>
                        ) : null}
            </ConditionDropdown>
            </ConditionsBody>
    )
}

export default OrderConditions;

