import React from 'react';
import style from '../css/style.module.css'


class SharePopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: props.url,
        };
        this.popupCopyButton = this.popupCopyButton.bind(this)
        this.popupCloseButton = this.popupCloseButton.bind(this)
    }

    componentDidMount() {
        window.addEventListener("click", this.handleMouseClick);
    }
    componentWillUnmount() {
        window.removeEventListener("click", this.handleMouseClick);
    }


    popupCopyButton() {

        // this.setState({
        //     close: true
        // }, ()=>{

        //     setTimeout(()=>{ 
        //         this.setState({
        //             close: false
        //         })
        //     }, 500);
        // })
        navigator.clipboard.writeText(this.props.url)
        this.setState({
            copied: true
        })
        setTimeout(() => {
            this.props.closeFunction()
            this.setState({
                copied: false
            })
        }, 2500);


        // alert("Copied the text: ");

    }

    popupCloseButton() {

        // this.setState({
        //     close: true,
        //     display: 'none'
        // }, ()=>{

        // setTimeout(()=>{ 
        //     this.setState({
        //         close: false
        //     })
        // }, 2000);
        // })
        this.props.closeFunction()
    }

    render() {
        // console.log("aaa", this.props.display)
        // var display = this.props.display
        // if (this.state.close){
        //     display = 'none'
        //     // this.props.display = 'none'
        // }
        // } else {
        //     var display = this.state.display
        // }
        var popStyle = style.popup
        var infoDipsplay = 'block'
        var textDipsplay = 'none'
        if (this.state.copied) {
            popStyle = style.popupFadeOut
            var infoDipsplay = 'none'
            var textDipsplay = 'block'
        }
        return (
            <div className={popStyle} style={{ display: this.props.display }}>
                <button className={style.popupCloseButton} onClick={this.popupCloseButton} style ={{display:infoDipsplay}} >X</button>
                <h1 className={style.popupTitle } style={{display:infoDipsplay}}> Copy & Share Link</h1>

                <textarea disabled className={style.popupTextArea} rows="1" style ={{display:infoDipsplay}}>
                    {this.props.url}
                </textarea>
                <button className={style.popupCopyButton} onClick={this.popupCopyButton} style ={{display:infoDipsplay}}>Copy Link</button>
                <h1 className = {style.popupCopied} style ={{display:textDipsplay}}> Copied </h1>
            </div>
        )
    }
}

export default SharePopup;