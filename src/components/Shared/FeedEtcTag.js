import styled from "styled-components";





const ETCTag = styled.div`
    width: 250px;
    height: 26px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;

    p {
        height:12px;
        margin: 0 5px;
    }

    svg{
        overflow: visible;
        height:14px;
        color: #ffffff00;

        path{
            stroke: rgb(194 194 194);
        }
    }

    div{
        cursor: pointer;
        box-sizing: border-box;

        display: flex;
        padding: 7px 5px;
        margin-right: 10px;
        border-radius: 16px;
        font-size: 12px;
        line-height: 12px;
        white-space: nowrap;
        background-color: rgb(194 194 194 / 15%);
        border: 1px solid rgb(194 194 194 / 30%);
        color: #000000b3;

        &:hover {
            background-color: rgb(178 195 255 / 30%);
            border: 1px solid #0037ff33;
            color: #0037ff;
            
    
            path{
                stroke: #0037ff;
            }
        }
    }

    @media all and (max-width:767px) {
        width: calc(97vw / 2 - 32px);
        height: 21px;

        p {
            height:10px;
        }
        
        div{
            padding: 5px;
            font-size: 10px;
            line-height: 10px;
            margin-right: 5px;
        }

        svg{
            height:11px;
        }
    }
`;

    const GenderTag = styled.div`
    `;

    const CategoryTag = styled.div`
    `;

    const CommentTag = styled.div`
    `;

const FeedEtcTag = ({ gender, category, totalComments }) => {
  return <ETCTag>
            <GenderTag><p>{gender}</p></GenderTag>
            <CategoryTag>
                <p>{category}</p></CategoryTag>
            <CommentTag>
                <svg viewBox="0 0 31 29" focusable="false">
                    <path d="M7.79167 8.33335H23.2083M7.79167 14.5H13.9583M15.5 26.8333L9.33333 20.6667H4.70833C3.00546 20.6667 1.625 19.2862 1.625 17.5834V5.25002C1.625 3.54714 3.00546 2.16669 4.70833 2.16669H26.2917C27.9945 2.16669 29.375 3.54714 29.375 5.25002V17.5834C29.375 19.2862 27.9945 20.6667 26.2917 20.6667H21.6667L15.5 26.8333Z" 
                    fill="currentColor" stroke="#ACACAC" strokeWidth="2.73397" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p>{totalComments?.toLocaleString("ko-KR")}</p></CommentTag>
          </ETCTag>
    ;
  };

export default FeedEtcTag;