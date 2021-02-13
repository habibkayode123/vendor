import roles from '../roles-actions';
import auth from '../auth/auth-helper';

const checkPageAccess = (path, permittedPages) => {  
    let isUserAuthorised = false;  
    let url = path.replace(/\//g, "").replace(/\admin/g, "");  console.log(url);
    let allowedActions = [];
    let allowedActionsName = [];
  
    // If permittedPages exists
    if( Array.isArray(permittedPages) && permittedPages.length > 0) {    
        isUserAuthorised = permittedPages.find(page => page.url === url);  
        permittedPages.forEach(element => {      
            // If Url exists
            if(element.url === url){        
                // If Action exists
                if(( Array.isArray(element.actions) && element.actions.length > 0)){
                    // Prepare Action List
                    element.actions.forEach(item => {
                        if (item.active)   
                            allowedActionsName.push(item.name);
                    });
                }
            }
      });
    }  
    return {
        isUserAuthorised,
        allowedActionsName
    };
};

const checkAccess = (name) => {
    if (!auth.isAuthenticated()) return false;

	const userRole = auth.isAuthenticated().user.role;
    const links = roles.find(role => role.role === userRole).sidebar;
    
    const link = links.find(link => link.name === name);
    if (!link) return false;
    return link.active;
}

export {checkPageAccess, checkAccess};