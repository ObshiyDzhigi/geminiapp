import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {
    const { onSent, recentPrompt,setRecentPrompt,setPrevPrompts, showResult, loading, resultData, setInput, input } = useContext(Context)
    
    return (
        <div className='main'>
            <div className="nav">
                <p><span>Harmonia</span></p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hello, friend</span></p>
                            <p>Need a free advice? I can help you with that.</p>
                        </div>
                        <div className="cards">
                            <div className="card"  onClick={() => {onSent("Help me understand and cope with anxiety?"); setRecentPrompt("Help me understand and cope with anxiety?"); setPrevPrompts(["Help me understand and cope with anxiety?"]) }}>
                                <p>Help me understand and cope with anxiety</p>
                                <img src={assets.first} alt="" />
                            </div>
                            <div className="card"  onClick={() => {onSent("Strategies for dealing with depression?"); setRecentPrompt("Strategies for dealing with depression?"); setPrevPrompts(["Strategies for dealing with depression?"])}}>
                                <p>Strategies for dealing with depression</p>
                                <img src={assets.second} alt="" />
                            </div>
                            <div className="card"  onClick={() => {onSent("How to manage stress effectively?"); setRecentPrompt("How to manage stress effectively?");  setPrevPrompts(["How to manage stress effectively?"])}}>
                                <p>How to manage stress effectively</p>
                                <img src={assets.third} alt="" />
                            </div>
                            <div className="card"  onClick={() => {onSent("Techniques for improving self-esteem?"); setRecentPrompt("Techniques for improving self-esteem?");  setPrevPrompts(["Techniques for improving self-esteem?"])}}>
                                <p>Techniques for improving self-esteem</p>
                                <img src={assets.fourth} alt="" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading ? (
                                <div className='loader'>
                                    
                                </div>
                            ) : (
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            )}
                        </div>
                    </div>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                    <input 
                        onChange={(e) => setInput(e.target.value)} 
                        value={input} 
                        type="text" 
                        placeholder="Ask anything you want, I'm here to help you with any problem! "
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                onSent();
                            }
                        }}
                    />                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null }
                        </div>
                    </div>
                    <p className="bottom-info">
                        Please note that while Harmonia strives to provide helpful advice, it's important to seek professional guidance for serious mental health issues. Remember to take care of yourself, and reach out to a trusted therapist or counselor if needed. Your well-being is important to us.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main
