import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

beforeEach(()=>{
    render(<ContactForm/>)
})
describe('Form Component',()=>{

    test('renders without errors', () => {
        render(<ContactForm/>)
    });
    
    test('renders the contact form header', () => {
        screen.getByText('Contact Form')
    });
    
    test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
        const firstInput =screen.getByLabelText('First Name*')
        
        fireEvent.change(firstInput,{target:{value:'abcd'}})
        // screen.debug()
        const errors = screen.getAllByTestId('error')
        expect(errors).toHaveLength(1)
    });
    
    test('renders THREE error messages if user enters no values into any fields.', async () => {
       const SubmitBtn = screen.getByRole('button')
       fireEvent.click(SubmitBtn)
       const errors = screen.getAllByTestId('error')
        expect(errors).toHaveLength(3)
    });
    
    test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
        const firstInput =screen.getByLabelText('First Name*')
        const secondInput =screen.getByLabelText('Last Name*')
        fireEvent.change(firstInput,{target:{value:'abcde'}})
        fireEvent.change(secondInput,{target:{value:'abcdefg'}})
        const SubmitBtn = screen.getByRole('button')
        fireEvent.click(SubmitBtn)
        const errors = screen.getAllByTestId('error')
        expect(errors).toHaveLength(1)
        
    });
    
    test('renders "email must be a valid email address" if an invalid email is entered', async () => {
        const email = screen.getByLabelText('Email*')
        fireEvent.change(email,{target:{value:'abc'}})
        const errors = screen.getByText(/email must be a valid email address/i)
        expect(errors).toBeVisible()
    });
    
    test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
        const SubmitBtn = screen.getByRole('button')
        fireEvent.click(SubmitBtn)
        const errors = screen.getByText(/lastName is a required field/i)
        expect(errors).toBeVisible()
    });
    
    test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
        const firstInput =screen.getByLabelText('First Name*')
        const secondInput =screen.getByLabelText('Last Name*')
        const email = screen.getByLabelText('Email*')
        fireEvent.change(firstInput,{target:{value:'abcde'}})
        fireEvent.change(secondInput,{target:{value:'abcdefgh'}})
        fireEvent.change(email,{target:{value:'abcde@gmail.com'}})
        const SubmitBtn = screen.getByRole('button')
        fireEvent.click(SubmitBtn)
       
        expect(screen.getByTestId('firstnameDisplay')).toBeInTheDocument
        expect(screen.getByTestId('lastnameDisplay')).toBeInTheDocument
        expect(screen.getByTestId('emailDisplay')).toBeInTheDocument
        expect(screen.queryByTestId('messageDisplay')).not.toBeInTheDocument

    });
    
    test('renders all fields text when all fields are submitted.', async () => {
        const firstInput =screen.getByLabelText('First Name*')
        const secondInput =screen.getByLabelText('Last Name*')
        const email = screen.getByLabelText('Email*')
        const message = screen.getByLabelText(/message/i)
        fireEvent.change(firstInput,{target:{value:'abcde'}})
        fireEvent.change(secondInput,{target:{value:'abcdefgh'}})
        fireEvent.change(email,{target:{value:'abcde@gmail.com'}})
        fireEvent.change(message,{target:{value:'haha'}})
        const SubmitBtn = screen.getByRole('button')
        fireEvent.click(SubmitBtn)
        expect(screen.getByTestId('firstnameDisplay')).toBeInTheDocument
        expect(screen.getByTestId('lastnameDisplay')).toBeInTheDocument
        expect(screen.getByTestId('emailDisplay')).toBeInTheDocument
        expect(screen.queryByTestId('messageDisplay')).toBeInTheDocument
    });
})
    