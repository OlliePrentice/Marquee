import React from 'react'
import { render, screen, act} from '@testing-library/react'
import Index from '../pages/index'
import fetchMock from 'fetch-mock';
import "@testing-library/jest-dom"


describe("Renders hero title", () => {
    it("Works", async () => {
        const promise = Promise.resolve()
        const mockSession = {
            expires: "1",
            user: { email: "a", name: "Delta", image: "c" },
        };

        fetchMock.mock('*', mockSession);
        render(<Index />)

        expect(screen.getByText(
            /Book spaces by the hour/
        )).toBeInTheDocument()

        await act(() => promise)
    });
});