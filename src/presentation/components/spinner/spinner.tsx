import React from 'react'
import S from './spinner-styles.scss'

type SpinnerProps = React.HTMLAttributes<HTMLElement> & { className: string }

const Spinner: React.FC<SpinnerProps> = ({ className, ...props}) => {
	return (
		<div {...props} className={[S.spinner, className].join(' ')}>
			<div></div><div></div><div></div><div></div>
		</div>
	);
}
 
export default Spinner
